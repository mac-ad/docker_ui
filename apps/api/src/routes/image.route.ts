import { IRouter, Router } from "express";
import { GetImageList, GetImageDetail, DeleteImage, CreateImage, SearchImage, GetTags, GetImageHistory } from "../controller/image.controller";
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

const getTagsQuery = paginationSchema().extend({
    term: z.string().min(1)
})
router.get(
    "/tag",
    validateQuery(getTagsQuery),
    GetTags
)


// get all images
const getImageListQuery = paginationSchema().extend({})
router.get("/", validateQuery(getImageListQuery), GetImageList)
router.get("/:id", GetImageDetail)
router.delete("/:id", DeleteImage)

// get history of image
router.get("/:name/history", GetImageHistory)

export {
    router as ImageRoutes
}
