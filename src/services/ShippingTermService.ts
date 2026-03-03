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

    constructor(repository: IShippingTermRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('ShippingTermService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getByCode(code: string): Promise<IShippingTermDTO> {
        logger.debug(`ShippingTermService.getByCode called with code: ${code}`)
        const result = await this.repository.findByCode(code)
        if (!result) {
            throw new Error(`Shipping term with code ${code} not found`)
        }
        return result
    }

    async create(input: CreateShippingTermInput) {
        logger.debug('ShippingTermService.create called')
        return this.repository.create(input)
    }

    async update(code: string, input: UpdateShippingTermInput) {
        logger.debug(`ShippingTermService.update called with code: ${code}`)
        return this.repository.update(code, input)
    }

    async delete(code: string) {
        logger.debug(`ShippingTermService.delete called with code: ${code}`)
        return this.repository.delete(code)
    }
}
