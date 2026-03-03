import type { Request, Response, NextFunction } from 'express'

export interface IShippingTermController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>
    getByCode(req: Request, res: Response, next: NextFunction): Promise<void>
    create(req: Request, res: Response, next: NextFunction): Promise<void>
    update(req: Request, res: Response, next: NextFunction): Promise<void>
    delete(req: Request, res: Response, next: NextFunction): Promise<void>
}
