import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';

export class DeleteProductService {
    public async execute( id: string ): Promise <void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id)

        if (!product) {
            throw new AppError("Product not found!", 404)
        }

        await productsRepository.remove(product);
    }
}