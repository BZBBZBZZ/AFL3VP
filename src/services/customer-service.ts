import { prismaClient } from "../utils/database-util";
import { Validation } from "../validations/validation";
import { CustomerValidation } from "../validations/customer-validation";
import { CreateCustomerRequest, UpdateCustomerRequest, toCustomerResponse } from "../models/customer-model";
import { ResponseError } from "../error/response-error";

export class CustomerService {
  
  static async create(req: CreateCustomerRequest) {
    const data = Validation.validate(CustomerValidation.CREATE, req);
    const customer = await prismaClient.customer.create({
      data: data,
    });

    return toCustomerResponse(customer);
  }

  static async list() {
    const customers = await prismaClient.customer.findMany();
    return customers.map(toCustomerResponse);
  }

  static async get(id: number) {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!customer) {
      throw new ResponseError(404, "Customer not found");
    }

    return toCustomerResponse(customer);
  }

  static async update(id: number, req: UpdateCustomerRequest) {
    const data = Validation.validate(CustomerValidation.UPDATE, req);

    await this.get(id);

    const customer = await prismaClient.customer.update({
      where: {
        id: id,
      },
      data: data,
    });

    return toCustomerResponse(customer);
  }

  static async delete(id: number) {
    await this.get(id);

    await prismaClient.customer.delete({
      where: {
        id: id,
      },
    });

    return "Customer deleted successfully";
  }
}