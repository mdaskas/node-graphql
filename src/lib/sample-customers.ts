import { faker } from '@faker-js/faker'

interface CreateAddressInput {
    street1: string
    street2?: string
    city: string
    state: string
    zip: string
    country: string
}

interface Address extends CreateAddressInput {
    id: number
    shipToCustomerId?: number
}
const MAX_SHIPPING_TERMS = 3
const MAX_BILLING_TERMS = 4

let nextAddressId = 10000
export const createRandomAddress = (): Address => {
    return {
        id: nextAddressId++,
        street1: faker.location.streetAddress(),
        street2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
        shipToCustomerId: faker.number.int({
            min: 10000,
            max: nextAddressId - 1
        })
    }
}

let nextCustomerId = 10000
export const createRandomCustomer = () => {
    return {
        code: `CUST-${nextCustomerId++}`,
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        billingTerms: { connect: { code: 'NET15' } },
        shippingTerms: { connect: { code: 'COLLECT' } },
        billToAddress: {
            create: {
                street1: faker.location.streetAddress(),
                street2: faker.location.secondaryAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                zip: faker.location.zipCode(),
                country: faker.location.country()
            }
        },
        shipToAddresses: {
            create: Array.from(
                { length: faker.number.int({ min: 1, max: 2 }) },
                () => ({
                    street1: faker.location.streetAddress(),
                    street2: faker.location.secondaryAddress(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    zip: faker.location.zipCode(),
                    country: faker.location.country()
                })
            )
        }
    }
}
