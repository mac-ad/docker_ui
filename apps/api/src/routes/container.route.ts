import { Router, type IRouter, } from "express";
import { GetContainerLogs, GetContainers, GetContainerStats, GetProcessesInContainer, GetSpecificContainer, PerformActionOnContainer } from "../controller/container.controller";

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
router.get("/:id/process", GetProcessesInContainer)
router.post("/:id", PerformActionOnContainer)
router.get("/:id/logs", GetContainerLogs);


export {
    router as DockerRouter
}