import { describe, test, expect, vi } from "vitest";
import { beforeAll, beforeEach, afterAll } from "vitest";

import AppError from "#utils/appError.js";
import { connectDB, disconnectDB } from "#utils/mongoDB/mongooseSetup.js";

import createDepartment from "#controllers/department/createDepartment";
import createDocument from "#controllers/utils/crud/createDocument";

// Mock createDocument
vi.mock("#controllers/utils/crud/createDocument", () => {
  return {
    default: vi.fn((model, data) => {
      return {
        data: { departmentName: "testing" },
        success: true,
      };
    }),
  };
});

describe("Create department controller", () => {
  // Init test variables
  let newDepartment, mockReq, mockRes;

  // Init test DB variables
  let mongoConnection, mongoServer, mongoUrl;

  beforeAll(async () => {
    // Connect to test DB
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB());
  });

  beforeEach(async () => {
    // Set test variables
    newDepartment = { departmentName: "testing" };

    // Mock express req, res, next
    mockReq = {
      body: newDepartment,
    };
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
    // Call createDepartment controller
    await createDepartment(mockReq, mockRes);

    // expect response to have been called with 201
    expect(mockRes.status).toBeCalledWith(201);
    expect(mockRes.json).toBeCalled();
  });

  test("should throw error when no departmentName given", async () => {
    // Set mockReq departmentName to null
    mockReq.body.departmentName = null;

    // Expect error to be thrown
    await expect(createDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Department name must be provided", 400)
    );
  });

  test("should throw AppError if success is false", async () => {
    // Mock createDocument return value
    createDocument.mockReturnValue({
      data: { departmentName: "testing" },
      success: false,
    });
    // Expect error to be thrown
    await expect(createDepartment(mockReq, mockRes)).rejects.toThrowError(
      new AppError("Unable to save Department: undefined", 500)
    );
  });
});
