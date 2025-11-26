import z, { ZodType } from "zod";

export class OrderValidation {
  static readonly CREATE: ZodType = z.object({
    customer_id: z.number().positive(),
    restaurant_id: z.number().positive(),
    total_items: z.number().positive("Amount of items must be greater than 0"),
  });
}