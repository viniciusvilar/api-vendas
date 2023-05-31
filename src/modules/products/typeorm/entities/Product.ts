import { OrdersProducts } from '@modules/orders/typeorm/entities/OrdersProducts';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products: OrdersProducts[]

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}