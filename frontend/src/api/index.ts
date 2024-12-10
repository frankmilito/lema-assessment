import { useQuery } from "@tanstack/react-query";
import client from "./axiosInstance";
import { Todo } from "../types";

export const useGetPlaceholder = () => {
  const getUsers = async () => {
    const response = await client.get<Todo[]>(
      "/users?pageNumber=1&pageSize=90"
    );
    return response.data;
  };

  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return query;
};
