import { Request, Response } from "express";
import { IProgress } from "../models/User";
import { Types } from "mongoose";

export const getProgress = (req: Request & { user?: any }, res: Response) => {
  res
    .status(200)
    .json({
      message: "Progress fetched successfully",
      progress: req.user.progress,
    });
};

export const updateProgress = async (
  req: Request & { user?: any },
  res: Response
): Promise<any> => {
  const { topicId, completed } = req.body;
  try {
    const progress = req.user.progress.find(
      (p: IProgress) => p.topicId.toString() === topicId
    );
    if (progress) {
      progress.completed = completed;
    } else {
      req.user.progress.push({
        topicId: new Types.ObjectId(topicId as string),
        completed,
      });
    }
    await req.user.save();
    return res.status(200).json({ message: "Progress updated" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};
