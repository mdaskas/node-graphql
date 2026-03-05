import type { ICustomerRepository } from '@repotypes/ICustomerRepository'
import type {
    CreateCustomerInput,
    UpdateCustomerInput
} from '../repositories/CustomerRepository'
import type { ICustomerService } from '@servicetypes/ICustomerService'
import { BaseService } from './BaseService'

export class CustomerService extends BaseService implements ICustomerService {
    private repository: ICustomerRepository

    constructor(repository: ICustomerRepository) {
        super()
        this.repository = repository
    }

    async getAll(limit?: number, offset?: number) {
        this.childLogger.debug('getAll called')
        return this.repository.findAll(limit, offset)
    }

    async getById(id: number) {
        this.childLogger.debug(`getById called with id: ${id}`)
        const customer = await this.repository.findById(id)
        if (!customer) {
            throw new Error(`Customer with ID ${id} not found`)
        }
        return customer
    }

    async getByCode(code: string) {
        this.childLogger.debug(`getByCode: CODE: ${code}`)
        return this.repository.findByCode(code)
    }

    async getByEmail(email: string) {
        this.childLogger.debug(`getByEmail: EMAIL: ${email}`)
        return this.repository.findByEmail(email)
    }

    async create(input: CreateCustomerInput) {
        this.childLogger.debug(`create: ${JSON.stringify(input)}`)
        return this.repository.create(input)
    }

    async update(id: number, input: UpdateCustomerInput) {
        this.childLogger.debug(`update: ID: ${id}`)
        return this.repository.update(id, input)
    }

    async delete(id: number) {
        this.childLogger.debug(`delete: ID: ${id}`)
        return this.repository.delete(id)
    }
}
