import { IRouter, Router } from "express";
import { GetDashboardBriefInfo } from "../controller/dashboard.controller";

const router: IRouter = Router()

router.get("/", GetDashboardBriefInfo)

export {
    router as DashboardRoutes
}