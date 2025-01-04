"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, password } = req.body;
    try {
        const userWithPhone = yield User_1.default.findOne({ phone });
        if (userWithPhone) {
            return res
                .status(400)
                .json({ message: "User already exists with this phone number" });
        }
        const userWithEmail = yield User_1.default.findOne({ email });
        if (userWithEmail) {
            return res
                .status(400)
                .json({ message: "User already exists with this email" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new User_1.default({ name, email, phone, password: encryptedPassword });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (e) {
        res.status(500).json({ message: `Server error` });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ name: user.name, token });
    }
    catch (e) {
        res.status(500).json({ message: `Server error` });
    }
});
exports.login = login;
