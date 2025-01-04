"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicValidation = exports.SubTopicValidation = void 0;
const zod_1 = require("zod");
exports.SubTopicValidation = zod_1.z.object({
    title: zod_1.z.string().min(3),
    youtubeLink: zod_1.z.string().optional(),
    leetcodeLink: zod_1.z.string().optional(),
    articleLink: zod_1.z.string().optional(),
    level: zod_1.z.enum(["Easy", "Medium", "Hard"]),
});
exports.TopicValidation = zod_1.z.object({
    chapter: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    subtopics: zod_1.z.array(exports.SubTopicValidation).optional(),
});
