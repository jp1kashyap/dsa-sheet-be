import { z } from "zod";

export const SubTopicValidation = z.object({
  title: z.string().min(3),
  youtubeLink: z.string().optional(),
  leetcodeLink: z.string().optional(),
  articleLink: z.string().optional(),
  level: z.enum(["Easy", "Medium", "Hard"]),
});
export const TopicValidation = z.object({
  chapter: z.string().min(3),
  description: z.string().optional(),
  subtopics: z.array(SubTopicValidation).optional(),
});
