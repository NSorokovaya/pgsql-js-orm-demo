import { formatUser } from "../formatter";
import prisma from "../prisma-client";

export const getUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByID = async (id: string) => {
  try {
    const result = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (id: string, patch: any) => {
  try {
    const updateUser = await prisma.users.update({
      where: { id },
      data: { ...patch },
    });

    return updateUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserPermission = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        user_roles: {
          include: {
            roles: {
              include: {
                role_permissions: {
                  include: {
                    permissions: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return formatUser(user);
  } catch (error) {
    console.log(error);
    return null;
  }
};
