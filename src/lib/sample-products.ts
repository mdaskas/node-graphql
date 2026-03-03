import { faker } from '@faker-js/faker'

interface Product {
    id: number
    code: string
    description: string
    price: number
    categoryId: number
    stock: number
}
interface ProductCategory {
    id: number
    code: string
    description: string
}

let nextCategoryId = 100

export const createRandomProductCategory = (): ProductCategory => {
    return {
        id: nextCategoryId,
        code: `CAT-${nextCategoryId++}`,
        description: faker.commerce.productDescription()
    }
}

// Function to generate a single product
let nextProductId = 1000
export const createRandomProduct = (): Product => {
    return {
        id: nextProductId,
        code: `PROD-${nextProductId++}`,
        description: faker.commerce.productDescription(),
        price: Number(
            faker.commerce.price({ min: 10, max: 1000, dec: 2, symbol: '' })
        ),
        categoryId: faker.number.int({ min: 100, max: nextCategoryId - 1 }),
        stock: faker.number.int({ min: 0, max: 100 })
    }
}
