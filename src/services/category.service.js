import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";
import attachmentService from "./attachment.service.js";
import { ContentTypes } from "../constants/content-types.js";
import { logger } from "../utils/logger.util.js";

const findCategories = async () => {
  const categories = await CategoryModel.find({}).populate("attachment");

  return categories;
};

const createCategory = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Name is required",
    });
  }

  if (typeof name !== "string") {
    return res.status(400).json({
      success: false,
      error: "Name must be a string",
    });
  }

  const auxCat = await CategoryModel.findOne({ name });

  if (auxCat) {
    return res.status(400).json({
      success: false,
      error: "This category is already created",
    });
  }

  const category = new CategoryModel({
    name: name,
  });

  const savedCategory = await category.save();

  const savedFile = await attachmentService.createFile(
    req.file,
    ContentTypes.IMAGE,
    req.user.id
  );

  savedCategory.attachment = savedFile;

  return await savedCategory.save();
};

// const updateCategory = async (req, res) => {};

// const deleteCategory = async (req, res) => {};

export default {
  findCategories,
  createCategory,
  //   updateCategory,
  //   deleteCategory,
};
