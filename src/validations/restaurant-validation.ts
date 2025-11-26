import z, { ZodType } from "zod";

export class RestaurantValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    is_open: z.boolean().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    is_open: z.boolean().optional(),
  });
}