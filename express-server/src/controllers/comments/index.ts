import express from "express";
import { getComments } from "./get-comments";

const commentsRouter = express.Router();

commentsRouter.get("/", getComments);

export { commentsRouter };
