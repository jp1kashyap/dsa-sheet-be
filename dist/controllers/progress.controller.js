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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgress = exports.getProgress = void 0;
const mongoose_1 = require("mongoose");
const getProgress = (req, res) => {
    res
        .status(200)
        .json({
        message: "Progress fetched successfully",
        progress: req.user.progress,
    });
};
exports.getProgress = getProgress;
const updateProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicId, completed } = req.body;
    try {
        const progress = req.user.progress.find((p) => p.topicId.toString() === topicId);
        if (progress) {
            progress.completed = completed;
        }
        else {
            req.user.progress.push({
                topicId: new mongoose_1.Types.ObjectId(topicId),
                completed,
            });
        }
        yield req.user.save();
        return res.status(200).json({ message: "Progress updated" });
    }
    catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.updateProgress = updateProgress;
