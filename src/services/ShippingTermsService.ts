import type { IShippingTermsRepository } from '../repositories/interfaces/IShippingTermsRepository'
import type {
    CreateShippingTermsInput,
    UpdateShippingTermsInput
} from '../repositories/ShippingTermsRepository'
import type { IShippingTermsDTO } from '../data/dto/ShippingTermsDTO'
import type { IShippingTermsService } from './interfaces/IShippingTermsService'
import logger from '../utils/logger'

export class ShippingTermsService implements IShippingTermsService {
    private repository: IShippingTermsRepository

    constructor(repository: IShippingTermsRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('ShippingTermsService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getByCode(code: string): Promise<IShippingTermsDTO> {
        logger.debug(`ShippingTermsService.getByCode called with code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Shipping term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateShippingTermsInput) {
        logger.debug('ShippingTermsService.create called')
        return this.repository.create(input)
    }

    async update(code: string, input: UpdateShippingTermsInput) {
        logger.debug(`ShippingTermsService.update called with code: ${code}`)
        return this.repository.update(code, input)
    }

    async delete(code: string) {
        logger.debug(`ShippingTermsService.delete called with code: ${code}`)
        return this.repository.delete(code)
    }
}
