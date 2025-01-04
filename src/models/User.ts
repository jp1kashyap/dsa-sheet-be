import mongoose, { Document, Schema, Types } from "mongoose";

export interface IProgress {
  topicId: Types.ObjectId;
  completed: boolean;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  progress: Array<IProgress>;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [
    {
      topicId: { type: Types.ObjectId },
      completed: { type: Boolean },
    },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
