import { IRouter, Router } from "express";
import { GetImageList, GetImageDetail } from "../controller/image.controller";

const router: IRouter = Router();

// get all images
router.get("/", GetImageList)
router.get("/:id", GetImageDetail)


export {
    router as ImageRoutes
}
