import express from "express";
import { createTopic, getTopics } from "../controllers/topic.controller";
const router = express.Router();

router.get("/", getTopics);
router.post("/", createTopic);

export default router;
