import { BaseRepository } from './BaseRespository'
import type { ICustomerRepository } from './ICustomerRepository'

const customerInclude = {
  billingTerms: true,
  shippingTerms: true,
  billToAddress: true,
  shipToAddresses: true
}

export interface CreateCustomerInput {
  code: string
  name: string
  email: string
  phone?: string
  billingTermsId?: number
  shippingTermsId?: number
  billToAddressId?: number
  shipToAddressIds?: number[]
}

export interface UpdateCustomerInput {
  code?: string
  name?: string
  email?: string
  phone?: string
  billingTermsId?: number
  shippingTermsId?: number
  billToAddressId?: number
  shipToAddressIds?: number[]
}

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
    return this.client.customer.findUnique({
      where: { id },
      include: customerInclude
    })
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
