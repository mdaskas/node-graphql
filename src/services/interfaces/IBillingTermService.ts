import type { IBillingTermDTO } from '../../data/dto/BillingTermDTO'
import type {
    CreateBillingTermInput,
    UpdateBillingTermInput
} from '@/repositories/BillingTermRepository'

export interface IBillingTermService {
    getAll(limit?: number, offset?: number): Promise<IBillingTermDTO[]>
    getById(id: number): Promise<IBillingTermDTO>
    getByCode(code: string): Promise<IBillingTermDTO>
    create(input: CreateBillingTermInput): Promise<IBillingTermDTO>
    update(
        code: string,
        input: UpdateBillingTermInput
    ): Promise<IBillingTermDTO>
    delete(code: string): Promise<IBillingTermDTO | null>
}
