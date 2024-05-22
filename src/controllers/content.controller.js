import { validationResult } from "express-validator";

import contentService from "../services/content.service.js";

const getPublicContentsByTopic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contents = await contentService.findPublicContents(req, res);

    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    next(error);
  }
};

const getContentsByTopic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const contents = await contentService.findContents(req, res);

    res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    next(error);
  }
};

const createContent = async (req, res, next) => {
  try {
    const content = await contentService.createContent(req, res);

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

const updateContent = async (req, res, next) => {
  try {
    const content = await contentService.updateContent(req, res);

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await contentService.deleteContent(req, res);

    res.status(200).json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getPublicContentsByTopic,
  getContentsByTopic,
  createContent,
  updateContent,
  deleteContent,
};
