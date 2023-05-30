import { getCustomRepository } from "typeorm";
import { AppError } from "@shared/errors/AppError";
import { Customer } from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface InterfaceRequest {
    id: string
    name: string
    email: string
}

export class UpdateCustomerService {
    public async execute({ id, name, email }: InterfaceRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);
        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('customer not found.')
        }

        const customerExists = await customerRepository.findByEmail(email)

        if (customerExists && email !== customer.email) {
            throw new AppError("This is already one customer with this email")
        }

        customer.name = name;
        customer.email = email

        await customerRepository.save(customer);

        return customer;
    }
}