import { Request, Response } from "express";

import * as postsRepository from "../../repositories/posts";

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postsRepository.getUserPost(req.params.id);
    return res.send({ data: posts });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
