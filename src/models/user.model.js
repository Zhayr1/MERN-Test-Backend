import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// import { logger } from "../utils/logger.util.js";
import { UserRolesEnum } from "../constants/user-roles.js";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRolesEnum.ADMIN, UserRolesEnum.READER, UserRolesEnum.CREATOR],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// // Hash the password before saving the user
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   logger.info(process.env);
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     logger.error(error);
//     next(error);
//   }
// });

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = mongoose.model("User", userSchema);
