import mongoose from "mongoose";
import { ContentTypes } from "../constants/content-types.js";

const attachmentSchema = new mongoose.Schema(
  {
    fileName: { type: String },
    type: {
      type: String,
      enum: [ContentTypes.IMAGE, ContentTypes.VIDEO, ContentTypes.DOCUMENT],
      required: true,
    },
    mimeType: { type: String },
    url: { type: String },
    size: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AttachmentModel = mongoose.model("Attachment", attachmentSchema);
