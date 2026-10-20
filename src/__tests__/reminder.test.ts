import { describe, it, expect } from "vitest";
import { reminderDates, normalizeReminder } from "@/lib/reminder";

// Tuesday 20 October 2026, local time
const tue = (h: number, m = 0) => new Date(2026, 9, 20, h, m);

describe("reminderDates", () => {
  it("daily: today when the hour is still ahead, then one per day", () => {
    const d = reminderDates(tue(10), { hour: 19, frequency: "dag", weekday: 0 }, 3);
    expect(d.map((x) => [x.getDate(), x.getHours()])).toEqual([[20, 19], [21, 19], [22, 19]]);
  });

  it("daily: tomorrow when the hour has passed", () => {
    expect(reminderDates(tue(20), { hour: 19, frequency: "dag", weekday: 0 }, 1)[0].getDate()).toBe(21);
  });

  it("weekly: keeps the chosen weekday whenever the app is opened", () => {
    const friday = 5;
    // opened Tuesday morning, Tuesday evening and on the Friday itself after the hour
    const a = reminderDates(tue(8), { hour: 19, frequency: "uge", weekday: friday }, 2);
    const b = reminderDates(tue(22), { hour: 19, frequency: "uge", weekday: friday }, 2);
    const c = reminderDates(new Date(2026, 9, 23, 20), { hour: 19, frequency: "uge", weekday: friday }, 2);
    expect(a.map((x) => x.getDay())).toEqual([friday, friday]);
    expect(a[0].getDate()).toBe(23);
    expect(b[0].getDate()).toBe(23);
    expect(c[0].getDate()).toBe(30);
    expect((a[1].getTime() - a[0].getTime()) / 86_400_000).toBeCloseTo(7, 0);
  });

  it("weekly: the same weekday later today still counts", () => {
    expect(reminderDates(tue(8), { hour: 19, frequency: "uge", weekday: 2 }, 1)[0].getDate()).toBe(20);
  });
});

describe("normalizeReminder", () => {
  it("fills in fields from older stored data", () => {
    expect(normalizeReminder({ enabled: true, hour: 7 })).toEqual({ enabled: true, hour: 7, frequency: "dag", weekday: 0 });
  });
});
