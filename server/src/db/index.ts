import mongoose from "mongoose";
import { DB_STRING } from "@config";
import logger from "@utils/logger";

const log = logger(module);

export default async () => {
  try {
    mongoose.connect(DB_STRING, {
      authSource: "admin",
    });
    log.info("Connected to database");
  } catch (error) {
    log.error("Error connecting to database: " + error.message);
  }
};
