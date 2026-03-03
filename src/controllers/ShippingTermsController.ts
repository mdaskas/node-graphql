import type { Request, Response, NextFunction } from 'express'
import type { IShippingTermsService } from '@servicetypes/IShippingTermsService'
import type { IShippingTermsController } from '@controllertypes/IShippingTermsController'
import type {
    CreateShippingTermsInput,
    UpdateShippingTermsInput
} from '../repositories/ShippingTermsRepository'
import { z } from 'zod'
import logger from '../utils/logger'

const createShippingTermsSchema = z.object({
    code: z.string().min(1, 'Code is required').max(50),
    description: z.string().min(1, 'Description is required').max(255)
})

const updateShippingTermsSchema = z.object({
    code: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(255).optional()
})

export class ShippingTermsController implements IShippingTermsController {
    private service: IShippingTermsService

    constructor(service: IShippingTermsService) {
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

            const shippingTerms = await this.service.getAll(limit, offset)
            res.json(shippingTerms)
        } catch (error) {
            next(error)
        }
    }

    getByCode = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const code = req.params.code as string
            if (!code) {
                res.status(400).json({
                    error: {
                        message: 'Code parameter is required',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const shippingTerm = await this.service.getByCode(code)
            res.json(shippingTerm)
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
            const parsed = createShippingTermsSchema.safeParse(req.body)
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

            const shippingTerm = await this.service.create(
                parsed.data as CreateShippingTermsInput
            )
            logger.info(`Shipping term created with code: ${parsed.data.code}`)
            res.status(201).json(shippingTerm)
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
            const code = req.params.code as string
            if (!code) {
                res.status(400).json({
                    error: {
                        message: 'Code parameter is required',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const parsed = updateShippingTermsSchema.safeParse(req.body)
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

            const shippingTerm = await this.service.update(
                code,
                parsed.data as UpdateShippingTermsInput
            )
            logger.info(`Shipping term updated with code: ${code}`)
            res.json(shippingTerm)
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
            const code = req.params.code as string
            if (!code) {
                res.status(400).json({
                    error: {
                        message: 'Code parameter is required',
                        code: 'ERR_VALID'
                    }
                })
                return
            }

            const shippingTerm = await this.service.delete(code)
            if (!shippingTerm) {
                res.status(404).json({
                    error: {
                        message: `Shipping term with code ${code} not found`,
                        code: 'ERR_NF'
                    }
                })
                return
            }

            logger.info(`Shipping term deleted with code: ${code}`)
            res.json(shippingTerm)
        } catch (error) {
            next(error)
        }
    }
}
