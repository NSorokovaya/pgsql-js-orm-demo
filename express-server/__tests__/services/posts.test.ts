import { createPost, destroyPost, updatePost } from "../../src/services/posts";
import * as postsRepository from "../../src/repositories/posts";

jest.mock("../../src/repositories/posts");

describe("post-services", () => {
  const mockCreatePost = postsRepository.create as jest.Mock;
  const mockUpdatePost = postsRepository.update as jest.Mock;
  const mockDestroyPost = postsRepository.destroy as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call create post method if arguments are correct", async () => {
      const userId = "235";
      const title = "title";
      const content = "content";
      await createPost(userId, title, content);

      expect(mockCreatePost).toHaveBeenCalledWith(userId, title, content);
    });
  });

  describe("updatePost", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should throw an error if no fields are provided to update", async () => {
      const id = "123";
      const patch = {};

      await expect(updatePost(id, patch)).rejects.toThrow(
        "Please provide fields to update"
      );
    });

    it("should call update post method if arguments are correct", async () => {
      const id = "235";
      const patch = { content: "fegewf", title: "123" };

      await updatePost(id, patch);

      expect(mockUpdatePost).toHaveBeenCalledWith(id, patch);
    });
  });

  describe("archivePost", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call update archive method if arguments are correct", async () => {
      const id = "235";
      const patch = { deleted_at: "true" };

      await updatePost(id, patch);

      expect(mockUpdatePost).toHaveBeenCalledWith(id, patch);
    });
  });

  describe("unarchivePost", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call unarchive method if arguments are correct", async () => {
      const id = "235";
      const patch = { deleted_at: null };

      await updatePost(id, patch);

      expect(mockUpdatePost).toHaveBeenCalledWith(id, patch);
    });
  });

  describe("destroyPost", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call destroy method if arguments are correct", async () => {
      const id = "235";

      await destroyPost(id);

      expect(mockDestroyPost).toHaveBeenCalledWith(id);
    });
  });
});
