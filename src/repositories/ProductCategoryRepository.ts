import EntityNotFoundError from '../errors/EntityNotFoundError'
import { BaseRepository } from '@/repositories/BaseRepository'
import type { IProductCategoryRepository } from '@repotypes/IProductCategoryRepository'

export interface ProductCategory {
    code: string
    description: string
    createdAt?: Date
    updatedAt?: Date
}

export type CreateProductCategoryInput = Omit<
    ProductCategory,
    'createdAt' | 'updatedAt'
>

export type UpdateProductCategoryInput = Partial<CreateProductCategoryInput>

export class ProductCategoryRepository
    extends BaseRepository
    implements IProductCategoryRepository
{
    async findAll(limit = this.defaultLimit, offset = this.defaultOffset) {
        return this.client.productCategory.findMany({
            skip: offset,
            take: limit
        })
    }

    async findById(id: number) {
        const category = await this.client.productCategory.findUnique({
            where: { id }
        })

        if (!category)
            throw new EntityNotFoundError({
                message: `Product category with ID ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findById: ID ${id}`)

        return category
    }

    async findByCode(code: string) {
        return this.client.productCategory.findUnique({
            where: { code }
        })
    }

    async create(input: CreateProductCategoryInput) {
        return this.client.productCategory.create({
            data: input
        })
    }

    async update(id: number, input: UpdateProductCategoryInput) {
        return this.client.productCategory.update({
            where: { id },
            data: input
        })
    }

    async delete(id: number) {
        const category = await this.findById(id)
        if (!category) return null
        return this.client.productCategory.delete({
            where: { id }
        })
    }
}
