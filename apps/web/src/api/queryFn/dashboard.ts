

export const fetchDashboardData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/`, {
        method: "GET"
    })
    const data = await res.json()

    if (!res.ok) {
        // Attempt to read error message from response
        const errorData = data
        const message = errorData?.message || `Failed to fetch dashboard data `
        throw new Error(message)
    }

    return data
}