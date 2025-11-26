import { PrismaClient } from "../generated/prisma"; 

export const prismaClient = new PrismaClient({
  log: ["error", "warn", "info", "query"], 
});