"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const progress_controller_1 = require("../controllers/progress.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const progress_validation_1 = require("../validations/progress.validation");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authMiddleware, progress_controller_1.getProgress);
router.post("/", authMiddleware_1.authMiddleware, (0, validationMiddleware_1.validateData)(progress_validation_1.UpdateProgressValidation), progress_controller_1.updateProgress);
exports.default = router;
