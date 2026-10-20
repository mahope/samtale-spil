import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage when storage misbehaves", () => {
  it("keeps working for the session when localStorage refuses writes", () => {
    const spy = vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new DOMException("quota", "QuotaExceededError");
    });
    const { result } = renderHook(() => useLocalStorage<string[]>("fallback-test", []));

    act(() => result.current[1](["Anna"]));
    act(() => result.current[1]((prev) => [...prev, "Bo"]));

    expect(result.current[0]).toEqual(["Anna", "Bo"]);
    spy.mockRestore();
  });

  it("recovers from data that is not JSON", () => {
    window.localStorage.setItem("corrupt-test", "{not json");
    const { result } = renderHook(() => useLocalStorage<number>("corrupt-test", 0));
    expect(result.current[0]).toBe(0);

    act(() => result.current[1]((n) => n + 1));

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem("corrupt-test")).toBe("1");
  });
});
