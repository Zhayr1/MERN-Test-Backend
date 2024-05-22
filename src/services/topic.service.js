import { TopicModel } from "../models/topic.model.js";
import attachmentService from "./attachment.service.js";
import { ContentTypes } from "../constants/content-types.js";
import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";

const findTopicsByCategory = async (req) => {
  const { id } = matchedData(req);

  const topics = await TopicModel.find({ category: { id } });

  return topics;
};

const createTopic = async (req, res) => {
  const { name, categoryId, allowsImages, allowsVideos, allowsDocuments } =
    matchedData(req);

  const auxTopic = await TopicModel.findOne({
    name,
    category: { _id: categoryId },
  });

  if (auxTopic) {
    return res.status(400).json({
      success: false,
      error: "This topic name already was created in this category",
    });
  }

  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    return res.status(404).json({
      success: false,
      error: "Category not found",
    });
  }

  const Topic = new TopicModel({
    name: name,
    allowsDocuments,
    allowsImages,
    allowsVideos,
    category,
  });

  return await Topic.save();
};

const updateTopic = async (req, res) => {
  const name = req.body.name;

  const TopicId = req.params.id;

  if (!TopicId) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID",
    });
  }

  const auxCat = await TopicModel.findById(TopicId);

  if (!auxCat) {
    return res.status(404).json({
      success: false,
      error: "Topic not found",
    });
  }

  if (name) {
    if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        error: "Name must be a string",
      });
    }

    const oldCat = await TopicModel.findOne({ name });

    if (oldCat) {
      return res.status(400).json({
        success: false,
        error: "This Topic name is already used",
      });
    }

    auxCat.name = name;
  }
  if (req.file) {
    const savedFile = await attachmentService.createFile(
      req.file,
      ContentTypes.IMAGE,
      req.user.id
    );

    auxCat.attachment = savedFile;
  }

  return await auxCat.save();
};

const deleteTopic = async (req, res) => {
  const { id } = matchedData(req);

  const auxCat = await TopicModel.findById(id);

  if (!auxCat) {
    return res.status(404).json({
      success: false,
      error: "Topic not found",
    });
  }

  await auxCat.deleteOne();
};

export default {
  findTopicsByCategory,
  createTopic,
  updateTopic,
  deleteTopic,
};
