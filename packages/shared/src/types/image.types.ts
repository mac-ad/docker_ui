import { ApiSuccessResponseBase } from "./api";
import { paginationSchema } from "./pagination"
import { z } from 'zod';

export const searchImageQuery = paginationSchema().extend({
    term: z.string().min(1)
})


export const getTagsQuery = paginationSchema().extend({
    term: z.string().min(1)
})

export const getImageListQuery = paginationSchema().extend({})


export const ListImageSchema = z.object({
    Id: z.string(),
    ParentId: z.string(),
    RepoTags: z.array(z.string().optional()).nullable(),
    RepoDigests: z.array(z.string().optional()).nullable(),
    Created: z.number(),
    Size: z.number(),
    SharedSize: z.number(),
    Labels: z.record(z.string(), z.string()).nullable(),
    Containers: z.number(),
    Manifests: z.any(),
})

export type IListImageSchema = z.infer<typeof ListImageSchema>


export const GetImageListResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
    data: z.array(ListImageSchema)
})

export type IGetImageListReponse = z.infer<typeof GetImageListResponseSchema>


export const DeleteImageData = z.array(
    z.object({
        Untagged: z.string().optional(),
        Deleted: z.string().optional(),
    }),
)

export type IDeleteImageData = z.infer<typeof DeleteImageData>

export const DeleteImageResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
    data: DeleteImageData
})

export type IDeleteImageResponse = z.infer<typeof DeleteImageResponseSchema>