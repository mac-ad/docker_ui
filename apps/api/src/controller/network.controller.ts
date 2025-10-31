import { Request, Response } from "express";
import { dockerRequest } from "../utils/docker";
import { errorResponse, successResponse } from "../utils/api";
import { NetworkSchema } from "@repo/shared";
import { DOCKER_API } from "../constant/endpoints";



export const GetNetworksList = async (req: Request, res: Response) => {
    try {
        const networksRes = await dockerRequest({
            path: DOCKER_API.GET_NETWORKS_LIST(),
            method: "GET"
        })

        const networkData = networksRes.map((item: any) => NetworkSchema.parse(item))

        successResponse({
            data: networkData,
            res,
            message: "Networks fetched successfully"
        })

    } catch (err: any) {
        console.log(err)
        errorResponse({
            res,
            error: err
        })
    }
}
