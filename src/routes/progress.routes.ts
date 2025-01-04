import express from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/progress.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/", authMiddleware, getProgress);
router.post("/", authMiddleware, updateProgress);

export default router;
