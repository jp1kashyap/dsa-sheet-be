"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginValidation = exports.UserRegistrantionValidation = void 0;
const zod_1 = require("zod");
exports.UserRegistrantionValidation = zod_1.z.object({
    name: zod_1.z.string().min(3),
    phone: zod_1.z.string().min(10).max(11),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(32),
});
exports.UserLoginValidation = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(32),
});
