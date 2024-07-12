import { Request, Response } from "express";

import * as usersRepository from "../../repositories/users";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersRepository.getUsers();
    return res.send({ data: users });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
