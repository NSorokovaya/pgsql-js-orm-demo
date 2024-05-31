import { Request, Response } from "express";
import { getUserByID } from "../../../src/controllers/users/get-user-by-id";
import * as usersRepository from "../../../src/repositories/users";

jest.mock("../../../src/repositories/users");

describe("getUserByID", () => {
  const mockgetUserByID = usersRepository.getUserByID as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should returnerror message if no fields are provided ", async () => {
    const req = {
      params: { id: "" },
    } as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await getUserByID(req, res);

    expect(mockgetUserByID).toHaveBeenCalledWith(req.params.id);
  });

  it("should call get user by id method if arguments are correct", async () => {
    const req = {
      params: { id: "1" },
    } as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await getUserByID(req, res);

    expect(mockgetUserByID).toHaveBeenCalledWith(req.params.id);
  });
});
