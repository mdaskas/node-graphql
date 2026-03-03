import EntityNotFoundError from '../errors/EntityNotFoundError'
import logger from '../utils/logger'
import { BaseRepository } from '@repo/BaseRespository'
import type { ICustomerRepository } from '@repotypes/ICustomerRepository'

const customerInclude = {
    billingTerms: true,
    shippingTerms: true,
    billToAddress: true,
    shipToAddresses: true
}

export interface Customer {
    code: string
    name: string
    email: string
    phone?: string
    billingTermsCode?: string
    shippingTermsCode?: string
    billToAddressId?: number
    shipToAddressIds?: number[]
    createdAt: Date
    updatedAt: Date
}

export type CreateCustomerInput = Omit<Customer, 'createdAt' | 'updatedAt'>

export type UpdateCustomerInput = Partial<CreateCustomerInput>

export class CustomerRepository
    extends BaseRepository
    implements ICustomerRepository
{
    async findAll(limit = this.defaultLimit, offset = this.defaultOffset) {
        return this.client.customer.findMany({
            skip: offset,
            take: limit,
            include: customerInclude
        })
    }

    async findById(id: number) {
        const customer = await this.client.customer.findUnique({
            where: { id },
            include: customerInclude
        })

        if (!customer)
            throw new EntityNotFoundError({
                message: `Customer with ID ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        logger.debug(`Fetched customer by ID ${id}`)
        logger
            .child({ LogMetadata: `CustomerRepository.findById` })
            .debug('Customer data')

        return customer
    }

    async findByCode(code: string) {
        return this.client.customer.findUnique({
            where: { code },
            include: customerInclude
        })
    }

    async findByEmail(email: string) {
        return this.client.customer.findUnique({
            where: { email },
            include: customerInclude
        })
    }

    async create(input: CreateCustomerInput) {
        const { shipToAddressIds, ...rest } = input
        return this.client.customer.create({
            data: {
                ...rest,
                ...(shipToAddressIds && {
                    shipToAddresses: {
                        connect: shipToAddressIds.map((id) => ({ id }))
                    }
                })
            },
            include: customerInclude
        })
    }

    async update(id: number, input: UpdateCustomerInput) {
        const { shipToAddressIds, ...rest } = input
        return this.client.customer.update({
            where: { id },
            data: {
                ...rest,
                ...(shipToAddressIds && {
                    shipToAddresses: {
                        set: shipToAddressIds.map((id) => ({ id }))
                    }
                })
            },
            include: customerInclude
        })
    }

    async delete(id: number) {
        const customer = await this.findById(id)
        if (!customer) return null
        return this.client.customer.delete({
            where: { id },
            include: customerInclude
        })
    }
}
