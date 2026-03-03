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
        logger.debug('Fetched shipping terms', {
            count: shippingTerms.length,
            limit,
            offset
        })
        logger
            .child({ LogMetadata: `ShippingTermsRepository.findAll` })
            .debug('Shipping terms data')

        return shippingTerms.map(ShippingTermDTO.toDto)
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

        logger.debug(`Fetched shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.findByCode` })
            .debug('Shipping terms data')

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async create(input: CreateShippingTermInput): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.create({
            data: input
        })

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async update(
        code: string,
        input: UpdateShippingTermInput
    ): Promise<IShippingTermDTO> {
        const shippingTerm = await this.client.shippingTerm.update({
            where: { code },
            data: input
        })

        logger.debug(`Updated shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.update` })
            .debug('Shipping terms data')

        return ShippingTermDTO.toDto(shippingTerm)
    }

    async delete(code: string) {
        const shippingTerms = await this.findByCode(code)
        if (!shippingTerms) return null

        logger.debug(`Deleted shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.delete` })
            .debug('Shipping terms data')

        return this.client.shippingTerm.delete({
            where: { code }
        })
    }
}
