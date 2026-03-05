import EntityNotFoundError from '../errors/EntityNotFoundError'
import { BaseRepository } from '@/repositories/BaseRepository'
import type { IProductRepository } from '@repotypes/IProductRepository'
import type { IEntityBase } from './interfaces/IEntityBase'

const productInclude = {
    category: true
}

export interface Product extends IEntityBase {
    code: string
    description: string
    price: number
    categoryId: number
    stock: number
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateProductInput = Partial<CreateProductInput>

export class ProductRepository
    extends BaseRepository
    implements IProductRepository
{
    async findAll(limit = this.defaultLimit, offset = this.defaultOffset) {
        return this.client.product.findMany({
            skip: offset,
            take: limit,
            include: productInclude
        })
    }

    async findById(id: number) {
        const product = await this.client.product.findUnique({
            where: { id },
            include: productInclude
        })

        if (!product)
            throw new EntityNotFoundError({
                message: `Product with ID ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findById: ID ${id}`)

        return product
    }

    async findByCode(code: string) {
        return this.client.product.findUnique({
            where: { code },
            include: productInclude
        })
    }

    async create(input: CreateProductInput) {
        return this.client.product.create({
            data: input,
            include: productInclude
        })
    }

    async update(id: number, input: UpdateProductInput) {
        return this.client.product.update({
            where: { id },
            data: input,
            include: productInclude
        })
    }

    async delete(id: number) {
        const product = await this.findById(id)
        if (!product) return null
        return this.client.product.delete({
            where: { id },
            include: productInclude
        })
    }
}
