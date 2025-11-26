import { Customer } from "../generated/prisma";

export interface CreateCustomerRequest {
  name: string;
  phone: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  phone?: string;
}

export function toCustomerResponse(customer: Customer) {
  return {
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
  };
}