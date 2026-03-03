import type { IBillingTermsRepository } from '../repositories/interfaces/IBillingTermsRepository'
import type {
    CreateBillingTermsInput,
    UpdateBillingTermsInput
} from '../repositories/BillingTermsRepository'
import type { IBillingTermsDTO } from '../data/dto/BiillingTermsDTO'
import type { IBillingTermsService } from './interfaces/IBillingTermsService'
import logger from '../utils/logger'

export class BillingTermsService implements IBillingTermsService {
    private repository: IBillingTermsRepository

    constructor(repository: IBillingTermsRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('BillingTermsService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getByCode(code: string): Promise<IBillingTermsDTO> {
        logger.debug(`BillingTermsService.getByCode called with code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Billing term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateBillingTermsInput) {
        logger.debug('BillingTermsService.create called')
        return this.repository.create(input)
    }

    async update(code: string, input: UpdateBillingTermsInput) {
        logger.debug(`BillingTermsService.update called with code: ${code}`)
        return this.repository.update(code, input)
    }

    async delete(code: string) {
        logger.debug(`BillingTermsService.delete called with code: ${code}`)
        return this.repository.delete(code)
    }
}
