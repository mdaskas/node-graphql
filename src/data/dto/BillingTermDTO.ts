import { z } from 'zod'
import { type BillingTermModel } from '../../generated/prisma/models'

export const billingTermSchema = z.object({
    id: z.number().int().positive(),
    code: z.string().max(50),
    description: z.string().max(255),
    dueDays: z.number().int().positive()
})

export type IBillingTermDTO = z.infer<typeof billingTermSchema>

export const BillingTermDTO = {
    toDto: (billingTermEntity: BillingTermModel): IBillingTermDTO => {
        return {
            id: billingTermEntity.id,
            code: billingTermEntity.code,
            description: billingTermEntity.description,
            dueDays: billingTermEntity.dueDays
        }
    }
}
