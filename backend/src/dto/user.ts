import { z } from "zod";

export const PaginateUserSchema = z.object({
    pageNumber: z.string({ required_error: "pageNumber is required" }).min(0, { message: "Invalid page number"}),
    pageSize: z.string().min(1, { message: "Invalid page size"}),
});
