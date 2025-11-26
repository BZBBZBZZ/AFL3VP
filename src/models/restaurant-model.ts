import { Restaurant } from "../generated/prisma";

export interface CreateRestaurantRequest {
  name: string;
  description: string;
  is_open?: boolean;
}

export interface UpdateRestaurantRequest {
  name?: string;
  description?: string;
  is_open?: boolean;
}

export function toRestaurantResponse(restaurant: Restaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    status: restaurant.is_open ? "Opened" : "Closed",
  };
}