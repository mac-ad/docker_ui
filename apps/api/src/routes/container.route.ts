import { Router, type IRouter, } from "express";
import {
    GetContainerLogs,
    GetContainers,
    GetContainerStats,
    GetProcessesInContainer,
    GetSpecificContainer,
    PerformActionOnContainer,
    CreateContainer
} from "../controller/container.controller";
import { validateBody } from "../middleware/validateBody";
import { createContainerSchema } from "@repo/shared";

export const router: IRouter = Router();


router.post(
    "/",
    validateBody(createContainerSchema),
    CreateContainer
);
router.get("/", GetContainers);
router.get(
    "/:id",
    GetSpecificContainer
)
router.get("/:id/stats", GetContainerStats)
router.get("/:id/process", GetProcessesInContainer)
router.post("/:id", PerformActionOnContainer)
router.get("/:id/logs", GetContainerLogs);


export {
    router as DockerRouter
}