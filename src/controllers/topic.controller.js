import { validationResult } from "express-validator";

import topicService from "../services/topic.service.js";

const getTopicsByCategory = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const topics = await topicService.findTopicsByCategory(req);

    res.status(200).json({
      success: true,
      data: topics,
    });
  } catch (error) {
    next(error);
  }
};

const createTopic = async (req, res, next) => {
  try {
    const topic = await topicService.createTopic(req, res);

    res.status(200).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    next(error);
  }
};

const updateTopic = async (req, res, next) => {
  try {
    const topic = await topicService.updateTopic(req, res);

    if (topic) {
      res.status(200).json({
        success: true,
        data: topic,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTopic = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await topicService.deleteTopic(req, res);

    res.status(200).json({
      success: true,
      message: "Topic deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getTopicsByCategory,
  createTopic,
  updateTopic,
  deleteTopic,
};
