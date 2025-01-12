import request from "supertest";
import express from "express";
import { getTopics, createTopic } from "../src/controllers/topic.controller";
import Topic from "../src/models/Topic";

const app = express();
app.use(express.json());
app.get("/topics", getTopics);
app.post("/topics", createTopic);

jest.mock("../src/models/Topic");

describe("Topic Controller", () => {
  describe("GET /topics", () => {
    it("should fetch topics successfully", async () => {
      const mockTopics = [
        { chapter: "Chapter 1", description: "Description 1", subtopics: [] },
      ];
      (Topic.find as jest.Mock).mockResolvedValue(mockTopics);

      const response = await request(app).get("/topics");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Topics fetched successfully");
      expect(response.body.data).toEqual(mockTopics);
    });

    it("should return server error on failure", async () => {
      (Topic.find as jest.Mock).mockRejectedValue(new Error("Server error"));

      const response = await request(app).get("/topics");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Server error");
    });
  });

  describe("POST /topics", () => {
    it("should create a new topic", async () => {
      const newTopic = {
        chapter: "Chapter 1",
        description: "Description 1",
        subtopics: ["Subtopic 1"],
      };
      (Topic.findOne as jest.Mock).mockResolvedValue(null);
      (Topic.prototype.save as jest.Mock).mockResolvedValue(newTopic);

      const response = await request(app).post("/topics").send(newTopic);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Topic created");
    });

    it("should update an existing topic", async () => {
      const existingTopic = {
        chapter: "Chapter 1",
        description: "Description 1",
        subtopics: ["Subtopic 1"],
        save: jest.fn(),
      };
      (Topic.findOne as jest.Mock).mockResolvedValue(existingTopic);

      const response = await request(app)
        .post("/topics")
        .send({ chapter: "Chapter 1", subtopics: ["Subtopic 2"] });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Topic updated");
      expect(existingTopic.subtopics).toContain("Subtopic 2");
    });

    it("should return 400 if topic already exists without subtopics", async () => {
      const existingTopic = {
        chapter: "Chapter 1",
        description: "Description 1",
        subtopics: ["Subtopic 1"],
      };
      (Topic.findOne as jest.Mock).mockResolvedValue(existingTopic);

      const response = await request(app)
        .post("/topics")
        .send({ chapter: "Chapter 1" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Topic already exist");
    });

    it("should return server error on failure", async () => {
      (Topic.findOne as jest.Mock).mockRejectedValue(new Error("Server error"));

      const response = await request(app)
        .post("/topics")
        .send({
          chapter: "Chapter 1",
          description: "Description 1",
          subtopics: ["Subtopic 1"],
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Server error");
    });
  });
});
