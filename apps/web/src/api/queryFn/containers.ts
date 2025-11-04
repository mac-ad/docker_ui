import { ContainerActionType } from "@repo/shared";

export const fetchContainersList = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers`)

    if (!res.ok) {
        throw await res.json();
    }

    return await res.json()
}

export const fetchContainerStat = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}/stats`);

    if (!res.ok) {
        throw await res.json();
    }

    return await res.json()
}

export const fetchContainerProcess = async (id: string): Promise<any> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}/process`);

    if (!res.ok) {
        throw await res.json();
    }

    return await res.json()
}

export const performContainerAction = async ({
    id,
    action
}: {
    id: string;
    action: ContainerActionType
}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action
        })
    })


    if (!res.ok) {
        throw await res.json();
    }

    return await res.json();
}

export const fetchContainerDetail = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}`);

    if (!res.ok) {
        throw res.json();
    }


    return res.json()
}