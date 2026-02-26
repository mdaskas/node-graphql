import { prisma } from './prisma'

async function main() {
    // Clear existing data in dependency order
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

    // Seed shipping terms
    await prisma.shippingTerms.createManyAndReturn({
        data: [
            { code: 'FOB_ORIGIN', description: 'FOB Origin' },
            { code: 'FOB_DEST', description: 'FOB Destination' },
            { code: 'PREPAID', description: 'Prepaid' },
            { code: 'COLLECT', description: 'Collect' }
        ]
    })

    // Seed addresses
    await prisma.address.createManyAndReturn({
        data: [
            // Bill-to addresses
            {
                id: 1,
                street1: '100 Main St',
                city: 'Springfield',
                state: 'IL',
                zip: '62701'
            },
            {
                id: 2,
                street1: '200 Oak Ave',
                city: 'Chicago',
                state: 'IL',
                zip: '60601'
            },
            {
                id: 3,
                street1: '300 Elm Blvd',
                city: 'Dallas',
                state: 'TX',
                zip: '75201'
            },
            {
                id: 4,
                street1: '400 Pine Rd',
                city: 'Denver',
                state: 'CO',
                zip: '80201'
            },
            // Ship-to addresses
            {
                id: 10,
                street1: '101 Warehouse Dr',
                city: 'Springfield',
                state: 'IL',
                zip: '62702'
            },
            {
                id: 11,
                street1: '102 Dock Ln',
                city: 'Peoria',
                state: 'IL',
                zip: '61602'
            },
            {
                id: 12,
                street1: '201 Loading Bay',
                city: 'Naperville',
                state: 'IL',
                zip: '60540'
            },
            {
                id: 13,
                street1: '301 Depot St',
                city: 'Houston',
                state: 'TX',
                zip: '77001'
            },
            {
                id: 14,
                street1: '302 Terminal Ave',
                city: 'Austin',
                state: 'TX',
                zip: '73301'
            },
            {
                id: 15,
                street1: '401 Freight Way',
                city: 'Boulder',
                state: 'CO',
                zip: '80301'
            }
        ]
    })

    // Seed customers with relations
    await prisma.customer.create({
        data: {
            id: 100,
            code: 'c100',
            name: 'ABC Manufacturing',
            phone: '555-1234',
            email: 'abc@example.com',
            billingTermsCode: 'NET15',
            shippingTermsCode: 'FOB_ORIGIN',
            billToAddressId: 1,
            shipToAddresses: { connect: [{ id: 10 }, { id: 11 }] }
        }
    })

    await prisma.customer.create({
        data: {
            id: 101,
            code: 'c101',
            name: 'Food Truck',
            phone: '555-5678',
            email: 'foodtruck@example.com',
            billingTermsCode: 'NET30',
            shippingTermsCode: 'PREPAID',
            billToAddressId: 2,
            shipToAddresses: { connect: [{ id: 12 }] }
        }
    })

    await prisma.customer.create({
        data: {
            id: 102,
            code: 'c102',
            name: 'Big Boy',
            phone: '555-8765',
            email: 'bigboy@example.com',
            billingTermsCode: 'NET60',
            shippingTermsCode: 'FOB_DEST',
            billToAddressId: 3,
            shipToAddresses: { connect: [{ id: 13 }, { id: 14 }] }
        }
    })

    await prisma.customer.create({
        data: {
            id: 103,
            code: 'c103',
            name: "Ernie's",
            phone: '555-4321',
            email: 'ernies@example.com',
            billingTermsCode: 'COD',
            shippingTermsCode: 'COLLECT',
            billToAddressId: 4,
            shipToAddresses: { connect: [{ id: 15 }] }
        }
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
