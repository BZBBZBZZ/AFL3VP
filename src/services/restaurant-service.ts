import { prismaClient } from "../utils/database-util";
import { Validation } from "../validations/validation";
import { RestaurantValidation } from "../validations/restaurant-validation";
import { CreateRestaurantRequest, UpdateRestaurantRequest, toRestaurantResponse } from "../models/restaurant-model";
import { ResponseError } from "../error/response-error";

export class RestaurantService {
  static async create(req: CreateRestaurantRequest) {
    const data = Validation.validate(RestaurantValidation.CREATE, req);
    const restaurant = await prismaClient.restaurant.create({ data });
    return toRestaurantResponse(restaurant);
  }

  static async list() {
    const restaurants = await prismaClient.restaurant.findMany();
    return restaurants.map(toRestaurantResponse);
  }

  static async listByStatus(isOpen: boolean) {
    const restaurants = await prismaClient.restaurant.findMany({
      where: { is_open: isOpen }
    });
    return restaurants.map(toRestaurantResponse);
  }

  static async get(id: number) {
    const restaurant = await prismaClient.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new ResponseError(404, "Restaurant not found");
    return toRestaurantResponse(restaurant);
  }

  static async update(id: number, req: UpdateRestaurantRequest) {
    const data = Validation.validate(RestaurantValidation.UPDATE, req);
    await this.get(id); 
    const restaurant = await prismaClient.restaurant.update({
      where: { id },
      data,
    });
    return toRestaurantResponse(restaurant);
  }

  static async delete(id: number) {
    await this.get(id);
    await prismaClient.restaurant.delete({ where: { id } });
    return "Restaurant deleted successfully";
  }
}