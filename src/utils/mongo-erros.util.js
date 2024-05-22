import { MongooseError } from "mongoose";

export const handleMongoDbErrors = (err) => {
  if (err instanceof MongooseError && err.code === 11000) {
    throw new Error("");
    insertResult = {
      insertedId: null,
      message: "Message expalining the situation.",
    };
  } else {
    throw new Error(err);
  }
};
