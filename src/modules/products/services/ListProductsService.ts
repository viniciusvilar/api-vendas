import { getCustomRepository } from 'typeorm'
import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

export class ListProductsSerice {
    public async execute(): Promise<Product[]> {
        const productsRepository = await getCustomRepository(ProductRepository);
        const products = await productsRepository.find()
        return products
    }
}