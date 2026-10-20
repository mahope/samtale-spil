"use client";

import { useEffect, useId, useRef, useState } from "react";
import { API_BASE, TURNSTILE_SITEKEY } from "@/config/api";
import { track } from "@/utils/track";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

const REASONS = [
  { id: "stavefejl", label: "Stavefejl eller sprog" },
  { id: "upassende", label: "Upassende eller sårende" },
  { id: "dublet", label: "Det samme som et andet kort" },
  { id: "dybde", label: "Forkert dybde (let, medium, dyb)" },
  { id: "forslag", label: "Jeg har et bedre forslag" },
  { id: "andet", label: "Andet" },
];

let turnstileLoading: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  const w = window as unknown as { turnstile?: TurnstileApi };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  turnstileLoading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve((window as unknown as { turnstile: TurnstileApi }).turnstile);
    s.onerror = () => {
      turnstileLoading = null;
      reject(new Error("turnstile"));
    };
    document.head.appendChild(s);
  });
  return turnstileLoading;
}

/**
 * "Rapportér": lets a player tell Mads that a card has a problem. The report goes
 * to the snakkespil.dk worker, which checks Turnstile and mails it on. Nothing about
 * the player is sent: only the card id, a reason and an optional comment.
 */
export function ReportCard({ questionId }: { questionId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    let widgetId: string | null = null;
    let cancelled = false;
    loadTurnstile()
      .then((t) => {
        if (cancelled || !widgetRef.current) return;
        widgetId = t.render(widgetRef.current, {
          sitekey: TURNSTILE_SITEKEY,
          language: "da",
          callback: (tok: string) => setToken(tok),
          "expired-callback": () => setToken(""),
        });
      })
      .catch(() => setMessage("Spambeskyttelsen kunne ikke indlæses. Tjek forbindelsen, og prøv igen."));
    return () => {
      cancelled = true;
      const t = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (widgetId && t) t.remove(widgetId);
    };
  }, [open]);

  const close = () => {
    dialogRef.current?.close();
    setOpen(false);
    setStatus("idle");
    setMessage("");
    setToken("");
    setReason("");
    setComment("");
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !token) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/flag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: questionId, aarsag: reason, kommentar: comment, token, website: honeypot }),
      });
      const data = (await res.json()) as { ok?: boolean; fejl?: string };
      if (res.ok && data.ok) {
        setStatus("sent");
        track("Kort rapporteret", { aarsag: reason });
      } else {
        setStatus("error");
        setMessage(data.fejl ?? "Rapporten kunne ikke sendes.");
      }
    } catch {
      setStatus("error");
      setMessage("Rapporten kunne ikke sendes. Tjek forbindelsen.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-[#15201b] shadow-kort"
        aria-label="Rapportér et problem med kortet"
        title="Rapportér"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V4m0 0h11l-2 4 2 4H4" />
        </svg>
      </button>

      {open && (
        <dialog
          ref={dialogRef}
          onClose={close}
          aria-labelledby={titleId}
          className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl bg-flade p-0 text-blaek shadow-kort backdrop:bg-black/50"
        >
          {status === "sent" ? (
            <div className="p-6">
              <h2 id={titleId} className="text-2xl font-bold">Tak for hjælpen</h2>
              <p className="mt-2 text-blaek-2">Din rapport er sendt. Kortet bliver kigget på.</p>
              <button type="button" onClick={close} className="mt-6 min-h-12 w-full rounded-full bg-bord font-bold text-white">
                Luk
              </button>
            </div>
          ) : (
            <form onSubmit={send} className="p-6">
              <h2 id={titleId} className="text-2xl font-bold">Rapportér kortet</h2>
              <p className="mt-1 text-blaek-2">Hvad er der galt? Rapporten er anonym.</p>
              <fieldset className="mt-4 space-y-1.5">
                <legend className="sr-only">Årsag</legend>
                {REASONS.map((r) => (
                  <label key={r.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 hover:bg-flade-2">
                    <input type="radio" name="aarsag" value={r.id} checked={reason === r.id} onChange={() => setReason(r.id)} className="h-5 w-5 accent-[var(--bord)]" />
                    {r.label}
                  </label>
                ))}
              </fieldset>
              <label className="mt-4 block font-semibold" htmlFor={`${titleId}-k`}>
                Kommentar <span className="font-normal text-blaek-2">(valgfri, uden links)</span>
              </label>
              <textarea
                id={`${titleId}-k`}
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 300))}
                rows={3}
                className="mt-1.5 w-full rounded-xl bg-papir p-3 ring-1 ring-streg focus:ring-2 focus:ring-bord"
              />
              <p className="text-right text-sm text-blaek-2">{comment.length}/300</p>
              {/* Honeypot: hidden from people, tempting for bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Hjemmeside
                  <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
                </label>
              </div>
              <div ref={widgetRef} className="mt-3 min-h-16" />
              {message && (
                <p className="mt-2 text-[0.95rem] font-semibold text-[#ad2b41]" role="alert">
                  {message}
                </p>
              )}
              <div className="mt-5 flex gap-3">
                <button type="button" onClick={close} className="min-h-12 flex-1 rounded-full font-semibold ring-1 ring-streg">
                  Annullér
                </button>
                <button
                  type="submit"
                  disabled={!reason || !token || status === "sending"}
                  className="min-h-12 flex-1 rounded-full bg-bord font-bold text-white disabled:opacity-50"
                >
                  {status === "sending" ? "Sender" : "Send"}
                </button>
              </div>
            </form>
          )}
        </dialog>
      )}
    </>
  );
}
