import express from "express";

// controllers
import { postsRouter } from "./controllers/posts";
import { usersRouter } from "./controllers/users";
import { commentsRouter } from "./controllers/comments";

// logger
import logger from "./logger";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware ";

const app = express();

app.use(express.json());

app.use("/posts", [loggingMiddleware, errorHandlerMiddleware], postsRouter);

app.use("/users", [loggingMiddleware, errorHandlerMiddleware], usersRouter);
app.use(
  "/comments",
  [loggingMiddleware, errorHandlerMiddleware],
  commentsRouter
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Promise Rejection: ${reason}`);
  process.exit(1);
});

app.listen(3000, () => {
  logger.info("Server is listening...");
});

// 0. add timestamp to logs
// 1. create a logging middleware
// 2. create error handler middleware -- add logger here as well
// 3. unhandledException and unhandledPromiseRejection
