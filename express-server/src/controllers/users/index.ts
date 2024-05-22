import express from "express";
import { getUsers } from "./get-user";
import { getUserByID } from "./get-user-by-id";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserByID);

export { usersRouter };
