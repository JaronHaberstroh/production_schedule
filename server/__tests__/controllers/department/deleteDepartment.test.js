import { describe, test, expect, vi } from "vitest";
import { beforeAll, beforeEach, afterAll } from "vitest";

import AppError from "#utils/appError.js";
import { connectDB, disconnectDB } from "#utils/mongoDB/mongooseSetup.js";

import deleteDepartment from "#controllers/department/deleteDepartment.js";
import deleteDocument from "#controllers/utils/crud/deleteDocument.js";

vi.mock("#controllers/utils/crud/deleteDocument.js", () => {
  return {
    default: vi.fn((model, data) => {
      return {
        data: { _id: "testing" },
        success: true,
      };
    }),
  };
});

describe("Delete department controller", () => {
  // Init DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test variables
  let testDepartment, mockReq, mockRes;

  beforeAll(async () => {
    // Connect to DB
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB());
  });

  beforeEach(() => {
    // Set test variables
    testDepartment = { _id: "testing" };
    mockReq = {
      body: testDepartment,
    };
    mockRes = {
      status: vi.fn(),
      json: vi.fn(),
    };
  });

  afterAll(async () => {
    // Disconnect from DB
    disconnectDB(mongoConnection, mongoServer);
  });

  test("should return success response when successful", async () => {
    // Call delete department controller
    await deleteDepartment(mockReq, mockRes);

    // Expect response to have been called with 200
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockRes.json).toBeCalled();
  });

  test("should throw error when department _id not provided", async () => {
    // Set mockReq id to null
    mockReq.body._id = null;

    // Expect error to be thrown
    await expect(deleteDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Department ID must be provided", 400)
    );
  });

  test("should throw error if success is false", async () => {
    // Mock deleteDocument return value
    deleteDocument.mockReturnValue({
      data: testDepartment,
      success: false,
      message: "Test message",
    });
    // Expect error to be thrown
    await expect(deleteDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Test message", 500)
    );
  });
});
