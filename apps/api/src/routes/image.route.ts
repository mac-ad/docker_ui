import { IRouter, Router } from "express";
import { GetImageList, GetImageDetail, DeleteImage, CreateImage, SearchImage } from "../controller/image.controller";
import { paginationSchema } from "@repo/shared/src/types/pagination";
import { validateQuery } from "../middleware/validateQuery";

import { z } from 'zod';

const router: IRouter = Router();



// create image
router.get("/create", CreateImage)

// search image
const searchImageQuery = paginationSchema().extend({
    term: z.string().min(1)
})
router.get(
    "/search",
    validateQuery(searchImageQuery),
    SearchImage
)


// get all images
const getImageListQuery = paginationSchema().extend({})
router.get("/", validateQuery(getImageListQuery), GetImageList)
router.get("/:id", GetImageDetail)
router.delete("/:id", DeleteImage)


export {
    router as ImageRoutes
}
