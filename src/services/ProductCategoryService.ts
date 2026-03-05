import type { IProductCategoryRepository } from '@repotypes/IProductCategoryRepository'
import type {
    CreateProductCategoryInput,
    UpdateProductCategoryInput
} from '../repositories/ProductCategoryRepository'
import type { IProductCategoryService } from '@servicetypes/IProductCategoryService'
import { BaseService } from './BaseService'

export class ProductCategoryService
    extends BaseService
    implements IProductCategoryService
{
    private repository: IProductCategoryRepository

    constructor(repository: IProductCategoryRepository) {
        super()
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        this.childLogger.debug(`getById called with id: ${id}`)
        const category = await this.repository.findById(id)
        if (!category) {
            throw new Error(`Product category with ID ${id} not found`)
        }
        return category
    }

    async getByCode(code: string) {
        this.childLogger.debug(`getByCode called with code: ${code}`)
        return this.repository.findByCode(code)
    }

    async create(input: CreateProductCategoryInput) {
        this.childLogger.debug('create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateProductCategoryInput) {
        this.childLogger.debug(`update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
