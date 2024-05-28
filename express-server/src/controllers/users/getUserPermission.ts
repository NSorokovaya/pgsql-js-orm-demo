import { Request, Response } from "express";

import * as usersRepository from "../../repositories/users";

export const getUserPermission = async (req: Request, res: Response) => {
  try {
    const user = await usersRepository.getUserPermission(req.params.id);
    return res.send({ data: user });
  } catch (error) {
    console.log(error);
    return res.send({ data: null, error: error });
  }
};
