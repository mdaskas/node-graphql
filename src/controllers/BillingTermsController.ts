import type { Request, Response, NextFunction } from 'express'
import type { IBillingTermsService } from '@servicetypes/IBillingTermsService'
import type { IBillingTermsController } from '@controllertypes/IBillingTermsController'
import type {
    CreateBillingTermsInput,
    UpdateBillingTermsInput
} from '../repositories/BillingTermsRepository'
import { z } from 'zod'
import logger from '../utils/logger'

const createBillingTermsSchema = z.object({
    code: z.string().min(1, 'Code is required').max(50),
    description: z.string().min(1, 'Description is required').max(255),
    dueDays: z.number().int().positive('Due days must be a positive integer')
})

const updateBillingTermsSchema = z.object({
    code: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(255).optional(),
    dueDays: z.number().int().positive().optional()
})

export class BillingTermsController implements IBillingTermsController {
    private service: IBillingTermsService

    constructor(service: IBillingTermsService) {
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

            const billingTerms = await this.service.getAll(limit, offset)
            res.json(billingTerms)
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

            const billingTerm = await this.service.getByCode(code)
            res.json(billingTerm)
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
            const parsed = createBillingTermsSchema.safeParse(req.body)
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

            const billingTerm = await this.service.create(
                parsed.data as CreateBillingTermsInput
            )
            logger.info(`Billing term created with code: ${parsed.data.code}`)
            res.status(201).json(billingTerm)
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

            const parsed = updateBillingTermsSchema.safeParse(req.body)
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

            const billingTerm = await this.service.update(
                code,
                parsed.data as UpdateBillingTermsInput
            )
            logger.info(`Billing term updated with code: ${code}`)
            res.json(billingTerm)
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

            const billingTerm = await this.service.delete(code)
            if (!billingTerm) {
                res.status(404).json({
                    error: {
                        message: `Billing term with code ${code} not found`,
                        code: 'ERR_NF'
                    }
                })
                return
            }

            logger.info(`Billing term deleted with code: ${code}`)
            res.json(billingTerm)
        } catch (error) {
            next(error)
        }
    }
}
