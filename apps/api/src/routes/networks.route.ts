import { IRouter, Router } from "express";
import { GetNetworksList } from "../controller/network.controller";

const router: IRouter = Router();


router.get("/", GetNetworksList)



export {
    router as NetworksRoutes
}
