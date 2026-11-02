// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider } from "./ThemeContext";
import App from "./App";

vi.mock("./Sculpture", () => ({
  default: () => <div data-testid="sculpture" />,
}));
beforeEach(() => {
  window.localStorage.clear();
  window.matchMedia = vi
    .fn()
    .mockImplementation(() => ({
      matches: false,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
  };
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
const mount = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );

describe("Portfolio visitor flows", () => {
  it("filters projects and expands the complete project collection", async () => {
    mount();
    expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(
      4,
    );
    fireEvent.click(screen.getByRole("button", { name: /AI & Software/ }));
    await waitFor(() =>
      expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(
        2,
      ),
    );
    expect(
      screen.getByRole("button", { name: "Explore Sakura VTuber" }),
    ).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Hardware & Flight/ }));
    await waitFor(() =>
      expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(
        6,
      ),
    );
    fireEvent.click(screen.getByRole("button", { name: /All work/ }));
    fireEvent.click(
      screen.getByRole("button", { name: /More from the workbench/ }),
    );
    await waitFor(() =>
      expect(screen.getAllByRole("button", { name: /^Explore / })).toHaveLength(
        8,
      ),
    );
  });
  it("opens project notes, preserves real destinations, and restores focus after closing", () => {
    mount();
    const trigger = screen.getByRole("button", {
      name: "Explore Sakura Companion",
    });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog").getAttribute("open")).toBe("");
    expect(
      screen
        .getByRole("link", { name: /View product and downloads/ })
        .getAttribute("href"),
    ).toBe("https://soulofswords.github.io/Sakura-website/");
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(
      screen.getByRole("button", { name: "Close project details" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe("");
  });
  it("lets visitors pause motion, switch themes, and dismiss navigation with Escape", () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Pause motion" }));
    expect(document.documentElement.dataset.motion).toBe("off");
    fireEvent.click(
      screen.getByRole("button", { name: "Switch to light theme" }),
    );
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(
      screen
        .getByRole("button", { name: "Close navigation" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen
        .getByRole("button", { name: "Open navigation" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });
});
