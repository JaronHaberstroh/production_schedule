import { describe, test, expect, vi } from "vitest";
import { beforeAll, beforeEach, afterAll } from "vitest";

import AppError from "#utils/appError.js";
import { connectDB, disconnectDB } from "#utils/mongoDB/mongooseSetup.js";

import readDepartment from "#controllers/department/readDepartment.js";
import readDocument from "#controllers/utils/crud/readDocument.js";

vi.mock("#controllers/utils/crud/readDocument.js", () => {
  return {
    default: vi.fn((model, data) => {
      return {
        data: { departmentName: "testing" },
        success: true,
      };
    }),
  };
});

describe("Read department controller", () => {
  // Init DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test varaibles
  let testDepartment, mockReq, mockRes;

  beforeAll(async () => {
    // Connect to DB
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB);
  });

  beforeEach(() => {
    // Set test variables
    testDepartment = { departmentName: "testing" };
    mockReq = { params: "testing" };
    mockRes = {
      status: vi.fn(),
      json: vi.fn(),
    };
  });

  afterAll(async () => {
    // Disconnect from DB
    await disconnectDB(mongoConnection, mongoServer);
  });

  test("should return success response when successful", async () => {
    // Call read department controller
    await readDepartment(mockReq, mockRes);

    // Expect response to have been called with 200
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalled();
  });

  test("should throw error if success false", async () => {
    // Mock readDocument return response
    readDocument.mockReturnValue({
      data: testDepartment,
      success: false,
      message: "Test message",
    });

    // Expect error to be thrown
    await expect(readDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Test message", 500)
    );
  });

  test("should throw error if no data returned", async () => {
    // Mock readDocument return response
    readDocument.mockReturnValue({
      data: undefined,
      success: true,
      message: "Test message",
    });

    // Expect error to be thrown
    await expect(readDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Test message", 404)
    );
  });
});
