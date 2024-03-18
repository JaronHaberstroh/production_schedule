import { describe, test, expect } from "vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
import Department from "../../../../models/department.js";

import { connectDB } from "../../../utils/MongoDB/mongooseSetup.js";
import { disconnectDB } from "../../../utils/MongoDB/mongooseSetup.js";

import createDocument from "../../../../controllers/utils/crud/createDocument.js";
import { validateDocument } from "../../../../controllers/utils/crud/createDocument.js";

describe("createDocument.js", () => {
  // Init test DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test variables
  let testData;

  beforeAll(async () => {
    // Connect to test DB
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB());

    // Set test data variable
    testData = { departmentName: "test" };
  });

  afterEach(async () => {
    // Empty DB
    await Department.deleteMany();
  });

  afterAll(async () => {
    // Disconnect from DB
    await disconnectDB(mongoConnection, mongoServer);
  });

  describe("createDocument()", () => {
    test("should return success object upon successful completion", async () => {
      // Create document using createDocument()
      const document = await createDocument(Department, testData);

      // Expect return object to contain new document Data
      expect(document.success).toBeTruthy();
      expect(document.message).toBe("Document created successfully");
      expect(document.data).toBeTypeOf("object");
    });

    test("should add given value to DB", async () => {
      // Create document using createDocument()
      const document = await createDocument(Department, testData);

      // Search for document in DB
      const result = await Department.findOne(document.data._id);

      // Expect result to have been found and equal testData
      expect(result.departmentName).toEqual(testData.departmentName);
      expect(result._id).toEqual(document.data._id);
    });

    test("should return error object on fail", async () => {
      // Create document using createDocument() with missing params
      const result = await createDocument(Department, {});

      // Expect error message
      expect(result.success).toBeFalsy();
      expect(result.message).toContain("Department validation failed:");
      expect(result.data).toBeTypeOf("object");
    });
  });
});
