import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import client from "./axiosInstance";
import { NewPostPayload, Post, User } from "../types";
import toast from "react-hot-toast";

export const useGetUsers = (pageNumber: number, pageSize: number) => {
  const getUsers = async () => {
    const response = await client.get<User[]>(
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: ["users", pageNumber, pageSize],
    queryFn: getUsers,
    placeholderData: keepPreviousData,
  });

  return query;
};

export const useGetUserCount = () => {
  const getUsers = async () => {
    const response = await client.get<{ data: number }>(`/users/count`);
    return response.data.data;
  };

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return query;
};
export const useGetUserPosts = (userId: string) => {
  const getPosts = async () => {
    const response = await client.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  };
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 0,
  });

  return query;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const createPost = async (payload: NewPostPayload) => {
    const response = await client.post("/posts", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post Created");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.error("Failed to create the post:", error);
    },
  });
};

export const useDeletePost = (userId: string) => {
  const queryClient = useQueryClient();
  const deletePost = async (postId: string) => {
    const response = await client.delete(
      `/posts?userId=${userId}&postId=${postId}`
    );
    return response.data;
  };

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post Deleted");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to Delete Post");
    },
  });
};
