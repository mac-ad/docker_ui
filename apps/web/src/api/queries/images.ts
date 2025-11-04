import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteImage, fetchImagesList, getImageDetail, searchImages } from "../queryFn/images"
import { IDeleteImageResponse, IGetImageListReponse } from "@repo/shared"
import { IApiErrorResponseBase } from "../../../../../packages/shared/src/types/api"


export const useImageQuery = () => {
    return useQuery<IGetImageListReponse, IApiErrorResponseBase>({
        queryKey: ['imagesList'],
        queryFn: fetchImagesList
    })
}

export const useDeleteImageMutation = () => {

    const queryClient = useQueryClient();

    const successHandler = () => {
        queryClient.invalidateQueries(["imagesList"])
    }

    return useMutation<
        IDeleteImageResponse,
        IApiErrorResponseBase,
        string
    >({
        mutationFn: (id: string) => deleteImage(id),
        onError: () => { },
        onSuccess: successHandler
    })
}

export const useSearchImagesQuery = ({
    term,
    page,
    limit
}: {
    term: string;
    page?: number;
    limit?: number
}) => {
    return useQuery({
        queryKey: [`search-images-${term}-${page}-${limit}`],
        queryFn: () => searchImages({
            term,
            page,
            limit
        }),
        enabled: !!term,
        refetchOnWindowFocus: false
    })
}

export const useImageDetail = ({
    id
}: {
    id: string
}) => {
    return useQuery({
        queryKey: [`image-detail-${id}`],
        queryFn: () => getImageDetail(id)
    })
}