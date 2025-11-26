import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer-service";

export class CustomerController {
  
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CustomerService.create(req.body);
      res.status(201).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CustomerService.list();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = Number(req.params.id);
      const response = await CustomerService.get(customerId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = Number(req.params.id);
      const response = await CustomerService.update(customerId, req.body);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = Number(req.params.id);
      const response = await CustomerService.delete(customerId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}