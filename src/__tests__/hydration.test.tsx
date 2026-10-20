import { describe, it, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function Stored() {
  const [value, , isLoaded] = useLocalStorage("hydration-test", "start");
  return (
    <p>
      {value}:{isLoaded ? "klar" : "venter"}
    </p>
  );
}

describe("useLocalStorage during hydration", () => {
  it("matches the server HTML, then shows the stored value", async () => {
    window.localStorage.removeItem("hydration-test");
    // The real server has no localStorage, so its HTML always holds the initial value
    const html = renderToString(<Stored />);
    expect(html).toContain("start");

    window.localStorage.setItem("hydration-test", JSON.stringify("gemt"));
    const container = document.createElement("div");
    container.innerHTML = html;
    const onRecoverableError = vi.fn();

    await act(async () => {
      hydrateRoot(container, <Stored />, { onRecoverableError });
    });

    expect(onRecoverableError).not.toHaveBeenCalled();
    expect(container.textContent).toBe("gemt:klar");
  });
});
