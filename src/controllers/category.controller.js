import { validationResult } from "express-validator";

import categoryService from "../services/category.service.js";

const getCategories = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const categories = await categoryService.findCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors, req.body, req.file);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const category = await categoryService.createCategory(req, res);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// const updateCategory = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const category = await categoryService.updateCategory(req, res);

//     res.status(200).json({
//       success: true,
//       data: category,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteCategory = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     await categoryService.deleteCategory(req, res);

//     res.status(200).json({
//       success: true,
//       message: "Category deleted successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getCategories,
  //   findOneCategory,
  createCategory,
  //   updateCategory,
  //   deleteCategory,
};
