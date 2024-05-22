import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  allowsImages: { type: Boolean, default: false },
  allowsVideos: { type: Boolean, default: false },
  allowsDocuments: { type: Boolean, default: false },
});

export const TopicModel = mongoose.model("Topic", topicSchema);
