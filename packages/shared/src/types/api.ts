import { nullable, z } from 'zod';

export const ApiSuccessResponseBase = z.object({
    message: z.string()
})

export const ApiErrorResponseBase = z.object({
    message: z.string(),
    error: z.any(),
    data: z.any().nullable()
})

export type IApiErrorResponseBase = z.infer<typeof ApiErrorResponseBase>