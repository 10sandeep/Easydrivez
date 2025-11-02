import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  content: string;
  date: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "General",
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    author: {
      type: String,
      default: "Rideez",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reloads
export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
