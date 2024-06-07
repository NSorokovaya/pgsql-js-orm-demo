import * as postsRepository from "../repositories/posts";
import * as usersRepository from "../repositories/users";

import * as analyticsRepository from "../repositories/mongoose/analytics";
import { UpdatePostPatch } from "../types/posts";

export const createPost = async (
  userId: string,
  title: string,
  content: string
) => {
  // 1. write analytics
  // 1.1. "create post" event
  // 1.2. number of author's friends -- authorsFriendsCount
  // 1.3. number of author's posts -- authorsPostsCount
  // 1.4. title -- postTitle
  // 1.5. content length -- postContentLength

  // 2. create a js script that generates friend pairs

  // 3. (optional) add users_phones and users_emails tables and populate it with data
  // 3.1. create a users_phones table
  // 3.1.1. populate it with data
  // 3.2. create a users_emails table (+)
  // 3.2.1. populate it with data (+)

  // 4. create email and phone notification services
  // 4.1. each time someone creates a post, we should get a list of their friends and send them emails and SMS notifications
  const createPost = await postsRepository.create(userId, title, content);
  const friends = await usersRepository.getUserFriends(userId);
  const posts = await postsRepository.getUserPosts(userId);

  const friendsList = friends?.receiverFriends.concat(
    friends?.requesterFriends
  );

  await analyticsRepository.createAnalytics("create post", {
    authorId: userId,
    authorsFriendsCount: friendsList?.length || 0,
    authorsPostsCount: posts.length,
    postTitle: title,
    postContentLength: content.length,
  });

  // friends.forEach(async (friend) => {
  //   await notificationService.sendEmail(
  //     friend.email,
  //     `Your Friend ${userId} has created a new post`
  //   );
  //   await notificationService.sendSMS(
  //     friend.phoneNumber,
  //     `Your Friend ${userId} has created a new post`
  //   );
  // });

  return createPost;
};

export const updatePost = async (id: string, patch: UpdatePostPatch) => {
  if (!Object.keys(patch).length) {
    throw new Error("Please provide fields to update");
  }

  return await postsRepository.update(id, patch);
};

export const archivePost = async (id: string) => {
  return await postsRepository.update(id, {
    deleted_at: "true",
  });
};

export const unarchivePost = async (id: string) => {
  return await postsRepository.update(id, {
    deleted_at: null,
  });
};

export const destroyPost = async (id: string) => {
  return await postsRepository.destroy(id);
};
//business logic
