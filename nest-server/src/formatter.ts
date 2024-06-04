export const formatUser = (user: any) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    roles: user.user_roles.map((userRole: any) => ({
      id: userRole.roles.id,
      title: userRole.roles.title,
      permissions: userRole.roles.role_permissions.map(
        (rolePermission: any) => ({
          id: rolePermission.permissions.id,
          title: rolePermission.permissions.title,
        }),
      ),
    })),
  };
};
