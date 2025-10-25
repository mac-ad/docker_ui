import { Router, type IRouter, } from "express";
import { GetContainers, GetContainerStats, GetSpecificContainer } from "../controller/container.controller";

export const router: IRouter = Router();

// get list of containers
router.get("/", GetContainers);

// get container detail
router.get(
    "/:id",
    GetSpecificContainer
)

// stream stat of a container
router.get("/:id/stats", GetContainerStats)


export {
    router as DockerRouter
}