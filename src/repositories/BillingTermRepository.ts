import EntityNotFoundError from '../errors/EntityNotFoundError'
import logger from '../utils/logger'
import {
    BillingTermDTO,
    type IBillingTermDTO
} from '../data/dto/BillingTermDTO'
import { BaseRepository } from '@repo/BaseRespository'
import type { IBillingTermRepository } from '@repotypes/IBillingTermRepository'
import type { IEntityBase } from './interfaces/IEntityBase'

export interface BillingTerm extends IEntityBase {
    code: string
    description: string
    dueDays: number
}

export type CreateBillingTermInput = Omit<
    BillingTerm,
    'id' | 'createdAt' | 'updatedAt'
>

export type UpdateBillingTermInput = Partial<CreateBillingTermInput>

export class BillingTermRepository
    extends BaseRepository
    implements IBillingTermRepository
{
    async findAll(
        limit = this.defaultLimit,
        offset = this.defaultOffset
    ): Promise<IBillingTermDTO[]> {
        const billingTerms = await this.client.billingTerm.findMany({
            skip: offset,
            take: limit
        })

        logger.debug('Fetched billing terms', {
            count: billingTerms.length,
            limit,
            offset
        })
        logger
            .child({ LogMetadata: `BillingTermRepository.findAll` })
            .debug('Billing term data')

        return billingTerms.map(BillingTermDTO.toDto)
    }

    async findByCode(code: string): Promise<IBillingTermDTO> {
        const billingTerm = await this.client.billingTerm.findUnique({
            where: { code }
        })
        if (!billingTerm)
            throw new EntityNotFoundError({
                message: `BillingTerm for code ${code} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        logger.debug(`Fetched billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermRepository.findByCode` })
            .debug('Billing term data')

        return BillingTermDTO.toDto(billingTerm)
    }

    async create(input: CreateBillingTermInput): Promise<IBillingTermDTO> {
        const billingTerm = await this.client.billingTerm.create({
            data: input
        })

        return BillingTermDTO.toDto(billingTerm)
    }

    async update(
        code: string,
        input: UpdateBillingTermInput
    ): Promise<IBillingTermDTO> {
        const billingTerm = await this.client.billingTerm.update({
            where: { code },
            data: input
        })

        logger.debug(`Updated billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermRepository.update` })
            .debug('Billing term data')

        return BillingTermDTO.toDto(billingTerm)
    }

    async delete(code: string): Promise<IBillingTermDTO | null> {
        const billingTerm = await this.findByCode(code)
        if (!billingTerm) return null
        const deletedBillingTerm = await this.client.billingTerm.delete({
            where: { code }
        })

        logger.debug(`Deleted billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermRepository.delete` })
            .debug('Billing term data')

        return BillingTermDTO.toDto(deletedBillingTerm)
    }
}
