import { TopicModel } from "../models/topic.model.js";
import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";

const findTopicsByCategory = async (req) => {
  const { id } = matchedData(req);

  const topics = await TopicModel.find({ category: { _id: id } });

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
  const {
    name,
    topicId,
    categoryId,
    allowsImages,
    allowsVideos,
    allowsDocuments,
  } = matchedData(req);

  console.log(
    name,
    topicId,
    categoryId,
    allowsDocuments,
    allowsImages,
    allowsVideos
  );

  const topic = await TopicModel.findById(topicId);

  if (!topic) {
    res.status(404).json({
      success: false,
      error: "Topic not found",
    });
    return;
  }

  if (categoryId) {
    const cat = await CategoryModel.findById(categoryId);

    if (!cat) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
      return;
    }

    topic.category = cat;
  }

  if (name) {
    let oldTopic = undefined;

    if (categoryId) {
      oldTopic = await TopicModel.findOne({
        name,
        category: {
          _id: categoryId,
        },
      });
    } else {
      oldTopic = await TopicModel.findOne({
        name,
        category: {
          _id: topic.category,
        },
      });
    }

    if (oldTopic) {
      res.status(400).json({
        success: false,
        error: "This topic name is already created in this category",
      });
      return;
    }

    topic.name = name;
  }

  if (allowsDocuments !== undefined && typeof allowsDocuments === "boolean") {
    topic.allowsDocuments = allowsDocuments;
  }
  if (allowsDocuments !== undefined && typeof allowsImages === "boolean") {
    topic.allowsImages = !!allowsImages;
  }
  if (allowsDocuments !== undefined && typeof allowsVideos === "boolean") {
    topic.allowsVideos = !!allowsVideos;
  }

  return await topic.save();
};

const deleteTopic = async (req, res) => {
  const { id } = matchedData(req);

  const auxTopic = await TopicModel.findById(id);

  if (!auxTopic) {
    return res.status(404).json({
      success: false,
      error: "Topic not found",
    });
  }

  await auxTopic.deleteOne();
};

export default {
  findTopicsByCategory,
  createTopic,
  updateTopic,
  deleteTopic,
};
