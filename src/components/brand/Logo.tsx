/**
 * Snakkespil mark: two cards on the felt, the front one carrying lines of a question.
 * The same drawing is used for favicon and app icons (scripts/generate-icons.mjs).
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1d4a38" />
      <rect x="12" y="14" width="26" height="36" rx="4" fill="#f4c04e" transform="rotate(-12 25 32)" />
      <rect x="25" y="13" width="27" height="38" rx="4" fill="#ffffff" transform="rotate(8 38 32)" />
      <g transform="rotate(8 38 32)" fill="#1d4a38">
        <rect x="30" y="22" width="17" height="3.2" rx="1.6" />
        <rect x="30" y="28.5" width="13" height="3.2" rx="1.6" />
        <rect x="30" y="35" width="15" height="3.2" rx="1.6" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={34} />
      <span className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.02em]" style={{ fontStretch: "88%" }}>
        Snakkespil
      </span>
    </span>
  );
}
