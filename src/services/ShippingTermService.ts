import type { IShippingTermRepository } from '@repotypes/IShippingTermRepository'
import type {
    CreateShippingTermInput,
    UpdateShippingTermInput
} from '@repo/ShippingTermRepository'
import type { IShippingTermDTO } from '../data/dto/ShippingTermDTO'
import type { IShippingTermService } from '@servicetypes/IShippingTermService'
import logger from '../utils/logger'

export class ShippingTermService implements IShippingTermService {
    private repository: IShippingTermRepository
    private readonly childLogger

    constructor(repository: IShippingTermRepository) {
        this.repository = repository
        this.childLogger = logger.child({
            defaultMeta: { service: `ShippingTermService` }
        })
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('ShippingTermService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number): Promise<IShippingTermDTO> {
        this.childLogger.debug(`ShippingTermService.getById: id: ${id}`)
        const result = await this.repository.findById(id)
        if (!result) {
            throw new Error(`Shipping term with id ${id} not found`)
        }
        return result
    }

    async getByCode(code: string): Promise<IShippingTermDTO> {
        this.childLogger.debug(`ShippingTermService.getByCode: code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Shipping term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateShippingTermInput) {
        this.childLogger.debug(
            `ShippingTermService.create: ${JSON.stringify(input)}`
        )
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateShippingTermInput) {
        this.childLogger.debug(
            `ShippingTermService.update: id: ${id}, input: ${JSON.stringify(input)}`
        )
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`ShippingTermService.delete: id: ${id}`)
        return this.repository.delete(id)
    }
}
