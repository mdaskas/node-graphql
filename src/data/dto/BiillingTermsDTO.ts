import { z } from 'zod'
import { type BillingTermsModel } from '../../generated/prisma/models'

export const billingTermsSchema = z.object({
    code: z.string().max(50),
    description: z.string().max(255),
    dueDays: z.number().int().positive()
})

export type IBillingTermsDTO = z.infer<typeof billingTermsSchema>

export const BillingTermsDTO = {
    // TODO: don't need to validate here since it's already validated by Prisma, but we can use this to transform the data if needed in the future
    // toDto: (billingTermsEntity: BillingTermsModel): IBillingTermsDTO => {
    //     return billingTermsSchema.parse({
    //         id: billingTermsEntity.id,
    //         code: billingTermsEntity.code,
    //         description: billingTermsEntity.description,
    //         dueDays: billingTermsEntity.dueDays
    //     })
    // }

    toDto: (billingTermsEntity: BillingTermsModel): IBillingTermsDTO => {
        return {
            code: billingTermsEntity.code,
            description: billingTermsEntity.description,
            dueDays: billingTermsEntity.dueDays
        }
    }
}
