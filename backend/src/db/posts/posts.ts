import { connection } from "../connection";
import {
  addPostTemplate,
  removePostTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";
import { randomUUID } from "crypto";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const addPost = (payload: Omit<Post, "id">): Promise<Post> => {
  const id = randomUUID();
  // const created_at = new Date();

  const { user_id, title, body } = payload;
  return new Promise((resolve, reject) => {
    connection.run(
      addPostTemplate,
      [id, user_id, title, body],
      function (error) {
        if (error) {
          reject(error);
          return;
        }

        const insertedPost: Post = { id: this.lastID, ...payload } as Post;
        resolve(insertedPost);
      }
    );
  });
};

export const deletePost = (postId: string, userId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.run(removePostTemplate, [postId, userId], (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};
