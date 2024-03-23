import { describe, test, expect } from "vitest";
import { beforeAll } from "vitest";

import AppError from "../../src/utils/appError";

describe("Custom AppError extends error class", () => {
  // Init test variables
  let message, statusCode;

  beforeAll(() => {
    // Set test variables
    message = "test message";
    statusCode = 404;
  });

  test("Calling AppError creates new instance of AppError", () => {
    // Create instance of AppError
    const error = new AppError(message, statusCode);

    // Expect error to contain message and code properties
    expect(error.message).toBe(message);
    expect(error.code).toBe(statusCode);
  });
});
