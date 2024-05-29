import { Request, Response } from "express";
import { updateUser } from "../../services/users";

export const update = async (req: Request, res: Response) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
