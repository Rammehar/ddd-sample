import mongoose from "mongoose";
import { authConfig } from "../../../../config";
import { logger } from "../../Logger";

const connectDB = async () => {
  try {
    const autoIndex = process.env.NODE_ENV !== "production";
    await mongoose.connect(
      authConfig.dbUrl,
      { autoIndex },
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    logger.info("Connected to Mongodb");
  } catch (err) {
    logger.error(`Error in DB Connection ${JSON.stringify(err)}`);
  }
};
export { connectDB };
