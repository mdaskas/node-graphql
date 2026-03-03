import { prisma } from './prisma'
import { createRandomCustomer } from './sample-customers'

export async function seedCustomers() {
    await prisma.customer.deleteMany({})
    await prisma.address.deleteMany({})
    await prisma.billingTerm.deleteMany({})
    await prisma.shippingTerm.deleteMany({})

    await prisma.billingTerm.createManyAndReturn({
        data: [
            { id: 1, code: 'NET15', description: 'Net 15 Days', dueDays: 15 },
            { id: 2, code: 'NET30', description: 'Net 30 Days', dueDays: 30 },
            { id: 3, code: 'NET60', description: 'Net 60 Days', dueDays: 60 },
            { id: 4, code: 'COD', description: 'Cash on Delivery', dueDays: 0 }
        ]
    })

    await prisma.shippingTerm.createManyAndReturn({
        data: [
            { id: 1, code: 'FOB_ORIGIN', description: 'FOB Origin' },
            { id: 2, code: 'FOB_DEST', description: 'FOB Destination' },
            { id: 3, code: 'PREPAID', description: 'Prepaid' },
            { id: 4, code: 'COLLECT', description: 'Collect' }
        ]
    })

    const customers = Array.from({ length: 100 }, createRandomCustomer)
    for (const customer of customers) {
        await prisma.customer.create({
            data: customer
        })
    }
}
