"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const topic_controller_1 = require("../controllers/topic.controller");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const topic_validation_1 = require("../validations/topic.validation");
const router = express_1.default.Router();
router.get("/", topic_controller_1.getTopics);
router.post("/", (0, validationMiddleware_1.validateData)(topic_validation_1.TopicValidation), topic_controller_1.createTopic);
exports.default = router;
