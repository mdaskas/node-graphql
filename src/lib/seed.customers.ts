import { prisma } from './prisma'
import { createRandomCustomer } from './sample-customers'

export async function seedCustomers() {
    await prisma.customer.deleteMany({})
    await prisma.address.deleteMany({})
    await prisma.billingTerm.deleteMany({})
    await prisma.shippingTerm.deleteMany({})

    const billingTerms = await prisma.billingTerm.createManyAndReturn({
        data: [
            { code: 'NET15', description: 'Net 15 Days', dueDays: 15 },
            { code: 'NET30', description: 'Net 30 Days', dueDays: 30 },
            { code: 'NET60', description: 'Net 60 Days', dueDays: 60 },
            { code: 'COD', description: 'Cash on Delivery', dueDays: 0 }
        ]
    })
    // find the min and max id from billingTerms to use for random association
    const minBillingTermId = Math.min(...billingTerms.map((bt) => bt.id))
    const maxBillingTermId = Math.max(...billingTerms.map((bt) => bt.id))

    const shippingTerms = await prisma.shippingTerm.createManyAndReturn({
        data: [
            { code: 'FOB_ORIGIN', description: 'FOB Origin' },
            { code: 'FOB_DEST', description: 'FOB Destination' },
            { code: 'PREPAID', description: 'Prepaid' },
            { code: 'COLLECT', description: 'Collect' }
        ]
    })
    // find the min and max id from shippingTerms to use for random association
    const minShippingTermId = Math.min(...shippingTerms.map((st) => st.id))
    const maxShippingTermId = Math.max(...shippingTerms.map((st) => st.id))

    const customerContext = {
        billingTermIds: { min: minBillingTermId, max: maxBillingTermId },
        shippingTermIds: { min: minShippingTermId, max: maxShippingTermId }
    }
    const customers = Array.from({ length: 100 }, () =>
        createRandomCustomer(customerContext)
    )
    for (const customer of customers) {
        await prisma.customer.create({
            data: customer
        })
    }
}
