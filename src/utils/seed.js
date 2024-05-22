import { UserRolesEnum } from "../constants/user-roles.js";
import { UserModel } from "../models/user.model.js";
import { logger } from "./logger.util.js";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const username = process.env.ADMIN_USERNAME;

  const aux = await UserModel.findOne({
    email,
    username,
    role: UserRolesEnum.ADMIN,
  });

  if (aux) {
    logger.info("Admin user exists, skipping seed");
    return;
  }

  const admin = new UserModel({
    email,
    password,
    role: UserRolesEnum.ADMIN,
    username,
  });

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(password, salt);

  await admin.save();

  admin.save();

  logger.info("Admin user created");
};
