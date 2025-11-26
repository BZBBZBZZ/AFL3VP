import z, { ZodType } from "zod";

export class CustomerValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
  });
}