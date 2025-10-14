import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteImage, fetchImagesList } from "../queryFn/images"
import { toast } from "sonner"


export const useImageQuery = () => {
    return useQuery({
        queryKey: ['imagesList'],
        queryFn: fetchImagesList
    })
}

export const useDeleteImageMutation = ({
    onSuccess = null
}: {
    onSuccess?: null | (() => void)
}) => {

    const queryClient = useQueryClient();

    const successHandler = (data: any) => {
        if (onSuccess) {
            onSuccess()
        }
        queryClient.invalidateQueries(["imagesList"])
        const message = data?.message ?? "Image deleted successfully!"
        toast.success(message)
    }


    return useMutation({
        mutationFn: (id: string) => deleteImage(id),
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete image")
        },
        onSuccess: successHandler
    })
}