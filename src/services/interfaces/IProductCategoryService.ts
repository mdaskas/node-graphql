import type { ProductCategoryModel } from '../../generated/prisma/models'
import type {
    CreateProductCategoryInput,
    UpdateProductCategoryInput
} from '@repo/ProductCategoryRepository'

export interface IProductCategoryService {
    getAll(limit?: number, offset?: number): Promise<ProductCategoryModel[]>
    getById(id: number): Promise<ProductCategoryModel>
    getByCode(code: string): Promise<ProductCategoryModel | null>
    create(input: CreateProductCategoryInput): Promise<ProductCategoryModel>
    update(
        id: number,
        input: UpdateProductCategoryInput
    ): Promise<ProductCategoryModel>
    delete(id: number): Promise<ProductCategoryModel | null>
}
