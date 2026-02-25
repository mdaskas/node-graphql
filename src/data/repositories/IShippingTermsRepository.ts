import type { ShippingTermsModel } from '../../generated/prisma/models'
import type { IShippingTermsDTO } from '../dto/ShippingTermsDTO'
import type {
    CreateShippingTermsInput,
    UpdateShippingTermsInput
} from './ShippingTermsRepository'

export interface IShippingTermsRepository {
    findAll(limit?: number, offset?: number): Promise<IShippingTermsDTO[]>
    findById(id: number): Promise<IShippingTermsDTO | null>
    findByCode(code: string): Promise<IShippingTermsDTO | null>
    create(input: CreateShippingTermsInput): Promise<IShippingTermsDTO>
    update(
        id: number,
        input: UpdateShippingTermsInput
    ): Promise<IShippingTermsDTO>
    delete(id: number): Promise<IShippingTermsDTO | null>
}
