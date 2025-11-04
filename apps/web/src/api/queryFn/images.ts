export const fetchImagesList = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`)

    console.log("res", res)

    if (!res.ok) {
        throw await res.json();
    }


    return await res.json()
}

export const deleteImage = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
        method: "DELETE"
    })
    const data = await res.json()

    if (!res.ok) {
        // // Attempt to read error message from response
        // const errorData = data
        // const message = errorData?.message || `Failed to delete image `
        // throw new Error(message)
        throw data
    }

    return data;
}

export const searchImages = async ({
    term,
    page = 1,
    limit = 10
}: {
    term: string;
    page?: number;
    limit?: number
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/search?term=${term}&page=${page}&limit=${limit}`, {
        method: "GET"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return {
        results: data.data.results,
        hasMore: !!data.data.next
    };
}

export const getTags = async ({
    term
}: {
    term: string
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/search?term=${term}`, {
        method: "GET"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return {
        results: data.data.results,
        hasMore: !!data.data.next
    };
}

export const getImageDetail = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
        method: "GET"
    })

    const data = await res.json();

    if (!res.ok) {
        throw data
    }

    return data
}