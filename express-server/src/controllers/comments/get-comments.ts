import { Request, Response } from "express";

import * as commentsRepository from "../../repositories/comments";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentsRepository.getComments();
    return res.send({ data: comments });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
