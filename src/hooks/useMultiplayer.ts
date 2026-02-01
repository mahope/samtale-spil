"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type {
  Player,
  GameRoom,
  MultiplayerSettings,
  MultiplayerGameState,
  MultiplayerMessage,
  PlayerJoinPayload,
  RoomStateSyncPayload,
  NextQuestionPayload,
  CardFlipPayload,
  FavoriteTogglePayload,
  SettingsUpdatePayload,
} from "@/types/multiplayer";
import {
  generateRoomCode,
  generatePlayerId,
  getRandomEmoji,
  DEFAULT_MULTIPLAYER_SETTINGS,
  DEFAULT_GAME_STATE,
} from "@/types/multiplayer";

// Storage key for persisting player identity
const PLAYER_STORAGE_KEY = "samtale-spil-player";
const ROOM_STORAGE_KEY = "samtale-spil-room";

interface StoredPlayer {
  id: string;
  name: string;
  emoji: string;
}

// Get or create player identity
function getOrCreatePlayer(name?: string): StoredPlayer {
  if (typeof window === "undefined") {
    return { id: generatePlayerId(), name: name || "Spiller", emoji: getRandomEmoji() };
  }

  const stored = localStorage.getItem(PLAYER_STORAGE_KEY);
  if (stored) {
    const player = JSON.parse(stored) as StoredPlayer;
    if (name && name !== player.name) {
      player.name = name;
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(player));
    }
    return player;
  }

  const newPlayer: StoredPlayer = {
    id: generatePlayerId(),
    name: name || "Spiller",
    emoji: getRandomEmoji(),
  };
  localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(newPlayer));
  return newPlayer;
}

export interface UseMultiplayerOptions {
  onPlayerJoin?: (player: Player) => void;
  onPlayerLeave?: (playerId: string) => void;
  onGameStart?: () => void;
  onNextQuestion?: (questionId: string) => void;
  onTurnChange?: (playerId: string) => void;
  onError?: (error: string) => void;
}

export function useMultiplayer(options: UseMultiplayerOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<StoredPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Initialize player identity
  useEffect(() => {
    const player = getOrCreatePlayer();
    setCurrentPlayer(player);
    setIsLoading(false);

    // Check if there's a stored room to rejoin
    const storedRoom = localStorage.getItem(ROOM_STORAGE_KEY);
    if (storedRoom) {
      try {
        const roomData = JSON.parse(storedRoom) as GameRoom;
        // Only rejoin if room is less than 1 hour old
        if (Date.now() - roomData.lastActivity < 3600000) {
          joinRoom(roomData.roomCode, player.name);
        } else {
          localStorage.removeItem(ROOM_STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(ROOM_STORAGE_KEY);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send message to all players in room
  const sendMessage = useCallback(
    (
      type: MultiplayerMessage["type"],
      payload: unknown
    ) => {
      if (!channelRef.current || !room || !currentPlayer) return;

      const message: MultiplayerMessage = {
        type,
        senderId: currentPlayer.id,
        roomCode: room.roomCode,
        timestamp: Date.now(),
        payload,
      };

      channelRef.current.postMessage(message);
    },
    [room, currentPlayer]
  );

  // Handle incoming messages
  const handleMessage = useCallback(
    (event: MessageEvent<MultiplayerMessage>) => {
      const message = event.data;
      if (!room || message.roomCode !== room.roomCode) return;
      if (!currentPlayer || message.senderId === currentPlayer.id) return;

      switch (message.type) {
        case "player-join": {
          const { player } = message.payload as PlayerJoinPayload;
          setRoom((prev) => {
            if (!prev) return prev;
            if (prev.players.some((p) => p.id === player.id)) return prev;
            const updated = {
              ...prev,
              players: [...prev.players, player],
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          optionsRef.current.onPlayerJoin?.(player);

          // If we're host, send full room state to new player
          if (room.hostId === currentPlayer.id) {
            setTimeout(() => sendMessage("room-state-sync", { room }), 100);
          }
          break;
        }

        case "player-leave": {
          const playerId = message.payload as string;
          setRoom((prev) => {
            if (!prev) return prev;
            const updated = {
              ...prev,
              players: prev.players.filter((p) => p.id !== playerId),
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          optionsRef.current.onPlayerLeave?.(playerId);
          break;
        }

        case "room-state-sync": {
          const { room: syncedRoom } = message.payload as RoomStateSyncPayload;
          setRoom(syncedRoom);
          localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(syncedRoom));
          break;
        }

        case "game-start": {
          setRoom((prev) => {
            if (!prev) return prev;
            const updated = {
              ...prev,
              gameState: {
                ...prev.gameState,
                status: "playing" as const,
              },
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          optionsRef.current.onGameStart?.();
          break;
        }

        case "next-question": {
          const { questionId, questionIndex, nextTurnPlayerId } =
            message.payload as NextQuestionPayload;
          setRoom((prev) => {
            if (!prev) return prev;
            const updated = {
              ...prev,
              gameState: {
                ...prev.gameState,
                currentQuestionId: questionId,
                currentQuestionIndex: questionIndex,
                answeredQuestionIds: prev.gameState.currentQuestionId
                  ? [...prev.gameState.answeredQuestionIds, prev.gameState.currentQuestionId]
                  : prev.gameState.answeredQuestionIds,
                currentTurnPlayerId: nextTurnPlayerId,
                turnStartedAt: Date.now(),
              },
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          setIsCardFlipped(false);
          optionsRef.current.onNextQuestion?.(questionId);
          optionsRef.current.onTurnChange?.(nextTurnPlayerId || "");
          break;
        }

        case "card-flip": {
          const { isFlipped } = message.payload as CardFlipPayload;
          setIsCardFlipped(isFlipped);
          break;
        }

        case "favorite-toggle": {
          const { questionId, playerId, isFavorite } =
            message.payload as FavoriteTogglePayload;
          setRoom((prev) => {
            if (!prev) return prev;
            const currentFavorites = prev.gameState.favoritedByPlayers[questionId] || [];
            const updatedFavorites = isFavorite
              ? [...currentFavorites, playerId]
              : currentFavorites.filter((id) => id !== playerId);

            const updated = {
              ...prev,
              gameState: {
                ...prev.gameState,
                favoritedByPlayers: {
                  ...prev.gameState.favoritedByPlayers,
                  [questionId]: updatedFavorites,
                },
              },
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          break;
        }

        case "settings-update": {
          const { settings } = message.payload as SettingsUpdatePayload;
          setRoom((prev) => {
            if (!prev) return prev;
            const updated = {
              ...prev,
              settings: { ...prev.settings, ...settings },
              lastActivity: Date.now(),
            };
            localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
          break;
        }

        case "heartbeat": {
          // Update player's connected status
          const senderId = message.senderId;
          setRoom((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              players: prev.players.map((p) =>
                p.id === senderId ? { ...p, isConnected: true } : p
              ),
              lastActivity: Date.now(),
            };
          });
          break;
        }

        case "kick-player": {
          const kickedId = message.payload as string;
          if (currentPlayer.id === kickedId) {
            leaveRoom();
            optionsRef.current.onError?.("Du blev fjernet fra rummet");
          }
          break;
        }

        default:
          break;
      }
    },
    [room, currentPlayer, sendMessage]
  );

  // Setup BroadcastChannel when room exists
  useEffect(() => {
    if (!room) {
      if (channelRef.current) {
        channelRef.current.close();
        channelRef.current = null;
      }
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    // Create channel for this room
    const channel = new BroadcastChannel(`samtale-spil-${room.roomCode}`);
    channelRef.current = channel;
    channel.onmessage = handleMessage;
    setIsConnected(true);

    // Send heartbeats every 5 seconds
    heartbeatRef.current = setInterval(() => {
      if (channelRef.current && currentPlayer) {
        const message: MultiplayerMessage = {
          type: "heartbeat",
          senderId: currentPlayer.id,
          roomCode: room.roomCode,
          timestamp: Date.now(),
          payload: null,
        };
        channelRef.current.postMessage(message);
      }
    }, 5000);

    return () => {
      channel.close();
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, [room?.roomCode, currentPlayer, handleMessage]);

  // Create a new room
  const createRoom = useCallback(
    (playerName: string): string => {
      const player = getOrCreatePlayer(playerName);
      setCurrentPlayer(player);

      const roomCode = generateRoomCode();
      const newRoom: GameRoom = {
        roomCode,
        hostId: player.id,
        players: [
          {
            id: player.id,
            name: player.name,
            emoji: player.emoji,
            isHost: true,
            isConnected: true,
            joinedAt: Date.now(),
          },
        ],
        settings: DEFAULT_MULTIPLAYER_SETTINGS,
        gameState: {
          ...DEFAULT_GAME_STATE,
          scores: { [player.id]: 0 },
        },
        createdAt: Date.now(),
        lastActivity: Date.now(),
      };

      setRoom(newRoom);
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(newRoom));
      setError(null);

      return roomCode;
    },
    []
  );

  // Join an existing room
  const joinRoom = useCallback(
    (roomCode: string, playerName: string): boolean => {
      const normalizedCode = roomCode.toUpperCase().trim();
      if (normalizedCode.length !== 4) {
        setError("Rumkode skal være 4 bogstaver");
        optionsRef.current.onError?.("Rumkode skal være 4 bogstaver");
        return false;
      }

      const player = getOrCreatePlayer(playerName);
      setCurrentPlayer(player);

      // Create player object
      const playerObj: Player = {
        id: player.id,
        name: player.name,
        emoji: player.emoji,
        isHost: false,
        isConnected: true,
        joinedAt: Date.now(),
      };

      // Create minimal room structure (will be synced from host)
      const joinRoom: GameRoom = {
        roomCode: normalizedCode,
        hostId: "", // Will be set by sync
        players: [playerObj],
        settings: DEFAULT_MULTIPLAYER_SETTINGS,
        gameState: {
          ...DEFAULT_GAME_STATE,
          scores: { [player.id]: 0 },
        },
        createdAt: Date.now(),
        lastActivity: Date.now(),
      };

      setRoom(joinRoom);
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(joinRoom));
      setError(null);

      // Announce join after channel is setup
      setTimeout(() => {
        if (channelRef.current) {
          const message: MultiplayerMessage = {
            type: "player-join",
            senderId: player.id,
            roomCode: normalizedCode,
            timestamp: Date.now(),
            payload: { player: playerObj } as PlayerJoinPayload,
          };
          channelRef.current.postMessage(message);
        }
      }, 100);

      return true;
    },
    []
  );

  // Leave current room
  const leaveRoom = useCallback(() => {
    if (room && currentPlayer && channelRef.current) {
      sendMessage("player-leave", currentPlayer.id);
    }

    setRoom(null);
    setIsConnected(false);
    localStorage.removeItem(ROOM_STORAGE_KEY);
  }, [room, currentPlayer, sendMessage]);

  // Update player info
  const updatePlayer = useCallback(
    (updates: Partial<Pick<StoredPlayer, "name" | "emoji">>) => {
      if (!currentPlayer) return;

      const updated = { ...currentPlayer, ...updates };
      setCurrentPlayer(updated);
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(updated));

      if (room) {
        setRoom((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            players: prev.players.map((p) =>
              p.id === currentPlayer.id ? { ...p, ...updates } : p
            ),
          };
        });
        sendMessage("player-update", { playerId: currentPlayer.id, updates });
      }
    },
    [currentPlayer, room, sendMessage]
  );

  // Update game settings (host only)
  const updateSettings = useCallback(
    (settings: Partial<MultiplayerSettings>) => {
      if (!room || !currentPlayer || room.hostId !== currentPlayer.id) return;

      setRoom((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          settings: { ...prev.settings, ...settings },
          lastActivity: Date.now(),
        };
        localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      sendMessage("settings-update", { settings } as SettingsUpdatePayload);
    },
    [room, currentPlayer, sendMessage]
  );

  // Start the game (host only)
  const startGame = useCallback(() => {
    if (!room || !currentPlayer || room.hostId !== currentPlayer.id) return;

    const firstPlayerId =
      room.settings.turnOrderMode === "random"
        ? room.players[Math.floor(Math.random() * room.players.length)].id
        : room.players[0].id;

    setRoom((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        gameState: {
          ...prev.gameState,
          status: "playing" as const,
          currentTurnPlayerId: firstPlayerId,
          turnStartedAt: Date.now(),
        },
        lastActivity: Date.now(),
      };
      localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    sendMessage("game-start", null);
    optionsRef.current.onGameStart?.();
  }, [room, currentPlayer, sendMessage]);

  // Go to next question
  const nextQuestion = useCallback(
    (questionId: string, questionIndex: number) => {
      if (!room || !currentPlayer) return;

      // Determine next turn player
      let nextTurnPlayerId: string | null = null;
      if (room.settings.turnOrderMode === "round-robin") {
        const currentIndex = room.players.findIndex(
          (p) => p.id === room.gameState.currentTurnPlayerId
        );
        nextTurnPlayerId =
          room.players[(currentIndex + 1) % room.players.length].id;
      } else if (room.settings.turnOrderMode === "random") {
        nextTurnPlayerId =
          room.players[Math.floor(Math.random() * room.players.length)].id;
      }

      // Update local state
      setRoom((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          gameState: {
            ...prev.gameState,
            currentQuestionId: questionId,
            currentQuestionIndex: questionIndex,
            answeredQuestionIds: prev.gameState.currentQuestionId
              ? [...prev.gameState.answeredQuestionIds, prev.gameState.currentQuestionId]
              : prev.gameState.answeredQuestionIds,
            currentTurnPlayerId: nextTurnPlayerId,
            turnStartedAt: Date.now(),
            scores: {
              ...prev.gameState.scores,
              [currentPlayer.id]: (prev.gameState.scores[currentPlayer.id] || 0) + 1,
            },
          },
          lastActivity: Date.now(),
        };
        localStorage.setItem(ROOM_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      setIsCardFlipped(false);
      sendMessage("next-question", {
        questionId,
        questionIndex,
        nextTurnPlayerId,
      } as NextQuestionPayload);
    },
    [room, currentPlayer, sendMessage]
  );

  // Toggle card flip
  const toggleCardFlip = useCallback(
    (questionId: string) => {
      setIsCardFlipped((prev) => {
        const newFlipped = !prev;
        sendMessage("card-flip", { isFlipped: newFlipped, questionId } as CardFlipPayload);
        return newFlipped;
      });
    },
    [sendMessage]
  );

  // Toggle favorite for current question
  const toggleFavorite = useCallback(
    (questionId: string, isFavorite: boolean) => {
      if (!currentPlayer || !room) return;

      setRoom((prev) => {
        if (!prev) return prev;
        const currentFavorites = prev.gameState.favoritedByPlayers[questionId] || [];
        const updatedFavorites = isFavorite
          ? [...currentFavorites, currentPlayer.id]
          : currentFavorites.filter((id) => id !== currentPlayer.id);

        return {
          ...prev,
          gameState: {
            ...prev.gameState,
            favoritedByPlayers: {
              ...prev.gameState.favoritedByPlayers,
              [questionId]: updatedFavorites,
            },
          },
        };
      });

      sendMessage("favorite-toggle", {
        questionId,
        playerId: currentPlayer.id,
        isFavorite,
      } as FavoriteTogglePayload);
    },
    [currentPlayer, room, sendMessage]
  );

  // Kick a player (host only)
  const kickPlayer = useCallback(
    (playerId: string) => {
      if (!room || !currentPlayer || room.hostId !== currentPlayer.id) return;
      if (playerId === currentPlayer.id) return; // Can't kick yourself

      setRoom((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          players: prev.players.filter((p) => p.id !== playerId),
        };
      });

      sendMessage("kick-player", playerId);
    },
    [room, currentPlayer, sendMessage]
  );

  // Check if current player is host
  const isHost = room?.hostId === currentPlayer?.id;

  // Check if it's current player's turn
  const isMyTurn = room?.gameState.currentTurnPlayerId === currentPlayer?.id;

  // Get current turn player
  const currentTurnPlayer = room?.players.find(
    (p) => p.id === room.gameState.currentTurnPlayerId
  );

  return {
    // State
    isConnected,
    isLoading,
    room,
    currentPlayer,
    error,
    isHost,
    isMyTurn,
    currentTurnPlayer,
    isCardFlipped,

    // Actions
    createRoom,
    joinRoom,
    leaveRoom,
    updatePlayer,
    updateSettings,
    startGame,
    nextQuestion,
    toggleCardFlip,
    toggleFavorite,
    kickPlayer,
  };
}
