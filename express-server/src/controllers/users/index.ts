import express from "express";
import { getUsers } from "./get-user";
import { getUserByID } from "./get-user-by-id";
import { findOneWithRolesPermissions } from "./find-one-with-roles-repmissions";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserByID);
usersRouter.get("/permissions/:id", findOneWithRolesPermissions);

export { usersRouter };
