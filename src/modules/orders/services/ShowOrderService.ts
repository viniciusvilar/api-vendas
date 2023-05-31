import { Order } from "../typeorm/entities/Order";
import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import { AppError } from "@shared/errors/AppError";

interface InterfaceRequest {
    id: string
}

export class ShowOrderService {
    public async execute({ id }: InterfaceRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository)

        const order = await ordersRepository.findById(id)
        
        if (!order) {
            throw new AppError("Order not found.")
        }

        return order
    }
}