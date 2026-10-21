"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { tap } from "@/lib/platform";
import { IconChevronHoejre } from "./icons";

/**
 * Settings-style lists. iOS: inset grouped sections with rounded corners, hairlines indented
 * past the icon, and a grey chevron. Android: full-width Material list items (56dp+), a
 * coloured section header and no card around the rows.
 */
export function AppSection({ title, footer, children }: { title?: string; footer?: ReactNode; children: ReactNode }) {
  return (
    <section className="mt-7 first:mt-2 android:mt-2 android:border-t android:border-streg android:pt-2 android:first:border-t-0">
      {title && (
        <h2 className="mb-1.5 px-8 font-sans text-[13px] font-normal leading-tight tracking-normal text-blaek-2 android:mb-0 android:px-4 android:pb-2 android:pt-3 android:text-sm android:font-semibold android:text-bord android:dark:text-kridt">
          {title}
        </h2>
      )}
      <ul className="app-rows mx-4 overflow-hidden rounded-[11px] bg-flade android:mx-0 android:rounded-none android:bg-transparent">
        {children}
      </ul>
      {footer && <div className="px-8 pt-1.5 text-[13px] leading-snug text-blaek-2 android:px-4 android:text-sm">{footer}</div>}
    </section>
  );
}

interface RowProps {
  label: ReactNode;
  /** Second line under the label */
  detail?: ReactNode;
  icon?: ReactNode;
  /** A larger leading picture instead of an icon (a deck's back) */
  media?: ReactNode;
  /** Background of the icon tile on iOS */
  tone?: string;
  /** Text to the right, before the chevron */
  value?: ReactNode;
  /** A control to the right (switch, select); the row becomes a <label> for it */
  control?: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Use for rows that open something outside the list (share sheet) */
  chevron?: boolean;
}

export function AppRow({ label, detail, icon, media, tone = "var(--bord)", value, control, href, onClick, chevron }: RowProps) {
  const showChevron = chevron ?? !!href;
  const body = (
    <>
      {icon && (
        <span
          className="my-2 flex h-[30px] w-[30px] shrink-0 items-center justify-center self-center rounded-[7px] text-white android:my-0 android:h-6 android:w-6 android:rounded-none android:bg-transparent! android:text-blaek-2"
          style={{ background: tone }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {media && (
        <span className="flex shrink-0 items-center self-center py-2.5" aria-hidden="true">
          {media}
        </span>
      )}
      <span className="app-row-body flex min-h-11 flex-1 items-center gap-3 border-t-[0.5px] border-streg py-2.5 pr-4 android:min-h-14 android:border-t-0 android:py-3 android:pr-6">
        <span className="min-w-0 flex-1">
          <span className="block text-[17px] leading-snug android:text-base">{label}</span>
          {detail && <span className="mt-0.5 block text-[15px] leading-snug text-blaek-2 android:text-sm">{detail}</span>}
        </span>
        {value !== undefined && <span className="shrink-0 text-[17px] text-blaek-2 android:text-sm">{value}</span>}
        {control}
        {showChevron && <IconChevronHoejre className="h-[15px] w-[15px] shrink-0 text-[#b5c1ba] dark:text-[#4d6157] android:hidden" />}
      </span>
    </>
  );
  const cls = `app-row app-press relative flex w-full items-stretch gap-3 overflow-hidden pl-4 text-left ${
    href || onClick ? "active:bg-flade-2 android:active:bg-transparent" : ""
  } android:gap-4 android:pl-4`;

  if (href) {
    return (
      <li>
        <Link href={href} className={cls} data-ripple onClick={() => tap()}>
          {body}
        </Link>
      </li>
    );
  }
  if (onClick) {
    return (
      <li>
        <button type="button" className={cls} data-ripple onClick={onClick}>
          {body}
        </button>
      </li>
    );
  }
  if (control) {
    return (
      <li>
        <label className={cls}>{body}</label>
      </li>
    );
  }
  return (
    <li>
      <div className={cls}>{body}</div>
    </li>
  );
}

/** iOS: a green 51x31 switch. Android: a Material 3 switch (52x32, thumb grows when on). */
export function AppSwitch({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name when the switch is not inside a labelled row */
  label?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type="checkbox"
      role="switch"
      className="app-switch shrink-0"
      checked={checked}
      disabled={disabled}
      aria-label={label}
      onChange={(e) => {
        tap();
        onChange(e.target.checked);
      }}
    />
  );
}

/** iOS segmented control / Material 3 segmented buttons */
export function AppSegmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="app-segmented flex w-full rounded-[9px] bg-flade-2 p-0.5 android:rounded-full android:bg-transparent android:p-0 android:ring-1 android:ring-blaek-2/60"
    >
      {options.map((o, i) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            data-ripple
            onClick={() => {
              tap();
              onChange(o.value);
            }}
            className={`app-press relative min-h-8 flex-1 overflow-hidden rounded-[7px] px-2 text-[13px] font-semibold transition-colors android:min-h-10 android:rounded-none android:text-sm android:font-medium ${
              i > 0 ? "android:border-l android:border-blaek-2/60" : ""
            } ${
              on
                ? "bg-flade shadow-[0_1px_3px_rgb(0_0_0/0.12),0_0_0_0.5px_rgb(0_0_0/0.04)] dark:bg-[#3a4d44] android:bg-[color-mix(in_srgb,var(--kridt)_45%,transparent)] android:shadow-none android:dark:bg-bord-lys"
                : "text-blaek"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
