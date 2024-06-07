import { Request, Response } from "express";

import * as usersRepository from "../../repositories/users";

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const friends = await usersRepository.getUserFriends(req.params.id);
    return res.send({ data: friends });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
