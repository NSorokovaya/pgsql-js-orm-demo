import { Request, Response } from "express";
import { createFriendRequest } from "../../repositories/users";

export const addFriend = async (req: Request, res: Response) => {
  try {
    const { requesterId, receiverId } = req.params;
    if (!requesterId && !receiverId) {
      return res
        .status(400)
        .send({ data: null, error: "Please provide fields" });
    }

    const result = await createFriendRequest(requesterId, receiverId);
    return res.send({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ data: null, error: "Please provide fields" });
  }
};
