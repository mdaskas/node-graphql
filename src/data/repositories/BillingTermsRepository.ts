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

    async findById(id: number): Promise<IBillingTermsDTO> {
        const billingTerm = await this.client.billingTerms.findUnique({
            where: { id }
        })

        if (!billingTerm)
            throw new EntityNotFoundError({
                message: `BillingTerms for ID ${id} not found`,
                statusCode: 404,
                code: 'ERR_NF'
            })

        return BillingTermsDTO.toDto(billingTerm)
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
        id: number,
        input: UpdateBillingTermsInput
    ): Promise<IBillingTermsDTO> {
        const billingTerm = await this.client.billingTerms.update({
            where: { id },
            data: input
        })

        logger.debug(`Updated billing term by ID ${id}`)
        logger
            .child({ LogMetadata: `BillingTermsRepository.update` })
            .debug('Billing terms data')

        return BillingTermsDTO.toDto(billingTerm)
    }

    async delete(id: number): Promise<IBillingTermsDTO | null> {
        const billingTerms = await this.findById(id)
        if (!billingTerms) return null
        const deletedBillingTerm = await this.client.billingTerms.delete({
            where: { id }
        })

        logger.debug(`Deleted billing term by ID ${id}`)
        logger
            .child({ LogMetadata: `BillingTermsRepository.delete` })
            .debug('Billing terms data')

        return BillingTermsDTO.toDto(deletedBillingTerm)
    }
}
