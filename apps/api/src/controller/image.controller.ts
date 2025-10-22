import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/api"
import { dockerRequest, dockerStreamRequest } from "../utils/docker"
import { DOCKER_API, DockerApiKey } from "../constant/endpoints"
import { IDockerContainer, IListImageSchema, ListImageSchema } from "@repo/shared"

export const GetImageList = async (req: Request, res: Response) => {
    try {

        const { page = 1, search = '', limit = 10 } = req.parsedQuery;
        console.log(limit)

        const queryParams: string = `?page=${page}&limit=${limit}&search=${search}`;



        const data: IListImageSchema[] = await dockerRequest({
            path: DOCKER_API.LIST_ALL_IMAGES(),
            method: "GET"
        })

        const parsedData = data.map((i) => (ListImageSchema.parse(i)))

        successResponse({
            data: parsedData,
            res,
            message: "Images fetched successfully"
        })

    } catch (err: any) {
        errorResponse({
            res,
            error: err
        })
    }
}

export const GetImageDetail = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const data = await dockerRequest({
            path: DOCKER_API.GET_SPECIFIC_IMAGE(id)
        })



        successResponse({
            data,
            message: "Image detail fetched successfully",
            res
        })

    } catch (err: any) {
        errorResponse({
            res,
            error: err,
            status: err.statusCode ?? null,
            message: err.message ?? null
        })
    }

}

export const DeleteImage = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const data = await dockerRequest({
            path: DOCKER_API.DELETE_IMAGE(id),
            method: "DELETE"
        })

        successResponse({
            res,
            data,
            message: "Image Deleted successfully",
        })
    } catch (err: any) {
        errorResponse({
            res,
            error: err,
            message: err.message ?? null,
            status: err.statusCode ?? null
        })
    }
}

export const CreateImage = (req: Request, res: Response) => {

    const { imageName, tag } = req.query

    const query: string = `fromImage=${imageName}&tag=${tag}`;

    return dockerStreamRequest({
        path: DOCKER_API.CREATE_IMAGE(query),
        req,
        res,
        method: "POST"
    })
}


export const SearchImage = async (req: Request, res: Response) => {
    try {

        const { term } = req.parsedQuery;

        const query: string = `term=${term}`

        console.log('search path', DOCKER_API.SEARCH_IMAGE(query))

        const data = await dockerRequest({
            path: DOCKER_API.SEARCH_IMAGE(query)
        })

        successResponse({
            res,
            data,
            message: "Image search complete"
        })
    } catch (err: any) {
        errorResponse({
            res,
            error: err,
            message: err.message ?? null,
            status: err.statusCode ?? null
        })
    }
}