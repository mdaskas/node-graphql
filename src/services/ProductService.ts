import type { IProductRepository } from '@repotypes/IProductRepository'
import type {
    CreateProductInput,
    UpdateProductInput
} from '../repositories/ProductRepository'
import type { IProductService } from '@servicetypes/IProductService'
import { BaseService } from './BaseService'

export class ProductService extends BaseService implements IProductService {
    private repository: IProductRepository

    constructor(repository: IProductRepository) {
        super()
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        this.childLogger.debug(`getById called with id: ${id}`)
        const product = await this.repository.findById(id)
        if (!product) {
            throw new Error(`Product with ID ${id} not found`)
        }
        return product
    }

    async getByCode(code: string) {
        this.childLogger.debug(`getByCode called with code: ${code}`)
        return this.repository.findByCode(code)
    }

    async create(input: CreateProductInput) {
        this.childLogger.debug('create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateProductInput) {
        this.childLogger.debug(`update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
