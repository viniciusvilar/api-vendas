import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache'

export class DeleteProductService {
    public async execute( id: string ): Promise <void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id)

        if (!product) {
            throw new AppError("Product not found!", 404)
        }

        const redisCache = new RedisCache()

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        await productsRepository.remove(product);
    }
}