import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock environment variables
if (typeof globalThis !== "undefined") {
  globalThis.process = {
    ...globalThis.process,
    env: {
      NODE_ENV: "test",
      VITE_API_URL: "http://localhost:5000",
    },
  };
}

// Mock window.location with full location properties for BrowserRouter
Object.defineProperty(window, "location", {
  value: {
    reload: vi.fn(),
    href: "http://localhost:3000/",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    pathname: "/",
    search: "",
    hash: "",
    assign: vi.fn(),
    replace: vi.fn(),
  },
  writable: true,
});

// Mock history for react-router
Object.defineProperty(window, "history", {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    length: 1,
    state: null,
  },
  writable: true,
});
