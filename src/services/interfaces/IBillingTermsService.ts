import type { IBillingTermsDTO } from '../../data/dto/BiillingTermsDTO'
import type {
    CreateBillingTermsInput,
    UpdateBillingTermsInput
} from '../../repositories/BillingTermsRepository'

export interface IBillingTermsService {
    getAll(limit?: number, offset?: number): Promise<IBillingTermsDTO[]>
    getByCode(code: string): Promise<IBillingTermsDTO>
    create(input: CreateBillingTermsInput): Promise<IBillingTermsDTO>
    update(
        code: string,
        input: UpdateBillingTermsInput
    ): Promise<IBillingTermsDTO>
    delete(code: string): Promise<IBillingTermsDTO | null>
}
