"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgressValidation = void 0;
const zod_1 = require("zod");
exports.UpdateProgressValidation = zod_1.z.object({
    topicId: zod_1.z.string(),
    completed: zod_1.z.boolean(),
});
