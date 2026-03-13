import EntityNotFoundError from '../errors/EntityNotFoundError'
import { BaseRepository } from '@/repositories/BaseRepository'
import type { ICustomerRepository } from '@repotypes/ICustomerRepository'
import type { IEntityBase } from './interfaces/IEntityBase'

const customerInclude = {
    billingTerm: true,
    shippingTerm: true,
    billToAddress: true,
    shipToAddresses: true
} as const

export interface Customer extends IEntityBase {
    code: string
    name: string
    email: string
    phone: string
    billingTermId: number
    shippingTermId: number
    billToAddressId?: number
    shipToAddressIds?: number[]
}

export type CreateCustomerInput = Omit<
    Customer,
    'id' | 'createdAt' | 'updatedAt'
>

export type UpdateCustomerInput = Partial<CreateCustomerInput>

export class CustomerRepository
    extends BaseRepository
    implements ICustomerRepository
{
    async findAll(limit = this.defaultLimit, offset = this.defaultOffset) {
        const customers = await this.client.customer.findMany({
            skip: offset,
            take: limit,
            include: customerInclude
        })

        this.childLogger.debug('findAll: Fetched customers')

        return customers
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

        this.childLogger.debug(`findById: ID ${id}, Code: ${customer.code}`)

        return customer
    }

    async findByCode(code: string) {
        const customer = await this.client.customer.findUnique({
            where: { code },
            include: customerInclude
        })

        if (!customer)
            throw new EntityNotFoundError({
                message: `Customer with CODE ${code} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findByCode: Code ${code}`)

        return customer
    }

    async findByEmail(email: string) {
        const customer = await this.client.customer.findUnique({
            where: { email },
            include: customerInclude
        })

        if (!customer)
            throw new EntityNotFoundError({
                message: `Customer with EMAIL ${email} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findByEmail: Email ${email}`)

        return customer
    }

    async create(input: CreateCustomerInput) {
        const { shipToAddressIds, ...rest } = input
        const customer = await this.client.customer.create({
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

        this.childLogger.debug(
            `create: Code ${input.code}, Email: ${input.email}`
        )

        return customer
    }

    async update(id: number, input: UpdateCustomerInput) {
        const { shipToAddressIds, ...rest } = input
        const customer = await this.client.customer.update({
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

        this.childLogger.debug(`update: ID ${id}, Code: ${customer.code}`)

        return customer
    }

    async delete(id: number) {
        const customer = await this.findById(id)
        if (!customer) return null
        await this.client.customer.delete({
            where: { id },
            include: customerInclude
        })

        this.childLogger.debug(`delete: ID ${id}, Code: ${customer.code}`)

        return customer
    }
}
