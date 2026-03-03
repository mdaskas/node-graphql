import {
    CustomerRepository,
    type CreateCustomerInput,
    type UpdateCustomerInput
} from './repositories/CustomerRepository'
import {
    BillingTermsRepository,
    type CreateBillingTermsInput,
    type UpdateBillingTermsInput
} from './repositories/BillingTermsRepository'
import {
    ShippingTermsRepository,
    type CreateShippingTermsInput,
    type UpdateShippingTermsInput
} from './repositories/ShippingTermsRepository'
import {
    ProductRepository,
    type CreateProductInput,
    type UpdateProductInput
} from './repositories/ProductRepository'
import {
    ProductCategoryRepository,
    type CreateProductCategoryInput,
    type UpdateProductCategoryInput
} from './repositories/ProductCategoryRepository'

const customerRepo = new CustomerRepository()
const billingTermsRepo = new BillingTermsRepository()
const shippingTermsRepo = new ShippingTermsRepository()
const productRepo = new ProductRepository()
const productCategoryRepo = new ProductCategoryRepository()

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

type ProductCategory {
  id: ID!
  code: String!
  description: String!
}

type Product {
  id: ID!
  code: String!
  description: String!
  price: Float!
  categoryId: Int!
  category: ProductCategory!
  stock: Int!
}

type Query {
  customers: [Customer!]!
  customer(id: ID!): Customer
  billingTerms: [BillingTerms!]!
  billingTerm(id: ID!): BillingTerms
  shippingTerms: [ShippingTerms!]!
  shippingTerm(id: ID!): ShippingTerms
  products: [Product!]!
  product(id: ID!): Product
  productCategories: [ProductCategory!]!
  productCategory(id: ID!): ProductCategory
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

  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product
  deleteProduct(id: ID!): Product

  createProductCategory(input: CreateProductCategoryInput!): ProductCategory!
  updateProductCategory(id: ID!, input: UpdateProductCategoryInput!): ProductCategory
  deleteProductCategory(id: ID!): ProductCategory
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

input CreateProductInput {
	code: String!
	description: String!
	price: Float!
	categoryId: Int!
	stock: Int!
}

input UpdateProductInput {
	code: String
	description: String
	price: Float
	categoryId: Int
	stock: Int
}

input CreateProductCategoryInput {
	code: String!
	description: String!
}

input UpdateProductCategoryInput {
	code: String
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
            shippingTermsRepo.findByCode(code),
        products: () => productRepo.findAll(),
        product: (_: any, { id }: { id: number }) =>
            productRepo.findById(parseInt(id.toString())),
        productCategories: () => productCategoryRepo.findAll(),
        productCategory: (_: any, { id }: { id: number }) =>
            productCategoryRepo.findById(parseInt(id.toString()))
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
            shippingTermsRepo.delete(code),

        createProduct: (_: any, { input }: { input: CreateProductInput }) =>
            productRepo.create(input),
        updateProduct: (
            _: any,
            { id, input }: { id: number; input: UpdateProductInput }
        ) => productRepo.update(parseInt(id.toString()), input),
        deleteProduct: (_: any, { id }: { id: number }) =>
            productRepo.delete(parseInt(id.toString())),

        createProductCategory: (
            _: any,
            { input }: { input: CreateProductCategoryInput }
        ) => productCategoryRepo.create(input),
        updateProductCategory: (
            _: any,
            { id, input }: { id: number; input: UpdateProductCategoryInput }
        ) => productCategoryRepo.update(parseInt(id.toString()), input),
        deleteProductCategory: (_: any, { id }: { id: number }) =>
            productCategoryRepo.delete(parseInt(id.toString()))
    }
}

export { typeDefs, resolvers }
