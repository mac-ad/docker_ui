import { Router, type IRouter, } from "express";
import { GetContainers, GetSpecificContainer } from "./controllers";

export const router: IRouter = Router();


router.get("/containers", GetContainers);


// get container detail
router.get(
    "/containers/:id",
    GetSpecificContainer
)


export {
    router as DockerRouter
}