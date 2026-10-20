"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { getCategory } from "@/data/categories";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { track } from "@/utils/track";
import { tap } from "@/lib/platform";
import type { Question } from "@/types";

const DECK = "kend-din-partner";
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
export function GaetSpil() {
  const deck = getCategory(DECK)!;
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
    setPile(shuffle(deck.questions));
    setRound(0);
    setPhase("svar");
    setAnswers([]);
    setDraft("");
    setScores(Object.fromEntries(named.map((n) => [n, 0])));
    track("Spil startet", { kategori: DECK, tilstand: mode === "gaet" ? "gaet-svaret" : "alle-svarer" });
  };

  const resume = () => {
    if (!saved) return;
    const byId = new Map(deck.questions.map((q) => [q.id, q]));
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
          <Link href={`/spil/${DECK}/`} className="text-white/80 underline">
            Tilbage til Kend din partner
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold">Gæt svaret</h1>
          <p className="mt-3 text-lg text-white/85">
            Én svarer i hemmelighed, og den næste gætter, før svaret bliver vist. Eller alle svarer skjult, og I afslører
            svarene sammen. Svarene bliver på telefonen.
          </p>
          <form
            className="mt-8 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              start();
            }}
          >
            <fieldset>
              <legend className="text-xl font-bold">Hvem spiller?</legend>
              <div className="mt-3 space-y-2">
                {players.map((p, i) => (
                  <div key={i} className="flex gap-2">
                    <label className="sr-only" htmlFor={`gaet-spiller-${i}`}>
                      Spiller {i + 1}
                    </label>
                    <input
                      id={`gaet-spiller-${i}`}
                      value={p}
                      onChange={(e) => setPlayer(i, e.target.value.slice(0, 24))}
                      placeholder={`Spiller ${i + 1}`}
                      className="min-h-12 flex-1 rounded-xl bg-white px-4 text-lg text-[#15201b]"
                    />
                    {players.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setSavedPlayers(players.filter((_, j) => j !== i))}
                        className={secondary}
                        aria-label={`Fjern spiller ${i + 1}`}
                      >
                        Fjern
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {players.length < 6 && (
                <button type="button" onClick={() => setSavedPlayers([...players, ""])} className={`${secondary} mt-3`}>
                  Tilføj spiller
                </button>
              )}
            </fieldset>

            <fieldset>
              <legend className="text-xl font-bold">Hvordan?</legend>
              <div className="mt-3 space-y-2">
                {(
                  [
                    ["gaet", "Én svarer, den næste gætter", "I skiftes. Et rigtigt gæt giver et point."],
                    ["alle", "Alle svarer skjult", "Alle skriver deres svar, og I ser dem samtidig."],
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
                  Tæl point
                </label>
              )}
            </fieldset>

            <button type="submit" disabled={named.length < 2 || duplicate} className={`${primary} w-full text-lg`}>
              Start spillet
            </button>
            {named.length < 2 && <p className="text-white/80">Skriv mindst to navne.</p>}
            {duplicate && <p className="text-white/80">To spillere har samme navn. Giv dem hver sit.</p>}
            {saved && saved.ids.length > 0 && (
              <button type="button" onClick={resume} className={`${secondary} w-full`}>
                Fortsæt spillet fra kort {saved.round + 1}
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
          Nyt spil
        </button>
        <span className="text-sm text-white/70">Kort {round + 1}</span>
      </div>

      {mode === "gaet" && withPoints && (
        <ul className="mt-3 flex w-full max-w-[23rem] flex-wrap gap-2" aria-label="Point">
          {named.map((p) => (
            <li key={p} className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold tabular-nums">
              {p}: {scores?.[p] ?? 0}
            </li>
          ))}
        </ul>
      )}

      <p className="sr-only" aria-live="polite">
        Kort {round + 1}: {question.text}
      </p>
      <div className="mt-5 w-full max-w-[21rem] sm:max-w-[23rem]">
        <CardFace categoryId={DECK} categoryName={deck.name} question={question} className="aspect-[5/7]" />
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
              {writer}, skriv dit svar
            </h2>
            <p className="mt-1 text-white/80">
              {mode === "gaet" ? `${guesser} kigger væk imens.` : "De andre kigger væk imens."}
            </p>
            <label className="sr-only" htmlFor="gaet-svar">
              Dit svar
            </label>
            <input
              id="gaet-svar"
              value={draft}
              onChange={(e) => setDraft(e.target.value.slice(0, 120))}
              autoComplete="off"
              className="mt-3 min-h-12 w-full rounded-xl bg-white px-4 text-lg text-[#15201b]"
            />
            <button type="submit" disabled={!draft.trim()} className={`${primary} mt-3 w-full`}>
              {mode === "gaet" ? `Skjul og giv telefonen til ${guesser}` : answers.length + 1 < n ? `Skjul og giv videre til ${named[answers.length + 1]}` : "Skjul svaret"}
            </button>
          </form>
        )}

        {phase === "gaet" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              {guesser}, hvad tror du, {answerer} svarede?
            </h2>
            <p className="mt-1 text-white/80">Sig dit gæt højt, og tryk så på Afslør.</p>
            <button type="button" onClick={() => setPhase("afsloeret")} className={`${primary} mt-4 w-full`}>
              Afslør
            </button>
          </div>
        )}

        {phase === "afsloeret" && mode === "gaet" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-white/80 outline-none">
              {answerer} svarede:
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
                  Rigtigt gættet
                </button>
                <button type="button" className={secondary} onClick={nextCard}>
                  Forkert
                </button>
              </div>
            ) : (
              <button type="button" className={`${primary} mt-4 w-full`} onClick={nextCard}>
                Næste kort
              </button>
            )}
          </div>
        )}

        {phase === "afsloeret" && mode === "alle" && (
          <div>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold outline-none">
              Jeres svar
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
              Næste kort
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
