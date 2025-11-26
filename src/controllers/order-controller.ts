import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order-service";

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.create(req.body);
      res.status(201).json({ data: response });
    } catch (e) { next(e); }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.query.customer_id ? Number(req.query.customer_id) : undefined;
      const restaurantId = req.query.restaurant_id ? Number(req.query.restaurant_id) : undefined;
      
      const response = await OrderService.list({ customerId, restaurantId });
      res.status(200).json({ data: response });
    } catch (e) { next(e); }
  }
}