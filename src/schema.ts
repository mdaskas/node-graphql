import {
    CustomerRepository,
    type CreateCustomerInput,
    type UpdateCustomerInput
} from './data/repositories/CustomerRepository'
import {
    BillingTermsRepository,
    type CreateBillingTermsInput,
    type UpdateBillingTermsInput
} from './data/repositories/BillingTermsRepository'
import {
    ShippingTermsRepository,
    type CreateShippingTermsInput,
    type UpdateShippingTermsInput
} from './data/repositories/ShippingTermsRepository'

const customerRepo = new CustomerRepository()
const billingTermsRepo = new BillingTermsRepository()
const shippingTermsRepo = new ShippingTermsRepository()

const typeDefs = `#graphql
type Address {
  id: ID!
  street1: String!
  street2: String
  city: String!
  state: String!
  zip: String!
  country: String!
}

type BillingTerms {
  code: ID!
  description: String!
  dueDays: Int!
}

type ShippingTerms {
  code: ID!
  description: String!
}

type Customer {
  id: ID!
  code: String!
  name: String!
  email: String!
  phone: String
  billingTerms: BillingTerms
  shippingTerms: ShippingTerms
  billToAddress: Address
  shipToAddresses: [Address!]!
}

type Query {
  customers: [Customer!]!
  customer(id: ID!): Customer
  billingTerms: [BillingTerms!]!
  billingTerm(id: ID!): BillingTerms
  shippingTerms: [ShippingTerms!]!
  shippingTerm(id: ID!): ShippingTerms
}

type Mutation {
  createCustomer(input: CreateCustomerInput!): Customer!
  updateCustomer(id: ID!, input: UpdateCustomerInput!): Customer
  deleteCustomer(id: ID!): Customer

  createBillingTerms(input: CreateBillingTermsInput!): BillingTerms!
  updateBillingTerms(code: ID!, input: UpdateBillingTermsInput!): BillingTerms
  deleteBillingTerms(code: ID!): BillingTerms

  createShippingTerms(input: CreateShippingTermsInput!): ShippingTerms!
  updateShippingTerms(code: ID!, input: UpdateShippingTermsInput!): ShippingTerms
  deleteShippingTerms(code: ID!): ShippingTerms
}

input CreateCustomerInput {
	code: String!
	name: String!
	email: String!
	phone: String
	billingTermsCode:  String
	shippingTermsCode: String
	billToAddressId: Int
	shipToAddressIds: [Int!]
}

input UpdateCustomerInput {
	code: String
	name: String
	email: String
	phone: String
	billingTermsCode: String
	shippingTermsCode: String
	billToAddressId: Int
	shipToAddressIds: [Int!]
}

input CreateBillingTermsInput {
	code: String!
	description: String!
	dueDays: Int!
}

input UpdateBillingTermsInput {
	description: String
	dueDays: Int
}

input CreateShippingTermsInput {
	code: String!
	description: String!
}

input UpdateShippingTermsInput {
	description: String
}
`

const resolvers = {
    Query: {
        customers: (_: any, __: any) => {
            return customerRepo.findAll()
        },
        customer: (_: any, { id }: { id: number }) =>
            customerRepo.findById(parseInt(id.toString())),
        billingTerms: () => billingTermsRepo.findAll(),
        billingTerm: (_: any, { code }: { code: string }) =>
            billingTermsRepo.findByCode(code),
        shippingTerms: () => shippingTermsRepo.findAll(),
        shippingTerm: (_: any, { code }: { code: string }) =>
            shippingTermsRepo.findByCode(code)
    },
    Mutation: {
        createCustomer: (_: any, { input }: { input: CreateCustomerInput }) =>
            customerRepo.create(input),
        updateCustomer: (
            _: any,
            { id, input }: { id: number; input: UpdateCustomerInput }
        ) => customerRepo.update(id, input),
        deleteCustomer: (_: any, { id }: { id: number }) =>
            customerRepo.delete(id),

        createBillingTerms: (
            _: any,
            { input }: { input: CreateBillingTermsInput }
        ) => billingTermsRepo.create(input),
        updateBillingTerms: (
            _: any,
            { code, input }: { code: string; input: UpdateBillingTermsInput }
        ) => billingTermsRepo.update(code, input),
        deleteBillingTerms: (_: any, { code }: { code: string }) =>
            billingTermsRepo.delete(code),

        createShippingTerms: (
            _: any,
            { input }: { input: CreateShippingTermsInput }
        ) => shippingTermsRepo.create(input),
        updateShippingTerms: (
            _: any,
            { code, input }: { code: string; input: UpdateShippingTermsInput }
        ) => shippingTermsRepo.update(code, input),
        deleteShippingTerms: (_: any, { code }: { code: string }) =>
            shippingTermsRepo.delete(code)
    }
}

export { typeDefs, resolvers }
