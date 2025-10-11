
export enum DockerApiKey {
    LIST_ALL_CONTAINERS = 'LIST_ALL_CONTAINERS',
    GET_SPECIFIC_CONTAINER = 'GET_SPECIFIC_CONTAINER'
}


export const DOCKER_API: Record<DockerApiKey, (data?: any) => string> = {
    [DockerApiKey.LIST_ALL_CONTAINERS]: () => `/containers/json?all=1`,
    [DockerApiKey.GET_SPECIFIC_CONTAINER]: (id: string) => `/containers/${id}/json`
}

export type IDockerApiKey = keyof typeof DOCKER_API;