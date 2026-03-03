import type { ProductWithCategory } from '@repotypes/IProductRepository'
import type {
    CreateProductInput,
    UpdateProductInput
} from '@repo/ProductRepository'

export interface IProductService {
    getAll(limit?: number, offset?: number): Promise<ProductWithCategory[]>
    getById(id: number): Promise<ProductWithCategory>
    getByCode(code: string): Promise<ProductWithCategory | null>
    create(input: CreateProductInput): Promise<ProductWithCategory>
    update(id: number, input: UpdateProductInput): Promise<ProductWithCategory>
    delete(id: number): Promise<ProductWithCategory | null>
}
