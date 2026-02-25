import EntityNotFoundError from '../../errors/EntityNotFoundError'
import {
    ShippingTermsDTO,
    type IShippingTermsDTO
} from '../dto/ShippingTermsDTO'
import { BaseRepository } from './BaseRespository'
import type { IShippingTermsRepository } from './IShippingTermsRepository'

export interface CreateShippingTermsInput {
    code: string
    description: string
}

export interface UpdateShippingTermsInput {
    code?: string
    description?: string
}

export class ShippingTermsRepository
    extends BaseRepository
    implements IShippingTermsRepository
{
    async findAll(
        limit = this.defaultLimit,
        offset = this.defaultOffset
    ): Promise<IShippingTermsDTO[]> {
        const shippingTerms = await this.client.shippingTerms.findMany({
            skip: offset,
            take: limit
        })
        return shippingTerms.map(ShippingTermsDTO.toDto)
    }

    async findById(id: number): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.findUnique({
            where: { id }
        })

        if (!shippingTerm)
            throw new EntityNotFoundError({
                message: `ShippingTerms for ID ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async findByCode(code: string): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.findUnique({
            where: { code }
        })

        if (!shippingTerm)
            throw new EntityNotFoundError({
                message: `ShippingTerms for code ${code} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async create(input: CreateShippingTermsInput): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.create({
            data: input
        })

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async update(
        id: number,
        input: UpdateShippingTermsInput
    ): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.update({
            where: { id },
            data: input
        })

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async delete(id: number) {
        const shippingTerms = await this.findById(id)
        if (!shippingTerms) return null

        return this.client.shippingTerms.delete({
            where: { id }
        })
    }
}
