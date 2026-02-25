import { z } from 'zod'
import { type BillingTermsModel } from '../../generated/prisma/models'

export const billingTermsSchema = z.object({
    id: z.number(),
    code: z.string().max(50),
    description: z.string().max(255).optional()
})

export type IBillingTermsDTO = z.infer<typeof billingTermsSchema>

export const BillingTermsDTO = {
    // TODO: don't need to validate here since it's already validated by Prisma, but we can use this to transform the data if needed in the future
    // toDto: (billingTermsEntity: BillingTermsModel): IBillingTermsDTO => {
    //     return billingTermsSchema.parse({
    //         id: billingTermsEntity.id,
    //         code: billingTermsEntity.code,
    //         description: billingTermsEntity.description
    //     })
    // }

    toDto: (billingTermsEntity: BillingTermsModel): IBillingTermsDTO => {
        return {
            id: billingTermsEntity.id,
            code: billingTermsEntity.code,
            description: billingTermsEntity.description
        }
    }
}
