import { stripVTControlCharacters } from "node:util";
import { describe, expect, it } from "vitest";
import { formatPrerenderRoute } from "../../src/prerender/utils.ts";

describe("formatPrerenderRoute", () => {
  it("shows the progress of the prerender after the route", () => {
    const line = formatPrerenderRoute({ route: "/about", generateTimeMS: 12 }, "[3/12]");
    expect(stripVTControlCharacters(line)).toBe("  ├─ /about (12ms) [3/12]");
  });

  it("keeps the progress on the line of the route when it failed", () => {
    const line = formatPrerenderRoute(
      { route: "/missing", generateTimeMS: 4, error: { status: 404, message: "Not Found" } as any },
      "[5/12]"
    );
    expect(stripVTControlCharacters(line).split("\n")[0]).toBe("  ├─ /missing (4ms) [5/12]");
  });
});
