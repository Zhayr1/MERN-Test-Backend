import mongoose from "mongoose";
import { ContentTypes } from "../constants/content-types.js";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: [ContentTypes.IMAGE, ContentTypes.VIDEO, ContentTypes.DOCUMENT],
    required: true,
  },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContentModel = mongoose.model("Content", contentSchema);
