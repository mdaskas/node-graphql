import type { IShippingTermDTO } from '../../data/dto/ShippingTermDTO'
import type {
    CreateShippingTermInput,
    UpdateShippingTermInput
} from '@/repositories/ShippingTermRepository'

export interface IShippingTermRepository {
    findAll(limit?: number, offset?: number): Promise<IShippingTermDTO[]>
    findByCode(code: string): Promise<IShippingTermDTO | null>
    create(input: CreateShippingTermInput): Promise<IShippingTermDTO>
    update(
        code: string,
        input: UpdateShippingTermInput
    ): Promise<IShippingTermDTO>
    delete(code: string): Promise<IShippingTermDTO | null>
}
