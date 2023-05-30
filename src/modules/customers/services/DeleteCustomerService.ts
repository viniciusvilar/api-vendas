import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import { AppError } from "@shared/errors/AppError";

interface InterfaceRequest {
    id: string
}

export class DeleteCustomerService {
    public async delete({ id }: InterfaceRequest): Promise<void> {
        const customerRepository = getCustomRepository(CustomersRepository)

        const customer = await customerRepository.findById(id)

        if (!customer) {
            throw new AppError("User not found.")
        }

        await customerRepository.remove(customer)
    }
}