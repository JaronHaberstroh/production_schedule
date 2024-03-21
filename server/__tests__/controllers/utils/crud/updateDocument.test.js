import { describe, test, expect } from "vitest";
import { beforeAll, beforeEach, afterAll } from "vitest";
import Department from "../../../../src/models/department.js";

import { connectDB } from "../../../../src/utils/mongoDB/mongooseSetup.js";
import { disconnectDB } from "../../../../src/utils/mongoDB/mongooseSetup.js";

import updateDocument from "../../../../src/controllers/utils/crud/updateDocument.js";

describe("updateDocument.js", () => {
  // Init test DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test variables
  let testData, testDocument, testId, params;

  beforeAll(async () => {
    // Connect to test DB
    ({ mongoConnection, mongoServer, mongoUrl } = connectDB());

    // Set test data
    testData = [
      { departmentName: "test" },
      { departmentName: "testing" },
      { departmentName: "tested" },
    ];
    params = { departmentName: "newTest" };
  });

  beforeEach(async () => {
    // Ensure DB is empty
    await Department.deleteMany();

    // Create new test documents
    await Department.insertMany(testData);

    // Find document _id
    testDocument = await Department.findOne(testData[0]);
    testId = { _id: testDocument._id };
  });

  afterAll(async () => {
    // Empty DB
    await Department.deleteMany();

    // Disconnect from DB
    await disconnectDB(mongoConnection, mongoServer);
  });

  test("should return success object on completion", async () => {
    // Update document
    const result = await updateDocument(Department, testId, params);

    // Expect result to have been returned
    expect(result.success).toBeTruthy();
    expect(result.message).toBe("Successfully updated document");
    expect(result.data).toBeTypeOf("object");
  });

  test("should update document with given params", async () => {
    // Update document
    const result = await updateDocument(Department, testId, params);

    testDocument = await Department.findOne(testId);

    // Expect document to be updated
    expect(result.data.modifiedCount).toEqual(1);
    expect(params.departmentName).toEqual(testDocument.departmentName);
  });
});
