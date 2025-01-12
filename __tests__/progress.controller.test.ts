import request from "supertest";
import express, { Request } from "express";
import {
  getProgress,
  updateProgress,
} from "../src/controllers/progress.controller";
import { Types } from "mongoose";

const app = express();
app.use(express.json());

app.get("/progress", (req: any, res) => {
  req.user = { progress: [{ topicId: new Types.ObjectId(), completed: true }] };
  getProgress(req, res);
});

app.put("/progress", (req: any, res) => {
  req.user = {
    progress: [
      {
        topicId: new Types.ObjectId("507f191e810c19729de860ea"),
        completed: false,
      },
    ],
    save: jest.fn().mockResolvedValue(true),
  };
  updateProgress(req, res);
});

describe("Progress Controller", () => {
  it("should fetch progress successfully", async () => {
    const response = await request(app).get("/progress");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Progress fetched successfully");
    expect(response.body.progress).toBeDefined();
  });

  it("should update progress successfully", async () => {
    const response = await request(app)
      .put("/progress")
      .send({ topicId: "507f191e810c19729de860ea", completed: true });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Progress updated");
  });

  it("should handle server error on update progress", async () => {
    app.put("/progress", (req: any, res) => {
      req.user = {
        progress: [
          {
            topicId: new Types.ObjectId("507f191e810c19729de860ea"),
            completed: false,
          },
        ],
        save: jest.fn().mockRejectedValue(new Error("Server error")),
      };
      updateProgress(req, res);
    });

    const response = await request(app)
      .put("/progress")
      .send({ topicId: "507f191e810c19729e860ea", completed: true });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Server error");
  });
});
