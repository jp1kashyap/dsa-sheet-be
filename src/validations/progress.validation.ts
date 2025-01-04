import { z } from "zod";

export const UpdateProgressValidation = z.object({
  topicId: z.string(),
  completed: z.boolean(),
});
