import express from "express";
import { getUsers } from "./get-user";
import { getUserByID } from "./get-user-by-id";
import { getUserPermission } from "./getUserPermission";
import { update } from "./update-user";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserByID);
usersRouter.get("/:id/permissions", getUserPermission);
usersRouter.patch("/:id", update);

export { usersRouter };
