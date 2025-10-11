import { Request, Response } from 'express'
import { DockerContainerSchema, IDockerContainer } from "@repo/shared";
import { dockerRequest } from "./utils/docker";
import { errorResponse, successResponse } from "./utils/api";
import { DOCKER_API } from "./constant/endpoints";

export const GetContainers = async (req: Request, res: Response) => {
    try {
        const data = await dockerRequest({
            path: DOCKER_API.LIST_ALL_CONTAINERS()
        });

        const refinedData: IDockerContainer[] = data.map((i: any) => (DockerContainerSchema.parse(i)))

        successResponse({
            data: refinedData,
            message: "Containers list fetched successfully",
            res
        })
    } catch (err) {
        errorResponse({
            message: "Failed fetching containers list",
            res
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
            res
        })
    }
}