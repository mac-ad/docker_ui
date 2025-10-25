import { Request, Response } from 'express'
import { DockerContainerSchema, IDockerContainer } from "@repo/shared";
import { dockerRequest, dockerStreamRequest } from "../utils/docker";
import { errorResponse, successResponse } from "../utils/api";
import { DOCKER_API, DockerApiKey } from "../constant/endpoints";

export const GetContainers = async (req: Request, res: Response) => {
    try {
        const data: IDockerContainer[] = await dockerRequest({
            path: DOCKER_API.LIST_ALL_CONTAINERS()
        });

        console.log("Data = ", data)
        const refinedData = data.map((i: any) => (DockerContainerSchema.parse(i)))

        successResponse({
            data: refinedData,
            message: "Containers list fetched successfully",
            res
        })
    } catch (err) {
        errorResponse({
            message: "Failed fetching containers list",
            res,
            error: err
        })
    }
}

export const GetSpecificContainer = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const data = await dockerRequest({
            path: DOCKER_API.GET_SPECIFIC_CONTAINER(id)
        })

        successResponse({
            data,
            message: "Container fetched succesfully",
            res
        })

    } catch (err) {
        errorResponse({
            message: "Failed to fetch container",
            res,
            error: err
        })
    }
}

export const GetContainerStats = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        // return dockerStreamRequest({
        //     path: DOCKER_API[DockerApiKey.GET_CONTAINER_STAT](id),
        //     req,
        //     res
        // })

        console.log("fetchiun container stats", id)

        const data = await dockerRequest({
            path: DOCKER_API[DockerApiKey.GET_CONTAINER_STAT](id)
        })

        successResponse({
            res,
            message: "Container stat fetched",
            data
        })

    } catch (err: any) {
        errorResponse({
            message: "Failed to fetch container",
            res,
            error: err
        })
    }
}