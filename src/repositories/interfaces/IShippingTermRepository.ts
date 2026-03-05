import type { IShippingTermDTO } from '../../data/dto/ShippingTermDTO'
import type {
    CreateShippingTermInput,
    UpdateShippingTermInput
} from '@/repositories/ShippingTermRepository'

export interface IShippingTermRepository {
    findAll(limit?: number, offset?: number): Promise<IShippingTermDTO[]>
    findById(id: number): Promise<IShippingTermDTO | null>
    findByCode(code: string): Promise<IShippingTermDTO | null>
    create(input: CreateShippingTermInput): Promise<IShippingTermDTO>
    update(
        id: number,
        input: UpdateShippingTermInput
    ): Promise<IShippingTermDTO>
    delete(id: number): Promise<IShippingTermDTO | null>
}
