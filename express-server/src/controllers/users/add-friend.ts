import { Request, Response } from "express";
import { createFriendRequest } from "../../repositories/users";

export const addFriend = async (req: Request, res: Response) => {
  try {
    const result = await createFriendRequest(
      req.params.requesterId,
      req.params.receiverId
    );
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: null, error });
  }
};
