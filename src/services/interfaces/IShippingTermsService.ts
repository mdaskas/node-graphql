import type { IShippingTermsDTO } from '../../data/dto/ShippingTermsDTO'
import type {
    CreateShippingTermsInput,
    UpdateShippingTermsInput
} from '@repo/ShippingTermsRepository'

export interface IShippingTermsService {
    getAll(limit?: number, offset?: number): Promise<IShippingTermsDTO[]>
    getByCode(code: string): Promise<IShippingTermsDTO>
    create(input: CreateShippingTermsInput): Promise<IShippingTermsDTO>
    update(
        code: string,
        input: UpdateShippingTermsInput
    ): Promise<IShippingTermsDTO>
    delete(code: string): Promise<IShippingTermsDTO | null>
}
