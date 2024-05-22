import { pool } from "../client";
import prisma from "../prisma-client";
import { UpdatePostPatch } from "../types/posts";

export const list = async (orderBy: string, search?: string) => {
  const orderByField = orderBy || "createdAt";
  try {
    const getList = await prisma.posts.findMany({
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      orderBy: {
        [orderByField]: "desc",
      },
    });

    return getList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const listPage = async (
  limit: number,
  offset: number,
  orderBy: string,
  search?: string
) => {
  const orderByField = orderBy || "createdAt";
  try {
    const posts = await prisma.posts.findMany({
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                content: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      orderBy: {
        [orderByField]: "desc",
      },
      take: limit,
      skip: offset,
    });

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const findOne = async (id: string) => {
  try {
    const result = await prisma.posts.findUnique({
      where: {
        id: id,
      },
    });

    return result;
  } finally {
    await prisma.$disconnect;
  }
};

export const create = async (
  user_id: string,
  title: string,
  content: string
) => {
  try {
    const createPost = await prisma.posts.create({
      data: {
        user_id: user_id,
        title: title,
        content: content,
      },
    });

    return createPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const update = async (id: string, patch: UpdatePostPatch) => {
  try {
    const updatedPost = await prisma.posts.update({
      where: { id },
      data: patch,
    });

    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const destroy = async (id: string) => {
  try {
    const deletedPost = await prisma.posts.delete({
      where: { id },
    });

    return deletedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};
