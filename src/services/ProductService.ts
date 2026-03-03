import type { IProductRepository } from '@repotypes/IProductRepository'
import type {
    CreateProductInput,
    UpdateProductInput
} from '../repositories/ProductRepository'
import type { IProductService } from '@servicetypes/IProductService'
import logger from '../utils/logger'

export class ProductService implements IProductService {
    private repository: IProductRepository

    constructor(repository: IProductRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('ProductService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        logger.debug(`ProductService.getById called with id: ${id}`)
        const product = await this.repository.findById(id)
        if (!product) {
            throw new Error(`Product with ID ${id} not found`)
        }
        return product
    }

    async getByCode(code: string) {
        logger.debug(`ProductService.getByCode called with code: ${code}`)
        return this.repository.findByCode(code)
    }

    async create(input: CreateProductInput) {
        logger.debug('ProductService.create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateProductInput) {
        logger.debug(`ProductService.update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        logger.debug(`ProductService.delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
