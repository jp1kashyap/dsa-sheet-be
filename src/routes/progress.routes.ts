import express from "express";
import {
  getProgress,
  updateProgress,
} from "../controllers/progress.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateData } from "../middlewares/validationMiddleware";
import { UpdateProgressValidation } from "../validations/progress.validation";

const router = express.Router();

router.get("/", authMiddleware, getProgress);
router.post(
  "/",
  authMiddleware,
  validateData(UpdateProgressValidation),
  updateProgress
);

export default router;
