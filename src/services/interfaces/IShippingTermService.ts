import type { IShippingTermDTO } from '../../data/dto/ShippingTermDTO'
import type {
    CreateShippingTermInput,
    UpdateShippingTermInput
} from '@repo/ShippingTermRepository'

export interface IShippingTermService {
    getAll(limit?: number, offset?: number): Promise<IShippingTermDTO[]>
    getById(id: number): Promise<IShippingTermDTO>
    getByCode(code: string): Promise<IShippingTermDTO>
    create(input: CreateShippingTermInput): Promise<IShippingTermDTO>
    update(
        id: number,
        input: UpdateShippingTermInput
    ): Promise<IShippingTermDTO>
    delete(id: number): Promise<IShippingTermDTO | null>
}
