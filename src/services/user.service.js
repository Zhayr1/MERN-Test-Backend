import { UserModel } from "../models/user.model.js";

const getUserProfile = async (userId) => {
  const user = await UserModel.findById(userId).select("-password");
  return user;
};

export default {
  getUserProfile,
};
