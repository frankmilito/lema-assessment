import { z } from "zod";

export const CreatePostSchema = z.object({
    user_id: z.string(),
    title: z.string(),
    body: z.string(),
});

export const RemovePostSchema = z.object({
    userId: z.string(),
    postId: z.string(),
});

export const GetPostSchema = z.object({
    userId: z.string(),
});
