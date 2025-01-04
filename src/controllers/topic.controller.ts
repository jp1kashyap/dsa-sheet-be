import { Request, Response } from "express";
import Topic from "../models/Topic";

export const getTopics = async (req: Request, res: Response): Promise<any> => {
  try {
    const topics = await Topic.find({});
    return res.status(200).json({
      message: "Topics fetched successfully",
      data: topics,
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
};
