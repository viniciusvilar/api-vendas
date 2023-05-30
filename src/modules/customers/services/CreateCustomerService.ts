import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import { Customer } from "../typeorm/entities/Customer";
import { AppError } from "@shared/errors/AppError";

interface InterfaceRequest {
    name: string,
    email: string
}

export class CreateCustomerService {
    
    public async create({ name, email }: InterfaceRequest): Promise<Customer> {
        const customerRespository = getCustomRepository(CustomersRepository)
        const emailExists = await customerRespository.findByEmail(email)

        if (emailExists) {
            throw new AppError('Email address already used.')
        }

        const customer = await customerRespository.create({ name, email })

        await customerRespository.save(customer)
        return customer
    }

}