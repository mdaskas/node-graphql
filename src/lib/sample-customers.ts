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
        billingTerm: {
            connect: {
                id: faker.number.int({
                    min: 1,
                    max: 4
                })
            }
        },
        shippingTerm: {
            connect: {
                id: faker.number.int({
                    min: 1,
                    max: 4
                })
            }
        },
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
