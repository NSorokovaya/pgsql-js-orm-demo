import express from "express";

import { list } from "./list";
import { findOne } from "./find-one";
import { create } from "./create";
import { update } from "./update";
import { unarchive } from "./unarchive";
import { archive } from "./archive";
import { destroy } from "./destroy";

import { authMiddleware } from "../../middlewares/auth";
import { allowedCreatePostsMiddleware } from "../../middlewares/posts/allowed-create-posts";
import { allowedUpdatePostMiddleware } from "../../middlewares/posts/allowed-update-post";
import { getCommentsByPost } from "./get-comments-by-post-id";
import { getUserPosts } from "./get-user-posts";

const postsRouter = express.Router();

postsRouter.get("/", list);
postsRouter.get("/:id", findOne);
postsRouter.post("/", [authMiddleware], create);
postsRouter.patch("/:id", [authMiddleware], update);
postsRouter.put("/:id/unarchive", [authMiddleware], unarchive);
postsRouter.delete("/:id/archive", [authMiddleware], archive);
postsRouter.delete("/:id", [authMiddleware], destroy);
postsRouter.get("/:id/user", getUserPosts);

postsRouter.get("/:postId/comments", getCommentsByPost);

export { postsRouter };
