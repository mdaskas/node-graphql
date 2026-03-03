import type { Request, Response, NextFunction } from 'express'
import type { IProductCategoryService } from '@servicetypes/IProductCategoryService'
import type { IProductCategoryController } from '@controllertypes/IProductCategoryController'
import type {
    CreateProductCategoryInput,
    UpdateProductCategoryInput
} from '../repositories/ProductCategoryRepository'
import { z } from 'zod'
import logger from '../utils/logger'

const createProductCategorySchema = z.object({
    code: z.string().min(1, 'Code is required').max(50),
    description: z.string().min(1, 'Description is required').max(255)
})

const updateProductCategorySchema = z.object({
    code: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(255).optional()
})

export class ProductCategoryController implements IProductCategoryController {
    private service: IProductCategoryService

    constructor(service: IProductCategoryService) {
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

            const categories = await this.service.getAll(limit, offset)
            res.json(categories)
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

            const category = await this.service.getById(id)
            res.json(category)
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
            const parsed = createProductCategorySchema.safeParse(req.body)
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

            const category = await this.service.create(
                parsed.data as CreateProductCategoryInput
            )
            logger.info(
                `Product category created with code: ${parsed.data.code}`
            )
            res.status(201).json(category)
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

            const parsed = updateProductCategorySchema.safeParse(req.body)
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

            const category = await this.service.update(
                id,
                parsed.data as UpdateProductCategoryInput
            )
            logger.info(`Product category updated with id: ${id}`)
            res.json(category)
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

            const category = await this.service.delete(id)
            if (!category) {
                res.status(404).json({
                    error: {
                        message: `Product category with ID ${id} not found`,
                        code: 'ERR_NF'
                    }
                })
                return
            }

            logger.info(`Product category deleted with id: ${id}`)
            res.json(category)
        } catch (error) {
            next(error)
        }
    }
}
