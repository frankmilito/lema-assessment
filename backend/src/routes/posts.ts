import { Router, Request, Response } from "express";
import { addPost, deletePost, getPosts } from "../db/posts/posts";
import {
  CreatePostSchema,
  GetPostSchema,
  RemovePostSchema,
} from "../dto/posts";
import { validateBody, validateQuery } from "../validate.middleware";

const router = Router();

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const handleGetPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId: string };
    const posts = await getPosts(userId);
    res.status(HTTP_STATUS.OK).send(posts);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to retrieve posts", error: errorMessage });
  }
};

const handleAddPost = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    await addPost(payload);
    res
      .status(HTTP_STATUS.CREATED)
      .send({ message: "Post added successfully", data: payload });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Failed to add post", error: errorMessage });
  }
};

const handleDeletePost = async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.query as { userId: string; postId: string };
    await deletePost(postId, userId);
    res.status(HTTP_STATUS.NO_CONTENT).send();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send({ message: "Failed to delete post", error: errorMessage });
  }
};

router.get("/", validateQuery(GetPostSchema), handleGetPosts);
router.post("/", validateBody(CreatePostSchema), handleAddPost);
router.delete("/", validateQuery(RemovePostSchema), handleDeletePost);

export default router;
