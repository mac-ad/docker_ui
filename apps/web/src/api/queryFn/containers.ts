import { ContainerActionType } from "@repo/shared";

export const fetchContainersList = async (): Promise<any> => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers`).then(res => res.json());
    return res
}

export const fetchContainerStat = async (id: string): Promise<any> => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}/stats`).then(res => res.json());
    return res
}

export const fetchContainerProcess = async (id: string): Promise<any> => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}/process`).then(res => res.json());
    return res
}

export const performContainerAction = async ({
    id,
    action
}: {
    id: string;
    action: ContainerActionType
}): Promise<any> => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action
        })
    })
    return res;
}

export const fetchContainerDetail = async (id: string) => {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/containers/${id}`).then(res => res.json());
    return res
}