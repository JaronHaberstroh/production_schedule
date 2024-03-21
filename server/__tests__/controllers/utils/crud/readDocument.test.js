import { describe, test, expect } from "vitest";
import { beforeAll, afterAll } from "vitest";
import Department from "../../../../src/models/department.js";

import { connectDB } from "../../../../src/utils/mongoDB/mongooseSetup.js";
import { disconnectDB } from "../../../../src/utils/mongoDB/mongooseSetup.js";

import readDocument from "../../../../src/controllers/utils/crud/readDocument.js";

describe("readDocument.js", () => {
  // Init test DB variables
  let mongoConnection, mongoServer, mongoUrl;

  // Init test variables
  let testData;

  beforeAll(async () => {
    // Connect to test DB
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB());

    // Set test data variable
    testData = [
      { departmentName: "test" },
      { departmentName: "testing" },
      { departmentName: "tested" },
    ];

    // Insert test data into DB
    await Department.insertMany(testData);
  });

  afterAll(async () => {
    // Empty DB
    await Department.deleteMany();

    // Disconnect from DB
    await disconnectDB(mongoConnection, mongoServer);
  });

  describe.concurrent("readDocument()", () => {
    test("Should find document by name", async () => {
      // Search DB for department matching params
      const result = await readDocument(Department, testData[0]);

      // Expect result to find document matching given testData
      expect(result.data.departmentName).toEqual(testData.departmentName);
    });

    test("Should return all documents in collection when no params provided", async () => {
      // Search DB for department without params
      const result = await readDocument(Department, {});

      // Expect result to return all entries
      expect(result.data.length).toEqual(testData.length);
    });

    test("Should find nothing if matching data not in DB", async () => {
      // Search DB with invalid params
      const result = await readDocument(Department, {
        departmentName: "invalidDepartmentName",
      });

      // Expect result to be empty array
      expect(result.data.length).toEqual(0);
    });
  });
});
