import { useQuery } from "@tanstack/react-query"
import { fetchDashboardData } from "../queryFn/dashboard"


export const useDashboardQuery = () => {
    return useQuery({
        queryKey: ['dashboard-data'],
        queryFn: fetchDashboardData
    })
}