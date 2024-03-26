import { describe, test, expect } from "vitest";
import { beforeAll, beforeEach, afterAll } from "vitest";
import Department from "#models/department.js";

import { connectDB, disconnectDB } from "#utils/mongoDB/mongooseSetup.js";

import deleteDocument from "#controllers/utils/crud/deleteDocument.js";

describe("deleteDocument.js", () => {
  // Init test DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test variables
  let testData, testDocument;

  beforeAll(async () => {
    // Connect to test DB
    ({ mongoConnection, mongoServer, mongoUrl } = connectDB());

    // Set test data
    testData = [
      { departmentName: "test" },
      { departmentName: "testing" },
      { departmentName: "tested" },
    ];
  });

  beforeEach(async () => {
    // Ensure DB is empty
    await Department.deleteMany();

    // Create new test documents
    await Department.insertMany(testData);

    // Find document _id
    testDocument = await Department.findOne(testData[0]);
  });

  afterAll(async () => {
    // Empty DB
    await Department.deleteMany();

    // Disconnect from DB
    await disconnectDB(mongoConnection, mongoServer);
  });

  describe("deleteDocument()", () => {
    test("should return success object on successful completion", async () => {
      // Delete document
      const result = await deleteDocument(Department, testDocument._id);

      // Expect result to be success object
      expect(result).toBeTypeOf("object");
      expect(result.success).toBe(true);
      expect(result.message).toBe("Successfully deleted Department");
      expect(result.data.deletedCount).toEqual(1);
    });

    test("should remove document by _id", async () => {
      // Delete document
      const result = await deleteDocument(Department, testDocument._id);

      // Attempt to find document after deletion
      const deletedSearchResult = await Department.findOne(testData[0]);

      //Expect document to have been deleted
      expect(result.data.deletedCount).toEqual(1);
      expect(deletedSearchResult).toBe(null);
    });

    test("should return failure object when document not found", async () => {
      // Set test variables
      const document = { _id: "65f55e386fa8592adce78e11" };
      const message = `Error deleting Department, params: ${document}`;

      // Delete document
      const result = await deleteDocument(Department, document);

      // Expect failure object
      expect(result.success).toBe(false);
      expect(result.message).toBe(message);
      expect(result.data.deletedCount).toEqual(0);
    });
  });
});
