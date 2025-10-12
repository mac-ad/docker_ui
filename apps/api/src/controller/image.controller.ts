import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/api"
import { dockerRequest } from "../utils/docker"
import { DOCKER_API } from "../constant/endpoints"
import { IDockerContainer, ImageSchema } from "@repo/shared"


export const GetImageList = async (req: Request, res: Response) => {
    try {

        const data: IDockerContainer[] = await dockerRequest({
            path: DOCKER_API.LIST_ALL_IMAGES(),
            method: "GET"
        })

        const parsedData = data.map((i) => (ImageSchema.parse(i)))

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

    } catch (err) {
        errorResponse({
            res,
            error: err
        })
    }

}