import { prisma } from './prisma'
import { createRandomCustomer } from './sample-customers'

export async function seedCustomers() {
    await prisma.customer.deleteMany({})
    await prisma.address.deleteMany({})
    await prisma.billingTerms.deleteMany({})
    await prisma.shippingTerms.deleteMany({})

    // Seed billing terms
    await prisma.billingTerms.createManyAndReturn({
        data: [
            { code: 'NET15', description: 'Net 15 Days', dueDays: 15 },
            { code: 'NET30', description: 'Net 30 Days', dueDays: 30 },
            { code: 'NET60', description: 'Net 60 Days', dueDays: 60 },
            { code: 'COD', description: 'Cash on Delivery', dueDays: 0 }
        ]
    })

    await prisma.shippingTerms.createManyAndReturn({
        data: [
            { code: 'FOB_ORIGIN', description: 'FOB Origin' },
            { code: 'FOB_DEST', description: 'FOB Destination' },
            { code: 'PREPAID', description: 'Prepaid' },
            { code: 'COLLECT', description: 'Collect' }
        ]
    })

    const customers = Array.from({ length: 100 }, createRandomCustomer)
    for (const customer of customers) {
        await prisma.customer.create({
            data: customer
        })
    }
}
