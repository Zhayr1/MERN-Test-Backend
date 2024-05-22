import { connect } from "mongoose";
import { logger } from "../utils/logger.util.js";

export const connectDB = async () => {
  try {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const dbName = process.env.MONGODB_NAME;
    const dbPort = process.env.MONGODB_PORT;
    const dbHost = process.env.MONGODB_HOST;

    const connectURI = `mongodb://${username}:${password}@${dbHost}:${dbPort}/`;

    await connect(connectURI, {
      dbName,
    });

    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};
