import { Request, Response } from "express";
import { deleteUserWithPosts } from "../../../src/controllers/users/delete-user-with-posts";
import * as usersRepository from "../../../src/repositories/users";

jest.mock("../../../src/repositories/users");

describe("deleteUserWithPosts", () => {
  const mockDeleteUserWithPosts =
    usersRepository.deleteUserAndPosts as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error message if no fields are provided ", async () => {
    const req = {
      params: {},
    } as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await deleteUserWithPosts(req, res);

    expect(mockDeleteUserWithPosts).toHaveBeenCalledWith(req.params);
  });

  it("should call deleteUserWithPosts method if arguments are correct", async () => {
    const req = {
      params: { id: "1" },
    } as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await deleteUserWithPosts(req, res);

    expect(mockDeleteUserWithPosts).toHaveBeenCalledWith(req.params.id);
  });
});
