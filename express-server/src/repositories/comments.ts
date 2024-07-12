import prisma from "../prisma-client";

export const getComments = async () => {
  try {
    const comments = await prisma.comments.findMany();
    return comments;
  } catch (error) {
    console.error(error);
    return null;
  }
};
