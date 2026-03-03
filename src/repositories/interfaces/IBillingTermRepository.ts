import type { IBillingTermDTO } from '../../data/dto/BillingTermDTO'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '@repo/BillingTermRepository'

export interface IBillingTermRepository {
    findAll(limit?: number, offset?: number): Promise<IBillingTermDTO[]>
    findByCode(code: string): Promise<IBillingTermDTO | null>
    create(input: CreateBillingTermInput): Promise<IBillingTermDTO>
    update(
        code: string,
        input: UpdateBillingTermInput
    ): Promise<IBillingTermDTO>
    delete(code: string): Promise<IBillingTermDTO | null>
}
