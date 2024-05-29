import { Request, Response } from "express";

import * as usersRepository from "../../repositories/users";

export const deleteUserWithPosts = async (req: Request, res: Response) => {
  try {
    const user = await usersRepository.deleteUserAndPosts(req.params.id);
    return res.send({ data: user });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
