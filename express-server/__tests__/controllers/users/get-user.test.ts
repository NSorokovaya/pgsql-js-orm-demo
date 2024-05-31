import { Request, Response } from "express";
import { getUsers } from "../../../src/controllers/users/get-user";
import * as usersRepository from "../../../src/repositories/users";

jest.mock("../../../src/repositories/users");

describe("getUsers", () => {
  const mockGetUsers = usersRepository.getUsers as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return error message if no fields are provided ", async () => {
    const req = {} as unknown as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await getUsers(req, res);

    expect(mockGetUsers).toHaveBeenCalledWith();
  });

  it("should call update user method if arguments are correct", async () => {
    const req = {} as Request;

    const res = {
      send: jest.fn(),
    } as unknown as Response;

    await getUsers(req, res);

    expect(mockGetUsers).toHaveBeenCalledWith();
  });
});
