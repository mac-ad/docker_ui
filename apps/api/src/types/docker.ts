import { Request, Response } from "express";

export type IDockerRequest = {
    path: string;
    method?: "GET" | "POST" | "DELETE";
    body?: any;
}

export type IDockerStreamRequest = IDockerRequest & {
    req: Request,
    res: Response;
}
