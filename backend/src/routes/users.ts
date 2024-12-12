import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";
import { validateQuery } from "../validate.middleware";
import { PaginateUserSchema } from "../dto/user";
import { HTTP_STATUS } from "./posts";

const router = Router();

const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const { pageNumber = "0", pageSize = "4" } = req.query as {
      pageNumber?: string;
      pageSize?: string;
    };

    const page = Number(pageNumber);
    const size = Number(pageSize);

    const users = await getUsers(page, size);
    res.status(HTTP_STATUS.OK).send({
      data: users,
      pagination: { page, size },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to fetch users", error: errorMessage });
  }
};

const handleGetUsersCount = async (req: Request, res: Response) => {
  try {
    const count = await getUsersCount();
    res.status(HTTP_STATUS.OK).send({ data: { count } });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send({ message: "Failed to fetch user count", error: errorMessage });
  }
};

router.get("/", validateQuery(PaginateUserSchema), handleGetUsers);
router.get("/count", handleGetUsersCount);

export default router;
