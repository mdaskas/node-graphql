import { z } from 'zod'
import { type ShippingTermsModel } from '../../generated/prisma/models'

export const shippingTermsSchema = z.object({
    id: z.number(),
    code: z.string().max(50),
    description: z.string().max(255).optional()
})

export type IShippingTermsDTO = z.infer<typeof shippingTermsSchema>

export const ShippingTermsDTO = {
    // TODO: don't need to validate here since it's already validated by Prisma, but we can use this to transform the data if needed in the future
    // toDto: (shippingTermsEntity: ShippingTermsModel): IShippingTermsDTO => {
    //     return shippingTermsSchema.parse({
    //         id: shippingTermsEntity.id,
    //         code: shippingTermsEntity.code,
    //         description: shippingTermsEntity.description
    //     })
    // }

    toDto: (shippingTermsEntity: ShippingTermsModel): IShippingTermsDTO => {
        return {
            id: shippingTermsEntity.id,
            code: shippingTermsEntity.code,
            description: shippingTermsEntity.description
        }
    }
}
