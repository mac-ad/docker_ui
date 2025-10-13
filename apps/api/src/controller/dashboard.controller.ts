import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/api";
import { dockerRequest } from "../utils/docker";
import { DOCKER_API } from "../constant/endpoints";


export const GetDashboardBriefInfo = async (req: Request, res: Response) => {
    try {

        const data = await dockerRequest({
            path: DOCKER_API.GET_SYSTEM_INFO()
        })

        successResponse({
            res,
            data,
            message: "working"
        })
    } catch (err: any) {
        errorResponse({
            res,
            error: err
        })
    }
}