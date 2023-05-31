import { getCustomRepository } from "typeorm";
import { Customer } from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";
import { paginate } from "typeorm-pagination/dist/helpers/pagination";
import { number } from "joi";

interface InterfacePaginateCustomer {
    from: number
    to: number
    per_page: number
    total: number
    current_page: number
    prev_page: number | null
    next_page: number | null
    data: Customer[]
}

export class ListCustomerService {

    public async list(): Promise<InterfacePaginateCustomer> {
        const customerRespository = getCustomRepository(CustomersRepository)

        const customers = await customerRespository.createQueryBuilder().paginate()

        return customers as InterfacePaginateCustomer;

    }

}