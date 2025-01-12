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
exports.createTopic = exports.getTopics = void 0;
const Topic_1 = __importDefault(require("../models/Topic"));
const getTopics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const topics = yield Topic_1.default.find({});
        return res.status(200).json({
            message: "Topics fetched successfully",
            data: topics,
        });
    }
    catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getTopics = getTopics;
const createTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chapter, description, subtopics } = req.body;
        const topic = yield Topic_1.default.findOne({ chapter });
        if (topic) {
            if (!subtopics || !subtopics.length) {
                return res.status(400).json({
                    message: "Topic already exist",
                });
            }
            topic.subtopics.push(...subtopics);
            yield topic.save();
            return res.status(201).json({
                message: "Topic updated",
            });
        }
        const newTopic = new Topic_1.default({
            chapter,
            description: description,
            subtopics,
        });
        yield newTopic.save();
        return res.status(201).json({
            message: "Topic created",
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Server error",
        });
    }
});
exports.createTopic = createTopic;
