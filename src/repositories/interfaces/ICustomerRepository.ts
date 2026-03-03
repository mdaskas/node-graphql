import type {
    CustomerModel,
    BillingTermsModel,
    ShippingTermsModel,
    AddressModel
} from '../generated/prisma/models'
import type {
    CreateCustomerInput,
    UpdateCustomerInput
} from './CustomerRepository'

export type CustomerWithRelations = CustomerModel & {
    billingTerms: BillingTermsModel | null
    shippingTerms: ShippingTermsModel | null
    billToAddress: AddressModel | null
    shipToAddresses: AddressModel[]
}

export interface ICustomerRepository {
    findAll(limit?: number, offset?: number): Promise<CustomerWithRelations[]>
    findById(id: number): Promise<CustomerWithRelations | null>
    findByCode(code: string): Promise<CustomerWithRelations | null>
    findByEmail(email: string): Promise<CustomerWithRelations | null>
    create(input: CreateCustomerInput): Promise<CustomerWithRelations>
    update(
        id: number,
        input: UpdateCustomerInput
    ): Promise<CustomerWithRelations>
    delete(id: number): Promise<CustomerWithRelations | null>
}
