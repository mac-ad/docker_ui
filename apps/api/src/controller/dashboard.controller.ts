import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/api";
import { dockerRequest } from "../utils/docker";
import { DOCKER_API } from "../constant/endpoints";
import { NetworkSchema, SystemDataUsageSchema, SystemInfoSchema } from '@repo/shared';


export const GetDashboardBriefInfo = async (req: Request, res: Response) => {
    try {

        const systemInfoRes = await dockerRequest({
            path: DOCKER_API.GET_SYSTEM_INFO()
        })

        const systemInfo = await SystemInfoSchema.parse(systemInfoRes)

        const systemDataUsageRes = await dockerRequest({
            path: DOCKER_API.GET_SYSTEM_DATA_USAGE()
        })

        const systemDataUsage = await SystemDataUsageSchema.safeParse(systemDataUsageRes)

        const networkRes = await dockerRequest({
            path: DOCKER_API.GET_NETWORKS_LIST()
        })

        const networksList = networkRes.map((item: any) => NetworkSchema.parse(item))

        const data = {
            containers: {
                total: systemInfo.Containers,
                paused: systemInfo.ContainersPaused,
                stopped: systemInfo.ContainersStopped,
                running: systemInfo.ContainersRunning
            },
            images: {
                total: systemDataUsage.data?.Images?.length,
                totalSize: systemDataUsage.data?.Images?.reduce((acc, item) => acc + (item?.Size ?? 0), 0)
            },
            volumes: {
                total: systemDataUsage.data?.Volumes?.length
            },
            networks: {
                total: networksList.length
            },
            host: {
                os: systemInfo.OperatingSystem,
                osType: systemInfo.OSType,
                cpu: systemInfo.NCPU,
                memory: systemInfo.MemTotal,
                architecture: systemInfo.Architecture
            }
        }

        successResponse({
            res,
            data,
            message: "dashboard fetched successfully!"
        })
    } catch (err: any) {
        errorResponse({
            res,
            error: err
        })
    }
}