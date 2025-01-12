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

export const createTopic = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { chapter, description, subtopics } = req.body;
    const topic = await Topic.findOne({ chapter });
    if (topic) {
      if (!subtopics || !subtopics.length) {
        return res.status(400).json({
          message: "Topic already exist",
        });
      }
      topic.subtopics.push(...subtopics);
      await topic.save();
      return res.status(201).json({
        message: "Topic updated",
      });
    }
    const newTopic = new Topic({
      chapter,
      description: description,
      subtopics,
    });
    await newTopic.save();
    return res.status(201).json({
      message: "Topic created",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
