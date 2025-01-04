import express from "express";
import { getTopics } from "../controllers/topic.controller";
const router = express.Router();

router.get("/", getTopics);

export default router;
