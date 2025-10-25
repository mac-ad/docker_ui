import { useQuery } from "@tanstack/react-query"
import { fetchContainersList, fetchContainerStat } from "../queryFn/containers"

export const useContainersQuery = () => {
    return useQuery({
        queryKey: ['containersList'],
        queryFn: fetchContainersList
    })
}

export const useContainerStat = ({ id }: {
    id: string
}) => {
    return useQuery({
        queryKey: ['containerStat'],
        queryFn: () => fetchContainerStat(id),
        refetchInterval: 5000, // fetch every 5 seconds
        refetchIntervalInBackground: true, // keeps refetching even if tab is inactive
    })
}