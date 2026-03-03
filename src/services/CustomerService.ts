import type { ICustomerRepository } from '@repotypes/ICustomerRepository'
import type {
    CreateCustomerInput,
    UpdateCustomerInput
} from '../repositories/CustomerRepository'
import type { ICustomerService } from '@servicetypes/ICustomerService'
import logger from '../utils/logger'

export class CustomerService implements ICustomerService {
    private repository: ICustomerRepository

    constructor(repository: ICustomerRepository) {
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        logger.debug('CustomerService.getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        logger.debug(`CustomerService.getById called with id: ${id}`)
        const customer = await this.repository.findById(id)
        if (!customer) {
            throw new Error(`Customer with ID ${id} not found`)
        }
        return customer
    }

    async getByCode(code: string) {
        logger.debug(`CustomerService.getByCode called with code: ${code}`)
        return this.repository.findByCode(code)
    }

    async getByEmail(email: string) {
        logger.debug(`CustomerService.getByEmail called with email: ${email}`)
        return this.repository.findByEmail(email)
    }

    async create(input: CreateCustomerInput) {
        logger.debug('CustomerService.create called')
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateCustomerInput) {
        logger.debug(`CustomerService.update called with id: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        logger.debug(`CustomerService.delete called with id: ${id}`)
        return this.repository.delete(id)
    }
}
