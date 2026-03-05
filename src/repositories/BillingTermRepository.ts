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

        logger.debug('BillingTermRepository.findAll: Fetched billing terms', {
            count: billingTerms.length,
            limit,
            offset
        })

        return billingTerms.map(BillingTermDTO.toDto)
    }

    async findById(id: number): Promise<IBillingTermDTO> {
        const billingTerm = await this.client.billingTerm.findUnique({
            where: { id }
        })
        if (!billingTerm)
            throw new EntityNotFoundError({
                message: `BillingTerm for id ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        logger.debug(
            `BillingTermRepository.findById: id:${id}, code:${billingTerm.code}`
        )

        return BillingTermDTO.toDto(billingTerm)
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

        logger.debug(
            `BillingTermRepository.findByCode: code:${billingTerm.code}`
        )

        return BillingTermDTO.toDto(billingTerm)
    }

    async create(input: CreateBillingTermInput): Promise<IBillingTermDTO> {
        logger.debug(
            `BillingTermRepository.create: ${input.code} - ${input.description}`
        )
        const billingTerm = await this.client.billingTerm.create({
            data: input
        })

        return BillingTermDTO.toDto(billingTerm)
    }

    async update(
        id: number,
        input: UpdateBillingTermInput
    ): Promise<IBillingTermDTO> {
        const billingTerm = await this.client.billingTerm.update({
            where: { id },
            data: input
        })

        logger.debug(
            `BillingTermRepository.update: id: ${id}, code: ${billingTerm.code}`
        )

        return BillingTermDTO.toDto(billingTerm)
    }

    async delete(id: number): Promise<IBillingTermDTO | null> {
        const billingTerm = await this.findById(id)
        if (!billingTerm) return null
        const deletedBillingTerm = await this.client.billingTerm.delete({
            where: { id }
        })

        logger.debug(
            `BillingTermRepository.delete: id: ${id}, code: ${billingTerm.code}`
        )

        return BillingTermDTO.toDto(deletedBillingTerm)
    }
}
