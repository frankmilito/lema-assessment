import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";
import { validateQuery } from "../validate.middleware";
import { PaginateUserSchema } from "../dto/user";

const router = Router();

router.get("/", validateQuery(PaginateUserSchema), async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;

  try {
    const users = await getUsers(pageNumber, pageSize);
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

export default router;
