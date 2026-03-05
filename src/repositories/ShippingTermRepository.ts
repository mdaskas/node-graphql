import EntityNotFoundError from '../errors/EntityNotFoundError'
import logger from '../utils/logger'
import {
    ShippingTermDTO,
    type IShippingTermDTO
} from '../data/dto/ShippingTermDTO'
import { BaseRepository } from '@repo/BaseRespository'
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
        logger.debug(`ShippingTermRepository.findAll`)

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

        logger.debug(`ShippingTermRepository.findById: Id ${id}`)

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

        logger.debug(`ShippingTermRepository.findByCode: Code ${code}`)

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async create(input: CreateShippingTermInput): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.create({
            data: input
        })

        logger.debug(
            `ShippingTermRepository.create: Id ${shippingTerm.id}, Code: ${shippingTerm.code}`
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

        logger.debug(
            `ShippingTermRepository.update: Id ${id}, Code: ${input.code}`
        )

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async delete(id: number) {
        const shippingTerms = await this.findById(id)
        if (!shippingTerms) return null

        logger.debug(
            `ShippingTermRepository.delete: Id ${id}, Code: ${shippingTerms.code}`
        )

        return this.client.shippingTerm.delete({
            where: { id }
        })
    }
}
