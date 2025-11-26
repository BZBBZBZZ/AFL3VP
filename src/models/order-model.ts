import { Order, Customer, Restaurant } from "../generated/prisma";

export interface CreateOrderRequest {
  customer_id: number;
  restaurant_id: number;
  total_items: number;
}

type OrderWithRelations = Order & { customer: Customer; restaurant: Restaurant };

export function toOrderResponse(order: OrderWithRelations) {
  return {
    id: order.id,
    customer_name: order.customer.name,
    restaurant_name: order.restaurant.name,
    total_items: order.total_items,
    ordered_at: order.created_at,
    estimated_arrival: `${order.eta_minutes} minutes`,
  };
}