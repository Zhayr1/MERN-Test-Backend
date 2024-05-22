import { AttachmentModel } from "../models/attachment.model.js";

const createFile = async (file, fileType, userId) => {
  const attachment = new AttachmentModel({
    fileName: file.filename,
    size: file.size,
    mimeType: file.mimetype,
    type: fileType,
    user: userId,
    url: file.path,
  });

  return await attachment.save();
};

export default {
  createFile,
};
