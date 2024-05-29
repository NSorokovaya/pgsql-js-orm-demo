import express from "express";
import { getUsers } from "./get-user";
import { getUserByID } from "./get-user-by-id";
import { getUserPermission } from "./getUserPermission";
import { update } from "./update-user";
import { deleteUserWithPosts } from "./delete-user-with-posts";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserByID);
usersRouter.get("/:id/permissions", getUserPermission);
usersRouter.patch("/:id", update);
usersRouter.delete("/:id", deleteUserWithPosts);

export { usersRouter };
