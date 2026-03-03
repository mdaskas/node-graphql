import { z } from 'zod'
import { type ShippingTermModel } from '../../generated/prisma/models'

export const shippingTermSchema = z.object({
    id: z.number().int().positive(),
    code: z.string().max(50),
    description: z.string().max(255)
})

export type IShippingTermDTO = z.infer<typeof shippingTermSchema>

export const ShippingTermDTO = {
    toDto: (shippingTermEntity: ShippingTermModel): IShippingTermDTO => {
        return {
            id: shippingTermEntity.id,
            code: shippingTermEntity.code,
            description: shippingTermEntity.description
        }
    }
}
