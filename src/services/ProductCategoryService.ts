import type { IProductCategoryRepository } from '@repotypes/IProductCategoryRepository'
import type {
    CreateProductCategoryInput,
    UpdateProductCategoryInput
} from '../repositories/ProductCategoryRepository'
import type { IProductCategoryService } from '@servicetypes/IProductCategoryService'
import logger from '../utils/logger'

export class ProductCategoryService implements IProductCategoryService {
    private repository: IProductCategoryRepository

    constructor(repository: IProductCategoryRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('ProductCategoryService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        logger.debug(`ProductCategoryService.getById called with id: ${id}`)
        const category = await this.repository.findById(id)
        if (!category) {
            throw new Error(`Product category with ID ${id} not found`)
        }
        return category
    }

    async getByCode(code: string) {
        logger.debug(
            `ProductCategoryService.getByCode called with code: ${code}`
        )
        return this.repository.findByCode(code)
    }

    async create(input: CreateProductCategoryInput) {
        logger.debug('ProductCategoryService.create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateProductCategoryInput) {
        logger.debug(`ProductCategoryService.update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        logger.debug(`ProductCategoryService.delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
