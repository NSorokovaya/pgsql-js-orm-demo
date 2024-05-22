import { pool } from "../client";
import prisma from "../prisma-client";

export const findOneWithRolesPermissions = async (id: string) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `select  u.id as id, r.title as role, p.title as permission from users u
      inner join user_roles ur on ur.user_id = u.id
      inner join roles r  on r.id  = ur.role_id 
      inner join role_permissions rp on rp.role_id = r.id
      inner join permissions p on p.id = rp.permission_id 
      where u.id = $1 
    `,
      [id]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.release();
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
