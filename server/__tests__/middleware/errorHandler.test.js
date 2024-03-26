import { describe, test, expect, vi } from "vitest";
import { beforeAll, beforeEach } from "vitest";

import errorHandler from "../../src/middleware/errorHandler";

describe("errorHandler middleware", () => {
  // Init test variables
  let error, mockReq, mockRes, mockNext;

  beforeAll(() => {
    // Mock express req, res, next
    mockReq = {};
    mockRes = {
      status: vi.fn(),
      json: vi.fn(),
      headersSent: false,
    };
    mockNext = vi.fn();

    // Set test variables
    error = { message: "Test Message", statusCode: 400 };
  });
  beforeEach(() => {
    mockRes = {
      status: vi.fn(),
      json: vi.fn(),
      headerSent: false,
    };
  });

  test("Should do nothing if res.headerSent true", () => {
    // Set header sent true
    mockRes.headersSent = true;

    // Call errorHandler
    errorHandler(error, mockReq, mockRes, mockNext);

    // Expect next to be called and middleware returned from
    expect(mockNext).toBeCalled();
    expect(mockNext).toHaveReturned();
  });

  test("Should send proper response.", () => {
    // Call errorHandler
    errorHandler(error, mockReq, mockRes, mockNext);

    // Expect res to contain message and statusCode
    expect(mockRes.status).toBeCalledWith(400);
    expect(mockRes.json).toBeCalledWith({
      status: "error",
      message: "Test Message",
    });
  });
});
