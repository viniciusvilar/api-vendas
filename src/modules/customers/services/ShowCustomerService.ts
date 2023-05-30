import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import { AppError } from "@shared/errors/AppError";

interface InterfaceRequest {
    id: string;
}

export class ShowCustomerService {
    public async show({ id }: InterfaceRequest): Promise<Customer> {
        const customerRespository = getCustomRepository(CustomersRepository)
        const customer = await customerRespository.findById(id)

        if (!customer) {
            throw new AppError('User not found.')
        }

        return customer;
    }
}