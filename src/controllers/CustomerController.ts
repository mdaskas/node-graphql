import type { Request, Response, NextFunction } from 'express'
import type { ICustomerService } from '@servicetypes/ICustomerService'
import type { ICustomerController } from '@controllertypes/ICustomerController'
import type {
    CreateCustomerInput,
    UpdateCustomerInput
} from '../repositories/CustomerRepository'
import { z } from 'zod'
import logger from '../utils/logger'

const createCustomerSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    billingTermsId: z.number().int().positive().optional(),
    shippingTermsId: z.number().int().positive().optional(),
    billToAddressId: z.number().int().positive().optional(),
    shipToAddressIds: z.array(z.number().int().positive()).optional()
})

const updateCustomerSchema = z.object({
    code: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    email: z.string().email('Invalid email address').optional(),
    phone: z.string().optional(),
    billingTermsId: z.number().int().positive().optional(),
    shippingTermsId: z.number().int().positive().optional(),
    billToAddressId: z.number().int().positive().optional(),
    shipToAddressIds: z.array(z.number().int().positive()).optional()
})

export class CustomerController implements ICustomerController {
    private service: ICustomerService

    constructor(service: ICustomerService) {
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

            const customers = await this.service.getAll(limit, offset)
            res.json(customers)
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

            const customer = await this.service.getById(id)
            res.json(customer)
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
            const parsed = createCustomerSchema.safeParse(req.body)
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

            const customer = await this.service.create(
                parsed.data as CreateCustomerInput
            )
            logger.info(`Customer created with code: ${parsed.data.code}`)
            res.status(201).json(customer)
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

            const parsed = updateCustomerSchema.safeParse(req.body)
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

            const customer = await this.service.update(
                id,
                parsed.data as UpdateCustomerInput
            )
            logger.info(`Customer updated with id: ${id}`)
            res.json(customer)
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

            const customer = await this.service.delete(id)
            if (!customer) {
                res.status(404).json({
                    error: {
                        message: `Customer with ID ${id} not found`,
                        code: 'ERR_NF'
                    }
                })
                return
            }

            logger.info(`Customer deleted with id: ${id}`)
            res.json(customer)
        } catch (error) {
            next(error)
        }
    }
}
