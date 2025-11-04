import { IRouter, Router } from "express";
import { GetImageList, GetImageDetail, DeleteImage, CreateImage, SearchImage, GetTags, GetImageHistory } from "../controller/image.controller";
import { validateQuery } from "../middleware/validateQuery";
import { getImageListQuery, getTagsQuery, searchImageQuery } from "@repo/shared";

const router: IRouter = Router();

// create image
router.get("/create", CreateImage)
router.get(
    "/search",
    validateQuery(searchImageQuery),
    SearchImage
)
router.get(
    "/tag",
    validateQuery(getTagsQuery),
    GetTags
)
router.get("/", validateQuery(getImageListQuery), GetImageList)
router.get("/:id", GetImageDetail)
router.delete("/:id", DeleteImage)
router.get("/:name/history", GetImageHistory)

export {
    router as ImageRoutes
}
