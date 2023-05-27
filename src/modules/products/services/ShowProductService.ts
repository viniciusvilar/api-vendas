import { getCustomRepository } from 'typeorm'
import { Product } from "../typeorm/entities/Product";
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';

export class ShowProductService {
    public async execute(id: string): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository)
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError("Product not found!", 404)
        }
        

        return product;
    }
}