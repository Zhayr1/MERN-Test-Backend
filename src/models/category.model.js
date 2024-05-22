import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  attachment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
    required: false,
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
