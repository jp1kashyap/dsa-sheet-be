import mongoose, { Document, Schema } from "mongoose";

export interface ISubtopic {
  title: string;
  youtubeLink: string;
  leetcodeLink: string;
  articleLink: string;
  level: string;
}

export interface ITopic extends Document {
  chapter: string;
  description: string;
  subtopics: Array<ISubtopic>;
}

const TopicSchema: Schema = new Schema({
  chapter: { type: String, required: true },
  description: { type: String },
  subtopics: [
    {
      title: { type: String, required: true },
      youtubeLink: { type: String },
      leetcodeLink: { type: String },
      articleLink: { type: String },
      level: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
      },
    },
  ],
});

export default mongoose.model<ITopic>("Topic", TopicSchema);
