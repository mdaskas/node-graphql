import EntityNotFoundError from '../../errors/EntityNotFoundError'
import logger from '../../utils/logger'
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
        logger.debug('Fetched shipping terms', {
            count: shippingTerms.length,
            limit,
            offset
        })
        logger
            .child({ LogMetadata: `ShippingTermsRepository.findAll` })
            .debug('Shipping terms data')

        return shippingTerms.map(ShippingTermsDTO.toDto)
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

        logger.debug(`Fetched shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.findByCode` })
            .debug('Shipping terms data')

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async create(input: CreateShippingTermsInput): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.create({
            data: input
        })

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async update(
        code: string,
        input: UpdateShippingTermsInput
    ): Promise<IShippingTermsDTO> {
        const shippingTerm = await this.client.shippingTerms.update({
            where: { code },
            data: input
        })

        logger.debug(`Updated shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.update` })
            .debug('Shipping terms data')

        return ShippingTermsDTO.toDto(shippingTerm)
    }

    async delete(code: string) {
        const shippingTerms = await this.findByCode(code)
        if (!shippingTerms) return null

        logger.debug(`Deleted shipping term by Code ${code}`)
        logger
            .child({ LogMetadata: `ShippingTermsRepository.delete` })
            .debug('Shipping terms data')

        return this.client.shippingTerms.delete({
            where: { code }
        })
    }
}
