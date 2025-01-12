import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

describe("Test app.ts", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string, {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Catch all route", async () => {
    const res = await request(app).get("/");
    expect(res.text).toBe("Hello World!");
  });

  test("Auth route", async () => {
    const res = await request(app).get("/api/auth");
    expect(res.status).toBe(404); // Assuming the route requires authentication
  });

  test("Topics route", async () => {
    const res = await request(app).get("/api/topics");
    expect(res.status).toBe(200); // Assuming the route requires authentication
  });

  test("Progress route", async () => {
    const res = await request(app).get("/api/progress");
    expect(res.status).toBe(401); // Assuming the route requires authentication
  });

  test("MongoDB Connection", async () => {
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 means connected
  });
});
