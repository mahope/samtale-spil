"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { categories } from "@/data/categories";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useFavorites } from "@/hooks/useLocalStorage";
import { QuestionCard } from "@/components/QuestionCard";
import { DeckBack } from "@/components/deck/DeckParts";
import { track } from "@/utils/track";
import type { Question } from "@/types";

const PLAYERS_KEY = "samtale-spil-pass-players";
const MIX = "blandet";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * One phone, several people: the phone shows whose turn it is, that person turns
 * the card and answers, and passes the phone on.
 */
export function PassThePhone() {
  const [savedPlayers, setSavedPlayers, loaded] = useLocalStorage<string[]>(PLAYERS_KEY, ["", ""]);
  const [deckId, setDeckId] = useState<string>("venner");
  const [pile, setPile] = useState<Question[] | null>(null);
  const [turn, setTurn] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const players = savedPlayers.length >= 2 ? savedPlayers : ["", ""];
  const named = players.map((p) => p.trim()).filter(Boolean);
  const categoryName = useMemo(
    () => (deckId === MIX ? "Bland alle" : categories.find((c) => c.id === deckId)?.name ?? ""),
    [deckId]
  );

  const setPlayer = (i: number, name: string) => setSavedPlayers(players.map((p, j) => (j === i ? name : p)));
  const addPlayer = () => players.length < 10 && setSavedPlayers([...players, ""]);
  const removePlayer = (i: number) => players.length > 2 && setSavedPlayers(players.filter((_, j) => j !== i));

  const start = () => {
    const source = deckId === MIX ? categories.flatMap((c) => c.questions) : categories.find((c) => c.id === deckId)?.questions ?? [];
    setPile(shuffle(source));
    setTurn(0);
    setIsFlipped(false);
    track("Spil startet", { kategori: deckId, tilstand: "send-rundt", spillere: named.length });
  };

  const next = () => {
    setIsFlipped(false);
    setTurn((t) => t + 1);
  };

  if (!loaded) {
    return <div className="filt min-h-dvh" />;
  }

  if (!pile) {
    return (
      <div className="min-h-dvh bg-papir">
        <main id="main-content" className="mx-auto max-w-xl px-4 pb-16 pt-safe sm:px-6">
          <Link href="/spil/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blaek-2 hover:text-blaek">
            Tilbage til spillene
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em]" style={{ fontStretch: "88%" }}>
            Send telefonen rundt
          </h1>
          <p className="mt-3 text-lg text-blaek-2">
            Skriv navnene på dem, der er med. Telefonen viser, hvis tur det er, og den, der har den, vender kortet og svarer.
          </p>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (named.length >= 2) start();
            }}
          >
            <fieldset>
              <legend className="text-xl font-bold">Hvem er med?</legend>
              <ol className="mt-3 space-y-2">
                {players.map((name, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <label className="sr-only" htmlFor={`spiller-${i}`}>Spiller {i + 1}</label>
                    <input
                      id={`spiller-${i}`}
                      value={name}
                      onChange={(e) => setPlayer(i, e.target.value.slice(0, 24))}
                      placeholder={`Spiller ${i + 1}`}
                      autoComplete="off"
                      className="min-h-12 flex-1 rounded-xl bg-flade px-4 text-lg ring-1 ring-streg placeholder:text-blaek-2/70 focus:ring-2 focus:ring-bord"
                    />
                    {players.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePlayer(i)}
                        className="min-h-12 min-w-12 rounded-xl text-blaek-2 hover:bg-flade-2"
                        aria-label={`Fjern ${name || `spiller ${i + 1}`}`}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ol>
              {players.length < 10 && (
                <button type="button" onClick={addPlayer} className="mt-3 min-h-11 font-semibold text-bord underline underline-offset-4 dark:text-kridt">
                  Tilføj en spiller
                </button>
              )}
            </fieldset>

            <fieldset className="mt-8">
              <legend className="text-xl font-bold">Hvilke kort?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[{ id: MIX, name: "Bland alle" }, ...categories].map((c) => (
                  <label
                    key={c.id}
                    className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl px-3 ring-1 ${
                      deckId === c.id ? "bg-flade ring-2 ring-bord dark:ring-kridt" : "bg-flade/60 ring-streg"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bunke"
                      value={c.id}
                      checked={deckId === c.id}
                      onChange={() => setDeckId(c.id)}
                      className="sr-only"
                    />
                    <DeckBack categoryId={c.id} className="h-7 w-5 shrink-0 rounded-[4px]" />
                    <span className="font-semibold leading-tight">{c.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={named.length < 2}
              className="mt-10 min-h-14 w-full rounded-full bg-bord px-6 text-lg font-bold text-white disabled:opacity-50 dark:bg-kridt dark:text-kridt-blaek"
            >
              {named.length < 2 ? "Skriv mindst to navne" : `Start med ${named[0]}`}
            </button>
          </form>
        </main>
      </div>
    );
  }

  const question = pile[turn % pile.length];
  const current = named[turn % named.length];
  const upNext = named[(turn + 1) % named.length];

  return (
    <div className="filt min-h-dvh">
      <main id="main-content" className="mx-auto flex min-h-dvh max-w-xl flex-col items-center px-4 pb-safe pt-safe sm:px-6">
        <div className="flex w-full max-w-[23rem] items-center justify-between pt-3">
          <button
            type="button"
            onClick={() => setPile(null)}
            className="min-h-11 rounded-lg px-2 font-semibold text-white/85 hover:text-white"
          >
            Skift spillere
          </button>
          <span className="text-sm text-white/70">{categoryName}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={turn}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 text-center text-4xl font-extrabold"
            style={{ fontStretch: "88%" }}
            aria-live="polite"
          >
            {/[sxz]$/i.test(current) ? `${current}'` : `${current}s`} tur
          </motion.h1>
        </AnimatePresence>

        <div className="flex w-full flex-1 items-center justify-center py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id + turn}
              initial={{ opacity: 0, x: 70, rotate: 6 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -90, rotate: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="w-full"
            >
              <QuestionCard
                question={question}
                categoryName={categories.find((c) => c.id === question.categoryId)?.name ?? ""}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped((f) => !f)}
                isFavorite={isFavorite(question.id)}
                onToggleFavorite={() => toggleFavorite(question)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full max-w-[23rem] pb-6">
          <button
            type="button"
            onClick={next}
            className="min-h-14 w-full rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek shadow-[0_3px_0_rgb(0_0_0/0.3)] active:translate-y-0.5"
          >
            Giv telefonen til {upNext}
          </button>
        </div>
      </main>
    </div>
  );
}
