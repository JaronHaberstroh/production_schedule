import { describe, test, expect } from "vitest";
import { beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";

import { connectDB } from "../../../src/utils/mongoDB/mongooseSetup";
import { disconnectDB } from "../../../src/utils/mongoDB/mongooseSetup";

describe("Database connect/disconnect functions", () => {
  let mongoConnection, mongoServer, mongoUrl;

  beforeAll(async () => {
    ({ mongoConnection, mongoServer, mongoUrl } = await connectDB());
  });

  afterAll(async () => {
    await disconnectDB(mongoConnection, mongoServer);
  });

  test("ConnectDB() should connect to mongod", () => {
    expect(mongoConnection).toBeDefined();
    expect(mongoose.connection.readyState).toBe(1);
  });

  test("DisconectDB() should disconnect from mongod", async () => {
    await disconnectDB(mongoConnection, mongoServer);
    expect(mongoose.connection.readyState).toBe(0);
  });
});
