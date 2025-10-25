export const fetchContainersList = async (): Promise<any> => {
    const res: any = await fetch("http://localhost:4000/containers").then(res => res.json());

    return res
}

export const fetchContainerStat = async (id: string): Promise<any> => {
    const res: any = await fetch(`http://localhost:4000/containers/${id}/stats`).then(res => res.json());
    console.log(res)
    return res
}