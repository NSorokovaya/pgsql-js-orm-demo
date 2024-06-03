import { Request, Response } from "express";
import { addFriend } from "../../../src/controllers/users/add-friend";
import * as usersRepository from "../../../src/repositories/users";

jest.mock("../../../src/repositories/users");

describe("addFriend", () => {
  const mockAddFriend = usersRepository.createFriendRequest as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should returnerror message if no fields are provided to add friend", async () => {
    const req = {
      params: {},
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await addFriend(req, res);

    expect(mockAddFriend).toHaveBeenCalledWith(undefined, undefined);
  });

  it("should call add friend method if arguments are correct", async () => {
    const requesterId = "123";
    const receiverId = "321";
    const req = {
      params: { requesterId, receiverId },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await addFriend(req, res);

    expect(mockAddFriend).toHaveBeenCalledWith(requesterId, receiverId);
  });
});
