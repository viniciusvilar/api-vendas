import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

export class ListCustomerService {

    public async list(): Promise<Customer[]> {
        const customerRespository = getCustomRepository(CustomersRepository)

        const customers = await customerRespository.find()

        return customers;

    }

}