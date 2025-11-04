import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchContainerDetail, fetchContainerProcess, fetchContainersList, fetchContainerStat, performContainerAction } from "../queryFn/containers"
import { ContainerActionType, IGetAllContainersResponse, IGetContainerDetailResponse, IGetContainerProcessesResponse, IGetContainerStatsResponse } from "@repo/shared"
import { toast } from "sonner"
import { IApiErrorResponseBase } from "../../../../../packages/shared/src/types/api"

export const useContainersQuery = () => {
    return useQuery<IGetAllContainersResponse, IApiErrorResponseBase>({
        queryKey: ['containersList'],
        queryFn: fetchContainersList
    })
}

export const useContainerDetailQuery = (id: string) => {
    return useQuery<IGetContainerDetailResponse, IApiErrorResponseBase>({
        queryKey: [`container-${id}`],
        queryFn: () => fetchContainerDetail(id)
    })
}

export const useContainerStat = ({ id, refresh_interval, enabled }: {
    id: string,
    refresh_interval: number
    enabled: boolean;
}) => {
    return useQuery<IGetContainerStatsResponse, IApiErrorResponseBase>({
        queryKey: [`containerStat-${id}`],
        queryFn: () => fetchContainerStat(id),
        refetchInterval: refresh_interval, // fetch every 5 seconds
        refetchIntervalInBackground: true, // keeps refetching even if tab is inactive
        enabled
    })
}

export const useContainerProcess = ({
    id
}: {
    id: string
}) => {
    return useQuery<IGetContainerProcessesResponse, IApiErrorResponseBase>({
        queryKey: [`containerProcess-${id}`],
        queryFn: () => fetchContainerProcess(id)
    })
}

// TO DO: make this endpoints typesafe later
export const useContainerActionMutation = (id: string, action: ContainerActionType | null) => {

    const queryClient = useQueryClient();

    const successHandler = async (data: any) => {
        const res = await data?.json()
        console.log("res = ", res)
        queryClient.invalidateQueries([`container-${id}`])
        queryClient.invalidateQueries([`containerProcess-${id}`])
        toast.success(action ? `Container ${action}ED` : "Action ran successfully!!")
    }


    return useMutation({
        mutationFn: ({
            id,
            action
        }: {
            id: string;
            action: ContainerActionType;
        }) => performContainerAction({
            id,
            action
        }),
        onSuccess: successHandler,
        onError: () => {
            toast.error("Action failed to execute")
        }
    })
}