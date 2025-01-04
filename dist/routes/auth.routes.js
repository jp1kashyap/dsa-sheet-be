"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const user_validation_1 = require("../validations/user.validation");
const router = express_1.default.Router();
router.post("/register", (0, validationMiddleware_1.validateData)(user_validation_1.UserRegistrantionValidation), auth_controller_1.register);
router.post("/login", (0, validationMiddleware_1.validateData)(user_validation_1.UserLoginValidation), auth_controller_1.login);
exports.default = router;
