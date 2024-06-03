import express from "express";
import { getUsers } from "./get-user";
import { getUserByID } from "./get-user-by-id";
import { getUserPermission } from "./getUserPermission";
import { update } from "./update-user";
import { deleteUserWithPosts } from "./delete-user-with-posts";
import { addFriend } from "./add-friend";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/friends", (req, res) => res.json({ message: "hello" }));
usersRouter.get("/:id", getUserByID);
usersRouter.get("/:id/permissions", getUserPermission);
usersRouter.patch("/:id", update);
usersRouter.delete("/:id", deleteUserWithPosts);
usersRouter.post("/:requesterId/:receiverId", addFriend);

export { usersRouter };

// GET http://localhost:3000/users/friends
// GET http://localhost:3000/users/123
