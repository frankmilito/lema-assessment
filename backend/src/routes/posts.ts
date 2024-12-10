import { Router, Request, Response } from "express";
import { addPost, deletePost, getPosts } from "../db/posts/posts";
import {
  CreatePostSchema,
  GetPostSchema,
  RemovePostSchema,
} from "../dto/posts";
import { validateBody, validateQuery } from "../validate.middleware";

const router = Router();

router.get(
  "/",
  validateQuery(GetPostSchema),
  async (req: Request, res: Response) => {
    const { userId } = req.query;

    const posts = await getPosts(userId as string);
    res.send(posts);
  }
);

router.post(
  "/",
  validateBody(CreatePostSchema),
  async (req: Request, res: Response) => {
    const payload = req.body;

    await addPost(payload);

    res.status(201).send({ message: "Post added successfully" });
  }
);

router.delete(
  "/",
  validateQuery(RemovePostSchema),
  async (req: Request, res: Response) => {
    const { userId, postId } = req.query;

    await deletePost(postId as string, userId as string);
    res.status(204).send();
  }
);

export default router;
