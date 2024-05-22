import express from "express";
import fileService from "../services/file.service.js";
import { upload } from "../utils/file-upload.util.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export const fileRoutes = express.Router();

fileRoutes.post(
  "/upload",
  AuthMiddleware,
  upload.single("file"),
  (req, res, next) => {
    try {
      const fileData = fileService.uploadFile(req.file);
      res.status(200).json({
        success: true,
        filePath: fileData.filePath,
      });
    } catch (error) {
      next(error);
    }
  }
);
