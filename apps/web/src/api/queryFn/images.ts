

export const fetchImagesList = async () => {
    console.log("fetched images list")
    const res = await fetch("http://localhost:4000/images").then(res => res.json());

    console.log("res = ", res)

    return res
}

export const deleteImage = async (id: string) => {

    const res = await fetch(`http://localhost:4000/images/${id}`, {
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