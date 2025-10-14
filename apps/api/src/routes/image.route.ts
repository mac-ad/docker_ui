import { IRouter, Router } from "express";
import { GetImageList, GetImageDetail, DeleteImage } from "../controller/image.controller";
import { paginationSchema } from "@repo/shared/src/types/pagination";
import { validateQuery } from "../middleware/validateQuery";

const router: IRouter = Router();


const getImageListQuery = paginationSchema().extend({})
// get all images
router.get("/", validateQuery(getImageListQuery), GetImageList)
router.get("/:id", GetImageDetail)
router.delete("/:id", DeleteImage)


export {
    router as ImageRoutes
}
