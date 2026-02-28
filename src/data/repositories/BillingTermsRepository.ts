import EntityNotFoundError from '../../errors/EntityNotFoundError'
import logger from '../../utils/logger'
import { BillingTermsDTO, type IBillingTermsDTO } from '../dto/BiillingTermsDTO'
import { BaseRepository } from './BaseRespository'
import type { IBillingTermsRepository } from './IBillingTermsRepository'

export interface CreateBillingTermsInput {
    code: string
    description: string
    dueDays: number
}

export interface UpdateBillingTermsInput {
    code?: string
    description?: string
    dueDays?: number
}

export class BillingTermsRepository
    extends BaseRepository
    implements IBillingTermsRepository
{
    async findAll(
        limit = this.defaultLimit,
        offset = this.defaultOffset
    ): Promise<IBillingTermsDTO[]> {
        const billingTerms = await this.client.billingTerms.findMany({
            skip: offset,
            take: limit
        })

        logger.debug('Fetched billing terms', {
            count: billingTerms.length,
            limit,
            offset
        })
        logger
            .child({ LogMetadata: `BillingTermsRepository.findAll` })
            .debug('Billing terms data')

        return billingTerms.map(BillingTermsDTO.toDto)
    }

    async findByCode(code: string): Promise<IBillingTermsDTO> {
        const billingTerm = await this.client.billingTerms.findUnique({
            where: { code }
        })
        if (!billingTerm)
            throw new EntityNotFoundError({
                message: `BillingTerms for code ${code} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        logger.debug(`Fetched billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermsRepository.findByCode` })
            .debug('Billing terms data')

        return BillingTermsDTO.toDto(billingTerm)
    }

    async create(input: CreateBillingTermsInput): Promise<IBillingTermsDTO> {
        const billingTerm = await this.client.billingTerms.create({
            data: input
        })

        return BillingTermsDTO.toDto(billingTerm)
    }

    async update(
        code: string,
        input: UpdateBillingTermsInput
    ): Promise<IBillingTermsDTO> {
        const billingTerm = await this.client.billingTerms.update({
            where: { code },
            data: input
        })

        logger.debug(`Updated billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermsRepository.update` })
            .debug('Billing terms data')

        return BillingTermsDTO.toDto(billingTerm)
    }

    async delete(code: string): Promise<IBillingTermsDTO | null> {
        const billingTerms = await this.findByCode(code)
        if (!billingTerms) return null
        const deletedBillingTerm = await this.client.billingTerms.delete({
            where: { code }
        })

        logger.debug(`Deleted billing term by Code ${code}`)
        logger
            .child({ LogMetadata: `BillingTermsRepository.delete` })
            .debug('Billing terms data')

        return BillingTermsDTO.toDto(deletedBillingTerm)
    }
}
