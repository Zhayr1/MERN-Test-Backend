import { ContentModel } from "../models/content.model.js";
import { TopicModel } from "../models/topic.model.js";
import attachmentService from "./attachment.service.js";
import { ContentTypes } from "../constants/content-types.js";
import { matchedData } from "express-validator";

const findPublicContents = async (req) => {
  const { id } = matchedData(req);

  const contents = await ContentModel.find(
    { topic: { _id: id } },
    { _id: 1, title: 1 }
  );

  return contents;
};

const findContents = async (req) => {
  const { id } = matchedData(req);

  const contents = await ContentModel.find(
    { topic: { _id: id } },
    { _id: 1, title: 1, attachment: 1, type: 1 }
  ).populate("attachment");

  return contents;
};

const createContent = async (req, res) => {
  const { topicId, title, type } = req.body;

  if (!type) {
    res.status(400).json({
      success: false,
      error: `Type must be: ${ContentTypes.DOCUMENT} or ${ContentTypes.DOCUMENT} or ${ContentTypes.VIDEO}`,
    });
    return;
  }

  if (
    type !== ContentTypes.DOCUMENT ||
    type !== ContentTypes.IMAGE ||
    type !== ContentTypes.VIDEO
  ) {
    res.status(400).json({
      success: false,
      error: `Type must be: ${ContentTypes.DOCUMENT} or ${ContentTypes.DOCUMENT} or ${ContentTypes.VIDEO}`,
    });
    return;
  }

  if (!topicId) {
    return res.status(400).json({
      success: false,
      error: "Topic Id is required",
    });
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }

  if (typeof title !== "string") {
    return res.status(400).json({
      success: false,
      error: "Title must be a string",
    });
  }
  const topic = await TopicModel.findById(topicId);

  if (topic) {
    return res.status(404).json({
      success: false,
      error: "Topic not found",
    });
  }

  const savedFile = await attachmentService.createFile(
    req.file,
    ContentTypes.IMAGE,
    req.user.id
  );

  if (!savedFile) {
    res.status(400).json({
      success: false,
      error: "Failed to save attachment",
    });
    return;
  }

  const content = new ContentModel({
    title,
    user: req.user,
    type,
    topic,
    attachment: savedFile,
  });

  return await content.save();
};

const updateContent = async (req, res) => {
  const { topicId, title, type, contentId } = req.body;

  if (!contentId) {
    res.status(400).json({
      success: false,
      error: "contentId is required",
    });
    return;
  }

  const content = ContentModel.findById(contentId);

  if (
    type &&
    (type !== ContentTypes.DOCUMENT ||
      type !== ContentTypes.IMAGE ||
      type !== ContentTypes.VIDEO)
  ) {
    res.status(400).json({
      success: false,
      error: `Type must be: ${ContentTypes.DOCUMENT} or ${ContentTypes.DOCUMENT} or ${ContentTypes.VIDEO}`,
    });
    return;
  }

  if (type && !req.file) {
    res.status(400).json({
      success: false,
      error: `Send a new file. File is required to be changed if the content type is changed`,
    });
    return;
  }

  if (!topicId) {
    return res.status(400).json({
      success: false,
      error: "Topic Id is required",
    });
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }

  if (typeof title !== "string") {
    return res.status(400).json({
      success: false,
      error: "Title must be a string",
    });
  }

  if (type && req.file) {
    content.type = type;

    const savedFile = await attachmentService.createFile(
      req.file,
      type,
      req.user.id
    );

    content.attachment = savedFile;
  }

  const topic = await TopicModel.findById(topicId);

  if (topic) {
    return res.status(404).json({
      success: false,
      error: "Topic not found",
    });
  }

  if (title) {
    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        error: "Title must be a string",
      });
    }

    content.title = title;
  }

  return await content.save();
};

const deleteContent = async (req, res) => {
  const { id } = matchedData(req);

  const auxContent = await ContentModel.findById(id);

  if (!auxContent) {
    return res.status(404).json({
      success: false,
      error: "Content not found",
    });
  }

  await auxContent.deleteOne();
};

export default {
  findContents,
  findPublicContents,
  createContent,
  updateContent,
  deleteContent,
};
