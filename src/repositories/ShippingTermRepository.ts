import EntityNotFoundError from '../errors/EntityNotFoundError'
import {
    ShippingTermDTO,
    type IShippingTermDTO
} from '../data/dto/ShippingTermDTO'
import { BaseRepository } from '@/repositories/BaseRepository'
import type { IShippingTermRepository } from '@repotypes/IShippingTermRepository'
import type { IEntityBase } from './interfaces/IEntityBase'

export interface ShippingTerm extends IEntityBase {
    code: string
    description: string
}
export type CreateShippingTermInput = Omit<
    ShippingTerm,
    'id' | 'createdAt' | 'updatedAt'
>

export type UpdateShippingTermInput = Partial<CreateShippingTermInput>

export class ShippingTermRepository
    extends BaseRepository
    implements IShippingTermRepository
{
    async findAll(
        limit = this.defaultLimit,
        offset = this.defaultOffset
    ): Promise<IShippingTermDTO[]> {
        const shippingTerms = await this.client.shippingTerm.findMany({
            skip: offset,
            take: limit
        })
        this.childLogger.debug('findAll')

        return shippingTerms.map(ShippingTermDTO.toDto)
    }

    async findById(id: number): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.findUnique({
            where: { id }
        })

        if (!shippingTerm)
            throw new EntityNotFoundError({
                message: `ShippingTerms for id ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findById: Id ${id}`)

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async findByCode(code: string): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.findUnique({
            where: { code }
        })

        if (!shippingTerm)
            throw new EntityNotFoundError({
                message: `ShippingTerms for code ${code} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        this.childLogger.debug(`findByCode: Code ${code}`)

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async create(input: CreateShippingTermInput): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.create({
            data: input
        })

        this.childLogger.debug(
            `create: Id ${shippingTerm.id}, Code: ${shippingTerm.code}`
        )

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async update(
        id: number,
        input: UpdateShippingTermInput
    ): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.update({
            where: { id },
            data: input
        })

        this.childLogger.debug(`update: Id ${id}, Code: ${input.code}`)

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async delete(id: number) {
        const shippingTerms = await this.findById(id)
        if (!shippingTerms) return null

        this.childLogger.debug(`delete: Id ${id}, Code: ${shippingTerms.code}`)

        return this.client.shippingTerm.delete({
            where: { id }
        })
    }
}
