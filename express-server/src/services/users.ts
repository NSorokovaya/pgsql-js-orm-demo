import * as usersRepository from "../repositories/users";

export const updateUser = async (id: string, patch: any) => {
  if (!Object.keys(patch).length) {
    throw new Error("Please provide fields to update");
  }

  return await usersRepository.updateUser(id, patch);
};
