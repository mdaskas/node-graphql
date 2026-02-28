import type { IShippingTermsDTO } from '../dto/ShippingTermsDTO'
import type {
    CreateShippingTermsInput,
    UpdateShippingTermsInput
} from './ShippingTermsRepository'

export interface IShippingTermsRepository {
    findAll(limit?: number, offset?: number): Promise<IShippingTermsDTO[]>
    findByCode(code: string): Promise<IShippingTermsDTO | null>
    create(input: CreateShippingTermsInput): Promise<IShippingTermsDTO>
    update(
        code: string,
        input: UpdateShippingTermsInput
    ): Promise<IShippingTermsDTO>
    delete(code: string): Promise<IShippingTermsDTO | null>
}
