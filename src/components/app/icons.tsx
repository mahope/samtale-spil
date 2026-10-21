import type { ReactNode } from "react";

/**
 * Inline icons for the app shell, 24x24 on a 1.75 stroke. Tab icons fill in when their tab is
 * active, like SF Symbols and Material Symbols do.
 */
function Svg({ children, className = "h-6 w-6", filled }: { children: ReactNode; className?: string; filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string; filled?: boolean };

/** Two cards, one tilted: the decks */
export function IconKort({ className, filled }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.2" y="5.6" width="10.5" height="14.6" rx="2.2" transform="rotate(-9 8.4 12.9)" />
      <rect x="9.4" y="3.6" width="11" height="15.4" rx="2.3" fill={filled ? "currentColor" : "var(--app-bar-bg, var(--papir))"} />
      {!filled && <path d="M13.2 9.5h3.4M13.2 12.5h3.4" />}
    </Svg>
  );
}

export function IconKalender({ className, filled }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" fill={filled ? "currentColor" : "none"} />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke={filled ? "var(--app-bar-bg, var(--papir))" : "currentColor"} />
      <path d="M8 3v3.5M16 3v3.5" />
      <rect x="11" y="12.5" width="3.5" height="3.5" rx="0.8" fill={filled ? "var(--app-bar-bg, var(--papir))" : "currentColor"} stroke="none" />
    </Svg>
  );
}

export function IconHjerte({ className, filled }: IconProps) {
  return (
    <Svg className={className} filled={filled}>
      <path d="M12 20.2s-7.7-4.6-7.7-10.4A4.4 4.4 0 0 1 12 7.1a4.4 4.4 0 0 1 7.7 2.7c0 5.8-7.7 10.4-7.7 10.4Z" />
    </Svg>
  );
}

export function IconMere({ className, filled }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.75" fill={filled ? "currentColor" : "none"} />
      {[8, 12, 16].map((x) => (
        <circle key={x} cx={x} cy="12" r="1.25" fill={filled ? "var(--app-bar-bg, var(--papir))" : "currentColor"} stroke="none" />
      ))}
    </Svg>
  );
}

export const TAB_ICONS = { kort: IconKort, kalender: IconKalender, hjerte: IconHjerte, mere: IconMere };
export type TabIcon = keyof typeof TAB_ICONS;

/** iOS back: a chevron */
export function IconChevronVenstre({ className = "h-[1.35rem] w-[1.35rem]" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M15 4.5 7.5 12l7.5 7.5" strokeWidth={2.4} />
    </Svg>
  );
}

/** Material back: an arrow */
export function IconPilVenstre({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M20 12H4.5M11 5l-7 7 7 7" strokeWidth={2} />
    </Svg>
  );
}

export function IconChevronHoejre({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="m9 5 7 7-7 7" strokeWidth={2.4} />
    </Svg>
  );
}

/* Row icons for the Mere list */
export function IconTandhjul({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
      <circle cx="12" cy="12" r="6.4" />
    </Svg>
  );
}

export function IconBlyant({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 20h4L19.3 8.7a2.1 2.1 0 0 0 0-3l-1-1a2.1 2.1 0 0 0-3 0L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </Svg>
  );
}

export function IconSoejler({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5 20V12M10 20V5M15 20v-9M20 20V8" strokeWidth={2.2} />
    </Svg>
  );
}

export function IconBog({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z" />
      <path d="M12 6.5v13" />
    </Svg>
  );
}

export function IconFest({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 20 8.5 7.5l8 8L4 20Z" />
      <path d="M14 4.5c.6 1.3.3 2.5-.6 3.3M18.5 9.5c1.3-.3 2.4.2 3 1.2M16 3l.5 1.5M20.5 6l-1.4.6" />
    </Svg>
  );
}

export function IconHaand({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 20.5s-7-4.2-7-9.3A4 4 0 0 1 12 8.8a4 4 0 0 1 7 2.4c0 5.1-7 9.3-7 9.3Z" />
      <path d="M9 13.5h6M12 10.5v6" />
    </Svg>
  );
}

export function IconInfo({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 11v5.5M12 7.6v.2" strokeWidth={2.2} />
    </Svg>
  );
}

export function IconLaas({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </Svg>
  );
}

export function IconDel({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5v11M8 7.5l4-4 4 4" />
      <path d="M7 11H5.5v9.5h13V11H17" />
    </Svg>
  );
}

export function IconSoeg({ className = "h-[1.15rem] w-[1.15rem]" }: { className?: string }) {
  return (
    <Svg className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" strokeWidth={2.2} />
      <path d="m15.5 15.5 4.5 4.5" strokeWidth={2.2} />
    </Svg>
  );
}

export function IconTerning({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      {[
        [8.5, 8.5],
        [15.5, 15.5],
        [12, 12],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" fill="currentColor" stroke="none" />
      ))}
    </Svg>
  );
}
