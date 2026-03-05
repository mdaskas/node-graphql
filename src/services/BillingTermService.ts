import type { IBillingTermRepository } from '@/repositories/interfaces/IBillingTermRepository'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '../repositories/BillingTermRepository'
import type { IBillingTermDTO } from '../data/dto/BillingTermDTO'
import type { IBillingTermService } from '@/services/interfaces/IBillingTermService'
import { BaseService } from './BaseService'

export class BillingTermService
    extends BaseService
    implements IBillingTermService
{
    private repository: IBillingTermRepository

    constructor(repository: IBillingTermRepository) {
        super()
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number): Promise<IBillingTermDTO> {
        this.childLogger.debug(`getById called with id: ${id}`)
        const result = await this.repository.findById(id)
        if (!result) {
            throw new Error(`Billing term with id ${id} not found`)
        }
        return result
    }

    async getByCode(code: string): Promise<IBillingTermDTO> {
        this.childLogger.debug(`getByCode called with code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Billing term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateBillingTermInput) {
        this.childLogger.debug('create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateBillingTermInput) {
        this.childLogger.debug(`update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
