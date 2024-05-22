import { CategoryModel } from "../models/category.model.js";
import attachmentService from "./attachment.service.js";
import { ContentTypes } from "../constants/content-types.js";
import { matchedData } from "express-validator";

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

const updateCategory = async (req, res) => {
  const name = req.body.name;

  const categoryId = req.params.id;

  if (!categoryId) {
    return res.status(400).json({
      success: false,
      error: "Invalid ID",
    });
  }

  const auxCat = await CategoryModel.findById(categoryId);

  if (!auxCat) {
    return res.status(404).json({
      success: false,
      error: "Category not found",
    });
  }

  if (name) {
    if (typeof name !== "string") {
      return res.status(400).json({
        success: false,
        error: "Name must be a string",
      });
    }

    const oldCat = await CategoryModel.findOne({ name });

    if (oldCat) {
      return res.status(400).json({
        success: false,
        error: "This category name is already used",
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

const deleteCategory = async (req, res) => {
  const { id } = matchedData(req);

  const auxCat = await CategoryModel.findById(id);

  if (!auxCat) {
    return res.status(404).json({
      success: false,
      error: "Category not found",
    });
  }

  await auxCat.deleteOne();
};

export default {
  findCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
