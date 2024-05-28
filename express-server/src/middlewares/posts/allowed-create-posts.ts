import { NextFunction, Request, Response } from "express";
import * as usersRepository from "../../repositories/users";

export const allowedCreatePostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userWithPermissions = await usersRepository.getUserPermission(req.uid);

  if (
    !userWithPermissions?.roles.find(
      (user: any) =>
        user.permission === "create_post" ||
        user.role === "Admin" ||
        user.role === "Super Admin"
    )
  ) {
    return res.sendStatus(403);
  }

  next();
};
