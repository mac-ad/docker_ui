
export const fetchImagesList = async (): Promise<any> => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`).then(res => res.json());

    console.log("res = ", res)

    return res
}

export const deleteImage = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
        method: "DELETE"
    })
    const data = await res.json()

    if (!res.ok) {
        // Attempt to read error message from response
        const errorData = data
        const message = errorData?.message || `Failed to delete image `
        throw new Error(message)
    }

    return data
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
    // const res = await fetch(`https://hub.docker.com/v2/search/repositories?query=${term}&page_size=${limit}`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/search?term=${term}&page=${page}&limit=${limit}`, {
        method: "GET"
    })

    const data = await res.json();

    console.log("data = ", data)

    if (!res.ok) {
        const errorData = data;
        const message = errorData?.message || `Image not found`

        throw new Error(message)
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
    // const res = await fetch(`https://hub.docker.com/v2/search/repositories?query=${term}&page_size=${limit}`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/search?term=${term}`, {
        method: "GET"
    })

    const data = await res.json();

    console.log("data = ", data)

    if (!res.ok) {
        const errorData = data;
        const message = errorData?.message || `Image not found`

        throw new Error(message)
    }

    return {
        results: data.data.results,
        hasMore: !!data.data.next
    };
}

export const getImageDetail = async (id: string) => {
    // const res = await fetch(`https://hub.docker.com/v2/search/repositories?query=${term}&page_size=${limit}`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
        method: "GET"
    })

    const data = await res.json();

    console.log("data = ", data)

    if (!res.ok) {
        const errorData = data;
        const message = errorData?.message || `Image not found`

        throw new Error(message)
    }

    return data
}