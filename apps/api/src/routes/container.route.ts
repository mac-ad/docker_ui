import { Router, type IRouter, } from "express";
import { GetContainers, GetSpecificContainer } from "../controller/container.controller";

export const router: IRouter = Router();

// get list of containers
router.get("/", GetContainers);

// get container detail
router.get(
    "/:id",
    GetSpecificContainer
)


export {
    router as DockerRouter
}