import express from "express";
import { createTopic, getTopics } from "../controllers/topic.controller";
import { validateData } from "../middlewares/validationMiddleware";
import { TopicValidation } from "../validations/topic.validation";

const router = express.Router();

router.get("/", getTopics);
router.post("/", validateData(TopicValidation), createTopic);

export default router;
