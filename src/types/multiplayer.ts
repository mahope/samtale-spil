// Multiplayer Types for Samtale-Spil

export interface Player {
  id: string;
  name: string;
  emoji: string;
  isHost: boolean;
  isConnected: boolean;
  joinedAt: number;
}

export interface GameRoom {
  roomCode: string;
  hostId: string;
  players: Player[];
  settings: MultiplayerSettings;
  gameState: MultiplayerGameState;
  createdAt: number;
  lastActivity: number;
}

export interface MultiplayerSettings {
  categoryId: string | null;
  turnDuration: 30 | 60 | 90;
  turnOrderMode: "round-robin" | "random" | "free";
  showOthersFavorites: boolean;
  maxPlayers: number;
}

export interface MultiplayerGameState {
  status: "lobby" | "playing" | "paused" | "finished";
  currentQuestionId: string | null;
  currentQuestionIndex: number;
  answeredQuestionIds: string[];
  currentTurnPlayerId: string | null;
  turnStartedAt: number | null;
  scores: Record<string, number>; // playerId -> questionsAnswered
  favoritedByPlayers: Record<string, string[]>; // questionId -> playerIds who favorited
}

// Message types for BroadcastChannel sync
export type MultiplayerMessageType =
  | "player-join"
  | "player-leave"
  | "player-update"
  | "game-start"
  | "game-pause"
  | "game-resume"
  | "next-question"
  | "card-flip"
  | "favorite-toggle"
  | "turn-change"
  | "timer-sync"
  | "settings-update"
  | "room-state-sync"
  | "heartbeat"
  | "kick-player";

export interface MultiplayerMessage {
  type: MultiplayerMessageType;
  senderId: string;
  roomCode: string;
  timestamp: number;
  payload: unknown;
}

// Player join payload
export interface PlayerJoinPayload {
  player: Player;
}

// Room state sync payload (full state for new joiners)
export interface RoomStateSyncPayload {
  room: GameRoom;
}

// Next question payload
export interface NextQuestionPayload {
  questionId: string;
  questionIndex: number;
  nextTurnPlayerId: string | null;
}

// Card flip payload
export interface CardFlipPayload {
  isFlipped: boolean;
  questionId: string;
}

// Favorite toggle payload
export interface FavoriteTogglePayload {
  questionId: string;
  playerId: string;
  isFavorite: boolean;
}

// Settings update payload
export interface SettingsUpdatePayload {
  settings: Partial<MultiplayerSettings>;
}

// Player emojis for selection
export const PLAYER_EMOJIS = [
  "😊", "😎", "🤓", "🥳", "😺", "🦊", "🐸", "🦋",
  "🌟", "🔥", "💎", "🎭", "🎨", "🎵", "🚀", "🌈"
];

// Generate a random 4-letter room code
export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // No I or O to avoid confusion
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate a random player ID
export function generatePlayerId(): string {
  return `player-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Get a random player emoji
export function getRandomEmoji(): string {
  return PLAYER_EMOJIS[Math.floor(Math.random() * PLAYER_EMOJIS.length)];
}

// Default multiplayer settings
export const DEFAULT_MULTIPLAYER_SETTINGS: MultiplayerSettings = {
  categoryId: null,
  turnDuration: 60,
  turnOrderMode: "round-robin",
  showOthersFavorites: true,
  maxPlayers: 8,
};

// Default game state
export const DEFAULT_GAME_STATE: MultiplayerGameState = {
  status: "lobby",
  currentQuestionId: null,
  currentQuestionIndex: 0,
  answeredQuestionIds: [],
  currentTurnPlayerId: null,
  turnStartedAt: null,
  scores: {},
  favoritedByPlayers: {},
};
