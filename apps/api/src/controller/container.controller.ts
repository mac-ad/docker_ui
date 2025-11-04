import { Request, Response } from 'express'
import { CONTAINER_ACTION, ContainerActionType, ContainerDetail, ContainerProcesses, ContainerStat, createContainerSchema, DockerContainerSchema, IDockerContainer, IGetAllContainersResponse } from "@repo/shared";
import { dockerRequest, dockerStreamRequest } from "../utils/docker";
import { errorResponse, successResponse } from "../utils/api";
import { DOCKER_API, DockerApiKey } from "../constant/endpoints";
import { z } from 'zod';


export const CreateContainer = async (req: Request, res: Response) => {
    try {

        const bodyData = req.parsedBody as z.infer<typeof createContainerSchema>

        successResponse({
            res,
            status: 201,
            data: {
                res: "ok"
            },
            message: "Container Created Successfully!!"
        })

    } catch (err) {
        errorResponse({
            res,
            error: err
        })
    }
}


export const GetContainers = async (req: Request, res: Response): Promise<void> => {
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
    } catch (err: any) {
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

        const dockerRes = await dockerRequest({
            path: DOCKER_API.GET_SPECIFIC_CONTAINER(id)
        })

        const data = ContainerDetail.parse(dockerRes)

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

        const dockerRes = await dockerRequest({
            path: DOCKER_API[DockerApiKey.GET_CONTAINER_STAT](id)
        })

        const data = ContainerStat.parse(dockerRes)

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

        const dockerRes = await dockerRequest({
            path: DOCKER_API[DockerApiKey.GET_CONTAINER_PROCESS](id)
        })

        const data = ContainerProcesses.parse(dockerRes)

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


// TO DO: make this endpoints typesafe later
export const PerformActionOnContainer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const { action } = req.body

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


        const data = await dockerRequest({
            path,
            method: "POST"
        })

        successResponse({
            res,
            message: "Container actions executed",
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
