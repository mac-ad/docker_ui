import { Request, Response } from 'express'
import { CONTAINER_ACTION, ContainerActionType, DockerContainerSchema, IDockerContainer } from "@repo/shared";
import { dockerRequest, dockerStreamRequest } from "../utils/docker";
import { errorResponse, successResponse } from "../utils/api";
import { DOCKER_API, DockerApiKey } from "../constant/endpoints";

export const GetContainers = async (req: Request, res: Response) => {
    try {
        const data: IDockerContainer[] = await dockerRequest({
            path: DOCKER_API.LIST_ALL_CONTAINERS()
        });

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

export const GetProcessesInContainer = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        // return dockerStreamRequest({
        //     path: DOCKER_API[DockerApiKey.GET_CONTAINER_STAT](id),
        //     req,
        //     res
        // })

        const data = await dockerRequest({
            path: DOCKER_API[DockerApiKey.GET_CONTAINER_PROCESS](id)
        })

        successResponse({
            res,
            message: "Container processes fetched",
            data
        })
    } catch (err: any) {
        errorResponse({
            message: "Failed to fetch processes inside container",
            res,
            error: err
        })
    }

}


export const PerformActionOnContainer = async (req: Request, res: Response) => {
    try {
        console.log("performing")
        const { id } = req.params;
        console.log(req.body)
        const { action } = req.body

        console.log("action", action)



        let path: string | null = null;

        switch (action) {
            case CONTAINER_ACTION.START:
                path = DOCKER_API[DockerApiKey.START_CONTAINER](id);
                break;

            case CONTAINER_ACTION.STOP:
                path = DOCKER_API[DockerApiKey.STOP_CONTAINER](id);
                break;

            case CONTAINER_ACTION.RESTART:
                path = DOCKER_API[DockerApiKey.RESTART_CONTAINER](id);
                break;

            case CONTAINER_ACTION.REFRESH:
                path = DOCKER_API[DockerApiKey.RESTART_CONTAINER](id);
                break;

            case CONTAINER_ACTION.PAUSE:
                path = DOCKER_API[DockerApiKey.PAUSE_CONTAINER](id);
                break;

            case CONTAINER_ACTION.UNPAUSE:
                path = DOCKER_API[DockerApiKey.UNPAUSE_CONTAINER](id);
                break;

            default:
                path = null;
                break;
        }

        if (!path) {
            errorResponse({
                message: "Wrong action code",
                res,
                error: null
            })
            return
        }

        console.log("path", path)

        const data = await dockerRequest({
            path,
            method: "POST"
        })
        console.log(data)

        successResponse({
            res,
            message: "Container processes fetched",
            data
        })
    } catch (err: any) {
        errorResponse({
            message: "Failed to fetch processes inside container",
            res,
            error: err
        })
    }

}

export const GetContainerLogs = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;


        return dockerStreamRequest({
            path: DOCKER_API[DockerApiKey.GET_CONTAINER_LOGS](id),
            res,
            req,
        })

        // const data = await dockerRequest({
        //     path: DOCKER_API[DockerApiKey.GET_CONTAINER_LOGS](id),
        // })

        // successResponse({
        //     res,
        //     message: "Container logs fetched",
        //     data
        // })
    } catch (err: any) {
        errorResponse({
            message: "Failed to fetch logs of container",
            res,
            error: err
        })
    }

}
