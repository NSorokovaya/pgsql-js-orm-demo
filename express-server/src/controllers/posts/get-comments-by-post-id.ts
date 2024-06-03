import { Request, Response } from "express";

import * as postsRepository from "../../repositories/posts";

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const comments = await postsRepository.getCommentsByPostId(
      req.params.postId
    );
    return res.send({ data: comments });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
