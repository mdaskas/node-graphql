import type {
    ProductModel,
    ProductCategoryModel
} from '../../generated/prisma/models'
import type {
    CreateProductInput,
    UpdateProductInput
} from '@repo/ProductRepository'

export type ProductWithCategory = ProductModel & {
    category: ProductCategoryModel
}

export interface IProductRepository {
    findAll(limit?: number, offset?: number): Promise<ProductWithCategory[]>
    findById(id: number): Promise<ProductWithCategory | null>
    findByCode(code: string): Promise<ProductWithCategory | null>
    create(input: CreateProductInput): Promise<ProductWithCategory>
    update(id: number, input: UpdateProductInput): Promise<ProductWithCategory>
    delete(id: number): Promise<ProductWithCategory | null>
}
