import type { Request, Response, NextFunction } from 'express'
import type { IProductService } from '@servicetypes/IProductService'
import type { IProductController } from '@controllertypes/IProductController'
import type {
    CreateProductInput,
    UpdateProductInput
} from '../repositories/ProductRepository'
import { z } from 'zod'
import logger from '../utils/logger'

const createProductSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be positive'),
    categoryId: z
        .number()
        .int()
        .positive('Category ID must be a positive integer'),
    stock: z.number().int().min(0, 'Stock cannot be negative')
})

const updateProductSchema = z.object({
    code: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    categoryId: z.number().int().positive().optional(),
    stock: z.number().int().min(0).optional()
})

export class ProductController implements IProductController {
    private service: IProductService

    constructor(service: IProductService) {
        this.service = service
    }

    getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const limit = req.query.limit
                ? parseInt(req.query.limit as string)
                : undefined
            const offset = req.query.offset
                ? parseInt(req.query.offset as string)
                : undefined

            const products = await this.service.getAll(limit, offset)
            res.json(products)
        } catch (error) {
            next(error)
        }
    }

    getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string)
            if (isNaN(id)) {
                res.status(400).json({
                    error: {
                        message: 'Invalid ID parameter',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const product = await this.service.getById(id)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const parsed = createProductSchema.safeParse(req.body)
            if (!parsed.success) {
                res.status(400).json({
                    error: {
                        message: 'Validation failed',
                        code: 'ERR_VALID',
                        errors: parsed.error.issues.map((e) => ({
                            message: e.message
                        }))
                    }
                })
                return
            }

            const product = await this.service.create(
                parsed.data as CreateProductInput
            )
            logger.info(`Product created with code: ${parsed.data.code}`)
            res.status(201).json(product)
        } catch (error) {
            next(error)
        }
    }

    update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string)
            if (isNaN(id)) {
                res.status(400).json({
                    error: {
                        message: 'Invalid ID parameter',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const parsed = updateProductSchema.safeParse(req.body)
            if (!parsed.success) {
                res.status(400).json({
                    error: {
                        message: 'Validation failed',
                        code: 'ERR_VALID',
                        errors: parsed.error.issues.map((e) => ({
                            message: e.message
                        }))
                    }
                })
                return
            }

            const product = await this.service.update(
                id,
                parsed.data as UpdateProductInput
            )
            logger.info(`Product updated with id: ${id}`)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const id = parseInt(req.params.id as string)
            if (isNaN(id)) {
                res.status(400).json({
                    error: {
                        message: 'Invalid ID parameter',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const product = await this.service.delete(id)
            if (!product) {
                res.status(404).json({
                    error: {
                        message: `Product with ID ${id} not found`,
                        code: 'ERR_NF'
                    }
                })
                return
            }

            logger.info(`Product deleted with id: ${id}`)
            res.json(product)
        } catch (error) {
            next(error)
        }
    }
}
