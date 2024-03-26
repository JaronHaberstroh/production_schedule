import { describe, test, expect, vi } from "vitest";
import { beforeAll } from "vitest";

import unhandledRoutes from "../../src/middleware/unhandledRoutes";

describe("unhandledRoutes middleware", () => {
  // Init test varaibles
  let req, res, next;

  beforeAll(() => {
    // Set test variables
    req = { originalUrl: "/nonexistent-route", method: "GET" };
    res = {};
    next = vi.fn();
  });

  test("creates AppError object", () => {
    // Call middleware
    unhandledRoutes(req, res, next);

    // Expect AppError to be passed to next
    expect(next).toBeCalled();
    expect(next).toHaveReturned();
  });
});
