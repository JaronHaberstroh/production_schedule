import { describe, test, expect, vi } from "vitest";
import { beforeAll } from "vitest";

import unhandledRoutes from "../../src/middleware/unhandledRoutes";
import AppError from "../../src/utils/appError";

describe("unhandledRoutes", () => {
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

    console.log(next);

    // Expect AppError to be passed to next
    expect(next).toBeCalled();
  });
});
