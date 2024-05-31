import { updateUser } from "../../src/services/users";
import * as usersRepository from "../../src/repositories/users";

jest.mock("../../src/repositories/users");

describe("user-services", () => {
  describe("updateUser", () => {
    const mockUpdateUser = usersRepository.updateUser as jest.Mock;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should throw an error if no fields are provided to update", async () => {
      const id = "123";
      const patch = {};

      await expect(updateUser(id, patch)).rejects.toThrow(
        "Please provide fields to update"
      );
    });

    it("should call update user method if arguments are correct", async () => {
      const id = "123";
      const patch = { username: "123" };

      await updateUser(id, patch);

      expect(mockUpdateUser).toHaveBeenCalledWith(id, patch);
    });
  });
});
