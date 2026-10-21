"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { track } from "@/utils/track";
import { tap } from "@/lib/platform";
import type { Question } from "@/types";
import { ui } from "@/locale/ui";

/** Colours of Kend din partner / Know Your Partner */
const DECK = "kend-din-partner";
const T = ui.guess;
const PLAYERS_KEY = "samtale-spil-gaet-spillere";
const SCORES_KEY = "samtale-spil-gaet-point";
const GAME_KEY = "samtale-spil-gaet-spil";

interface SavedGame {
  ids: string[];
  round: number;
  mode: Mode;
  withPoints: boolean;
}

type Mode = "gaet" | "alle";
type Phase = "svar" | "gaet" | "afsloeret";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const button = "min-h-12 rounded-full px-6 font-bold";
const primary = `${button} bg-kridt text-kridt-blaek disabled:opacity-50`;
const secondary = `${button} bg-white/10 text-white ring-1 ring-white/30`;

/**
 * "Gæt svaret" for Kend din partner. One player writes an answer in secret, passes the
 * phone, and the next one guesses before "Afslør". Or everyone answers in secret and all
 * answers are shown together. Answers and points stay on the device (localStorage).
 */
/** The deck comes from the page (server data), so the client bundle only has one language */
export function GaetSpil({ questions, deckName, backHref }: { questions: Question[]; deckName: string; backHref: string }) {
  const [savedPlayers, setSavedPlayers] = useLocalStorage<string[]>(PLAYERS_KEY, ["", ""]);
  const [scores, setScores] = useLocalStorage<Record<string, number>>(SCORES_KEY, {});
  const [mode, setMode] = useState<Mode>("gaet");
  const [withPoints, setWithPoints] = useState(true);
  const [pile, setPile] = useState<Question[] | null>(null);
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<Phase>("svar");
  const [answers, setAnswers] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useLocalStorage<SavedGame | null>(GAME_KEY, null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Each phase replaces the focused button, so move focus to the new heading
  useEffect(() => {
    if (pile) headingRef.current?.focus();
  }, [pile, phase, round]);

  // Keep the game (not the secret answers) so points survive a reload
  useEffect(() => {
    if (pile) setSaved({ ids: pile.map((q) => q.id), round, mode, withPoints });
  }, [pile, round, mode, withPoints, setSaved]);

  const players = (savedPlayers ?? ["", ""]).length >= 2 ? savedPlayers ?? ["", ""] : ["", ""];
  const named = players.map((p) => p.trim()).filter(Boolean);
  const duplicate = new Set(named.map((p) => p.toLocaleLowerCase("da"))).size < named.length;
  const setPlayer = (i: number, name: string) => setSavedPlayers(players.map((p, j) => (j === i ? name : p)));

  const start = () => {
    setPile(shuffle(questions));
    setRound(0);
    setPhase("svar");
    setAnswers([]);
    setDraft("");
    setScores(Object.fromEntries(named.map((n) => [n, 0])));
    track("Spil startet", { kategori: DECK, tilstand: mode === "gaet" ? "gaet-svaret" : "alle-svarer" });
  };

  const resume = () => {
    if (!saved) return;
    const byId = new Map(questions.map((q) => [q.id, q]));
    const restored = saved.ids.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
    if (restored.length === 0) return;
    setMode(saved.mode);
    setWithPoints(saved.withPoints);
    setPile(restored);
    setRound(saved.round);
    setPhase("svar");
    setAnswers([]);
    setDraft("");
  };

  if (!pile) {
    return (
      <main id="main-content" className="filt min-h-dvh px-4 pb-16 pt-6 text-white">
        <div className="mx-auto max-w-lg">
          <Link href={backHref} className="text-white/80 underline">
            {T.back}
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold">{T.title}</h1>
          <p className="mt-3 text-lg text-white/85">
            {T.intro}
          </p>
          <form
            className="mt-8 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              start();
            }}
          >
            <fieldset>
              <legend className="text-xl font-bold">{T.who}</legend>
              <div className="mt-3 space-y-2">
                {players.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <label className="sr-only" htmlFor={`gaet-spiller-${i}`}>
                      {T.player(i + 1)}
                    </label>
                    <input
                      id={`gaet-spiller-${i}`}
                      value={p}
                      onChange={(e) => setPlayer(i, e.target.value.slice(0, 24))}
                      placeholder={T.player(i + 1)}
                      className="min-h-12 flex-1 rounded-xl bg-white px-4 text-lg text-[#15201b]"
                    />
                    {players.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setSavedPlayers(players.filter((_, j) => j !== i))}
                        className={secondary}
                        aria-label={T.removePlayer(i + 1)}
                      >
                        {T.remove}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {players.length < 6 && (
                <button type="button" onClick={() => setSavedPlayers([...players, ""])} className={`${secondary} mt-3`}>
                  {T.addPlayer}
                </button>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-xl font-bold">{T.how}</legend>
              <div className="mt-3 space-y-2">
                {(
                  [
                    ["gaet", T.modeGuess, T.modeGuessText],
                    ["alle", T.modeAll, T.modeAllText],
                  ] as const
                ).map(([id, title, text]) => (
                  <label key={id} className={`flex cursor-pointer gap-3 rounded-xl p-3 ring-1 ${mode === id ? "bg-white/15 ring-2 ring-kridt" : "ring-white/30"}`}>
                    <input type="radio" name="tilstand" checked={mode === id} onChange={() => setMode(id)} className="mt-1 h-5 w-5" />
                    <span>
                      <span className="block font-bold">{title}</span>
                      <span className="text-white/80">{text}</span>
                    </span>
                  </label>
                ))}
              </div>
              {mode === "gaet" && (
                <label className="mt-3 flex min-h-11 items-center gap-3">
                  <input type="checkbox" checked={withPoints} onChange={(e) => setWithPoints(e.target.checked)} className="h-5 w-5" />
                  {T.countPoints}
                </label>
              )}
            </fieldset>

            <button type="submit" disabled={named.length < 2 || duplicate} className={`${primary} w-full text-lg`}>
              {T.start}
            </button>
            {named.length < 2 && <p className="text-white/80">{T.needTwo}</p>}
            {duplicate && <p className="text-white/80">{T.duplicate}</p>}
            {saved && saved.ids.length > 0 && (
              <button type="button" onClick={resume} className={`${secondary} w-full`}>
                {T.resume(saved.round + 1)}
              </button>
            )}
          </form>
        </div>
      </main>
    );
  }

  const question = pile[round % pile.length];
  const n = named.length;
  const answerer = named[round % n];
  const guesser = named[(round + 1) % n];
  // In "alle" mode, answers[i] belongs to named[i]; the current writer is the first without an answer
  const writer = mode === "alle" ? named[answers.length] : answerer;

  const nextCard = () => {
    tap();
    setRound((r) => r + 1);
    setPhase("svar");
    setAnswers([]);
    setDraft("");
  };

  const saveAnswer = () => {
    tap();
    const next = [...answers, draft.trim()];
    setAnswers(next);
    setDraft("");
    if (mode === "gaet") setPhase("gaet");
    else if (next.length >= n) setPhase("afsloeret");
  };

  return (
    <main id="main-content" className="filt flex min-h-dvh flex-col items-center px-4 pb-10 pt-6 text-white">
      <div className="flex w-full max-w-[23rem] items-center justify-between">
        <button type="button" onClick={() => setPile(null)} className="text-white/80 underline">
          {T.newGame}
        </button>
        <span className="text-sm text-white/70">{T.card(round + 1)}</span>
      </div>

      {mode === "gaet" && withPoints && (
        <ul className="mt-3 flex w-full max-w-[23rem] flex-wrap gap-2" aria-label={T.points}>
          {named.map((p) => (
            <li key={p} className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold tabular-nums">
              {p}: {scores?.[p] ?? 0}
            </li>
          ))}
        </ul>
      )}

      <p className="sr-only" aria-live="polite">
        {`${T.card(round + 1)}: ${question.text}`}
      </p>
      <div className="mt-5 w-full max-w-[21rem] sm:max-w-[23rem]">
        <CardFace categoryId={DECK} categoryName={deckName} question={question} className="aspect-[5/7]" />
      </div>

      <div className="mt-6 w-full max-w-[23rem]">
        {phase === "svar" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveAnswer();
            }}
          >
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              {T.writeAnswer(writer)}
            </h2>
            <p className="mt-1 text-white/80">
              {mode === "gaet" ? T.looksAway(guesser) : T.othersLookAway}
            </p>
            <label className="sr-only" htmlFor="gaet-svar">
              {T.yourAnswer}
            </label>
            <input
              id="gaet-svar"
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 120))}
              autoComplete="off"
              className="mt-3 min-h-12 w-full rounded-xl bg-white px-4 text-lg text-[#15201b]"
            />
            <button type="submit" disabled={!draft.trim()} className={`${primary} mt-3 w-full`}>
              {mode === "gaet" ? T.hideAndPass(guesser) : answers.length + 1 < n ? T.hideAndPassOn(named[answers.length + 1]) : T.hide}
            </button>
          </form>
        )}

        {phase === "gaet" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              {T.whatDidTheySay(guesser, answerer)}
            </h2>
            <p className="mt-1 text-white/80">{T.sayGuess}</p>
            <button type="button" onClick={() => setPhase("afsloeret")} className={`${primary} mt-4 w-full`}>
              {T.reveal}
            </button>
          </div>
        )}

        {phase === "afsloeret" && mode === "gaet" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-white/80 outline-none">
              {T.answered(answerer)}
            </h2>
            <p className="mt-1 text-2xl font-bold">{answers[0]}</p>
            {withPoints ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={primary}
                  onClick={() => {
                    setScores({ ...scores, [guesser]: (scores?.[guesser] ?? 0) + 1 });
                    nextCard();
                  }}
                >
                  {T.right}
                </button>
                <button type="button" className={secondary} onClick={nextCard}>
                  {T.wrong}
                </button>
              </div>
            ) : (
              <button type="button" className={`${primary} mt-4 w-full`} onClick={nextCard}>
                {T.next}
              </button>
            )}
          </div>
        )}

        {phase === "afsloeret" && mode === "alle" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              {T.allAnswers}
            </h2>
            <ul className="mt-3 space-y-2">
              {named.map((p, i) => (
                <li key={p} className="rounded-xl bg-white/10 p-3">
                  <span className="block text-sm text-white/70">{p}</span>
                  <span className="text-lg font-semibold">{answers[i]}</span>
                </li>
              ))}
            </ul>
            <button type="button" className={`${primary} mt-4 w-full`} onClick={nextCard}>
              {T.next}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
