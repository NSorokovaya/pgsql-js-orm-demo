import prisma from "../prisma-client";

export const findOneWithRolesPermissions = async (id: string) => {
  try {
    const userWithRolesPermissions = await prisma.users.findUnique({
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

    if (!userWithRolesPermissions) return null;

    const result = userWithRolesPermissions.user_roles.flatMap((userRole) => {
      return userRole.roles.role_permissions.map((rolePermission) => ({
        id: userWithRolesPermissions.id,
        role: userRole.roles.title,
        permission: rolePermission.permissions.title,
      }));
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
      data: { username: patch },
    });

    return updateUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};
