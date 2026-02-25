import type { BillingTermsModel } from '../../generated/prisma/models'
import type { IBillingTermsDTO } from '../dto/BiillingTermsDTO'
import type {
    CreateBillingTermsInput,
    UpdateBillingTermsInput
} from './BillingTermsRepository'

export interface IBillingTermsRepository {
    findAll(limit?: number, offset?: number): Promise<IBillingTermsDTO[]>
    findById(id: number): Promise<IBillingTermsDTO | null>
    findByCode(code: string): Promise<IBillingTermsDTO | null>
    create(input: CreateBillingTermsInput): Promise<IBillingTermsDTO>
    update(
        id: number,
        input: UpdateBillingTermsInput
    ): Promise<IBillingTermsDTO>
    delete(id: number): Promise<IBillingTermsDTO | null>
}
