import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateData } from "../middlewares/validationMiddleware";
import {
  UserRegistrantionValidation,
  UserLoginValidation,
} from "../validations/user.validation";

const router = express.Router();

router.post("/register", validateData(UserRegistrantionValidation), register);
router.post("/login", validateData(UserLoginValidation), login);

export default router;
