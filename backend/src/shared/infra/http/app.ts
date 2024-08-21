import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { createStream } from "rotating-file-stream";
import { setupKinde } from "@kinde-oss/kinde-node-express";

import { connectDB } from "../database/mongodb";
import { v1Router } from "./api/v1";
import { logger } from "../Logger";
import { appConfig, kindeConfig } from "../../../config";

const app = express();

setupKinde(kindeConfig, app);

connectDB();

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

// catch unhandled promise rejections here and log them
process.on("unhandledRejection", (ex: any) => {
  logger.error(ex.message, ex);
});

// below code belogs to rate limiter
app.set("trust proxy", 1);
app.get("/ip", (request, response) => response.send(request.ip));

// create a rotating write stream
const accessLogStream = createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  // compress: "gzip", // compress rotated files
  interval: "5d", // rotate daily
  path: path.join(path.normalize(`${__dirname}/../../../..`), "logs"),
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));

// app.use(express.static("files"));

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  cors({
    credentials: true,
    origin: appConfig.origin,
  })
);
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use("/api/v1", v1Router);

// handling csrf token error
app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  return res.status(403).json({ message: "Invalid csrf token" });
});

const port = process.env.PORT || 5002;

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    logger.info(`[App]: Listening on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  logger.error(err);
});
