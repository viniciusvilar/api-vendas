import { EntityRepository, In, Repository, getRepository } from 'typeorm'
import { Product } from '../entities/Product'

interface InterfaceFindProducts {
    id: string
}


@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findAllByIds(products: InterfaceFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id)
        const existsProducts = await this.find({
            where: {
                id: In(productsIds)
            }
        })

        return existsProducts;
    }
}