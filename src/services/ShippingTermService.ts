import type { IShippingTermRepository } from '@repotypes/IShippingTermRepository'
import type {
    CreateShippingTermInput,
    UpdateShippingTermInput
} from '@repo/ShippingTermRepository'
import type { IShippingTermDTO } from '../data/dto/ShippingTermDTO'
import type { IShippingTermService } from '@servicetypes/IShippingTermService'
import { BaseService } from './BaseService'

export class ShippingTermService
    extends BaseService
    implements IShippingTermService
{
    private repository: IShippingTermRepository

    constructor(repository: IShippingTermRepository) {
        super()
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number): Promise<IShippingTermDTO> {
        this.childLogger.debug(`getById: id: ${id}`)
        const result = await this.repository.findById(id)
        if (!result) {
            throw new Error(`Shipping term with id ${id} not found`)
        }
        return result
    }

    async getByCode(code: string): Promise<IShippingTermDTO> {
        this.childLogger.debug(`getByCode: code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Shipping term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateShippingTermInput) {
        this.childLogger.debug(`create: ${JSON.stringify(input)}`)
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateShippingTermInput) {
        this.childLogger.debug(
            `update: id: ${id}, input: ${JSON.stringify(input)}`
        )
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`delete: id: ${id}`)
        return this.repository.delete(id)
    }
}
