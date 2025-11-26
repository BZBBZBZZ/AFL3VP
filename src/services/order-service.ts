import { prismaClient } from "../utils/database-util";
import { Validation } from "../validations/validation";
import { OrderValidation } from "../validations/order-validation";
import { CreateOrderRequest, toOrderResponse } from "../models/order-model";
import { ResponseError } from "../error/response-error";

export class OrderService {
  static async create(req: CreateOrderRequest) {
    const data = Validation.validate(OrderValidation.CREATE, req);

    const customer = await prismaClient.customer.findUnique({ where: { id: data.customer_id }});
    if(!customer) throw new ResponseError(404, "Customer not found");

    const restaurant = await prismaClient.restaurant.findUnique({ where: { id: data.restaurant_id }});
    if(!restaurant) throw new ResponseError(404, "Restaurant not found");

    const eta = (data.total_items * 10) + 10;

    const order = await prismaClient.order.create({
      data: {
        customer_id: data.customer_id,
        restaurant_id: data.restaurant_id,
        total_items: data.total_items,
        eta_minutes: eta
      },
      include: {
        customer: true,
        restaurant: true
      }
    });

    return toOrderResponse(order);
  }

  static async list(query: { customerId?: number, restaurantId?: number }) {
    const whereClause: any = {};

    if (query.customerId) whereClause.customer_id = query.customerId;
    if (query.restaurantId) whereClause.restaurant_id = query.restaurantId;

    const orders = await prismaClient.order.findMany({
      where: whereClause,
      include: {
        customer: true,
        restaurant: true
      },
      orderBy: {
        created_at: 'desc' 
      }
    });

    return orders.map(toOrderResponse);
  }
}