import { Customer } from "@modules/customers/typeorm/entities/Customer";
import { Order } from "../typeorm/entities/Order";
import { getCustomRepository } from "typeorm";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import { CustomersRepository } from "@modules/customers/typeorm/repositories/CustomersRepository";
import { AppError } from "@shared/errors/AppError";

interface InterfaceProduct {
    id: string
    quantity: number
}

interface InterfaceRequest {
    customer_id: string
    products: InterfaceProduct[]
}

export class CreateOrderService {
    public async execute({ customer_id, products }: InterfaceRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository)
        const productsRepository = getCustomRepository(ProductRepository)
        const customerRepository = getCustomRepository(CustomersRepository)

        const customerExists = await customerRepository.findById(customer_id)

        if (!customerExists) {
            throw new AppError("Could not find any customer with the given id.")
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError("Could not find any products with the given ids.")
        }

        const existsProductsIds = existsProducts.map((product) => product.id)

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        )

        if (checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`)
        }

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity
        )

        if (quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`)
        }

        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        )

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts
        })

        const { order_products } = order

        const updatedProductQuantity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
            })
        )

        await productsRepository.save(updatedProductQuantity)

        return order
    }
}