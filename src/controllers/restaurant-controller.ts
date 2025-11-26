import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "../services/restaurant-service";

export class RestaurantController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RestaurantService.create(req.body);
      res.status(201).json({ data: response });
    } catch (e) { next(e); }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.query.is_open !== undefined) {
        const isOpen = req.query.is_open === 'true';
        const response = await RestaurantService.listByStatus(isOpen);
        return res.status(200).json({ data: response });
      }
      
      const response = await RestaurantService.list();
      res.status(200).json({ data: response });
    } catch (e) { next(e); }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RestaurantService.get(Number(req.params.id));
      res.status(200).json({ data: response });
    } catch (e) { next(e); }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RestaurantService.update(Number(req.params.id), req.body);
      res.status(200).json({ data: response });
    } catch (e) { next(e); }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await RestaurantService.delete(Number(req.params.id));
      res.status(200).json({ data: response });
    } catch (e) { next(e); }
  }
}