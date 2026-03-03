import {
    createRandomProduct,
    createRandomProductCategory
} from './sample-products'
import { prisma } from './prisma'

export async function seedProducts() {
    // Clear existing data in dependency order
    await prisma.product.deleteMany({})
    await prisma.productCategory.deleteMany({})

    const productCategories = Array.from(
        { length: 10 },
        createRandomProductCategory
    )

    await prisma.productCategory.createMany({
        data: productCategories
    })

    const products = Array.from({ length: 1000 }, createRandomProduct)

    await prisma.product.createMany({
        data: products
    })
}
