import type { IBillingTermsDTO } from '../dto/BiillingTermsDTO'
import type {
    CreateBillingTermsInput,
    UpdateBillingTermsInput
} from './BillingTermsRepository'

export interface IBillingTermsRepository {
    findAll(limit?: number, offset?: number): Promise<IBillingTermsDTO[]>
    findByCode(code: string): Promise<IBillingTermsDTO | null>
    create(input: CreateBillingTermsInput): Promise<IBillingTermsDTO>
    update(
        code: string,
        input: UpdateBillingTermsInput
    ): Promise<IBillingTermsDTO>
    delete(code: string): Promise<IBillingTermsDTO | null>
}
