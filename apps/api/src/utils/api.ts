import { Response } from "express"

export const successResponse = ({
    status = 200,
    data,
    res,
    message
}: {
    status?: number;
    data?: any;
    res: Response;
    message?: string;
}) => {

    const msg = message || "Data fetched successfully"
    const respData = data || null

    res.status(status).send({
        data: respData,
        message
    })
}

export const errorResponse = ({
    status = 500,
    data,
    res,
    message
}: {
    status?: number;
    data?: any;
    res: Response;
    message?: string;
}) => {

    const msg = message || "Internal server error"
    const st = status || 500
    const respData = data || null


    res.status(st).send({
        data: respData,
        message: msg
    })
}