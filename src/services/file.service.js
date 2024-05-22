const uploadFile = (file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  return {
    filePath: `/uploads/${file.filename}`,
  };
};

export default {
  uploadFile,
};
