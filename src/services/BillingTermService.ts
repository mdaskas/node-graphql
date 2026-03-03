import type { IBillingTermRepository } from '@/repositories/interfaces/IBillingTermRepository'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '../repositories/BillingTermRepository'
import type { IBillingTermDTO } from '../data/dto/BillingTermDTO'
import type { IBillingTermService } from '@/services/interfaces/IBillingTermService'
import logger from '../utils/logger'

export class BillingTermService implements IBillingTermService {
    private repository: IBillingTermRepository

    constructor(repository: IBillingTermRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('BillingTermService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getByCode(code: string): Promise<IBillingTermDTO> {
        logger.debug(`BillingTermService.getByCode called with code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Billing term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateBillingTermInput) {
        logger.debug('BillingTermService.create called')
        return this.repository.create(input)
    }

    async update(code: string, input: UpdateBillingTermInput) {
        logger.debug(`BillingTermService.update called with code: ${code}`)
        return this.repository.update(code, input)
    }

    async delete(code: string) {
        logger.debug(`BillingTermService.delete called with code: ${code}`)
        return this.repository.delete(code)
    }
}
