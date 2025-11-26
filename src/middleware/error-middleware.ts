import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error.issues.map((err) => ({
        path: err.path.join("."), 
        message: err.message,   
      })),
      message: "Validation Error",
    });
  } 
  else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } 
  else {
    res.status(500).json({
      errors: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
};