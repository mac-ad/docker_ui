
export enum DockerApiKey {
    LIST_ALL_CONTAINERS = 'LIST_ALL_CONTAINERS',
    GET_SPECIFIC_CONTAINER = 'GET_SPECIFIC_CONTAINER',
    GET_CONTAINER_STAT = 'GET_CONTAINER_STAT',

    LIST_ALL_IMAGES = 'LIST_ALL_IMAGES',
    GET_SPECIFIC_IMAGE = "GET_SPECIFIC_IMAGE",
    DELETE_IMAGE = "DELETE_IMAGE",
    CREATE_IMAGE = 'CREATE_IMAGE',
    SEARCH_IMAGE = 'SEARCH_IMAGE',


    GET_IMAGE_HISTORY = 'GET_IMAGE_HISTORY',
    GET_SYSTEM_INFO = "GET_SYSTEM_INFO",
}


export const DOCKER_API: Record<DockerApiKey, (data?: any) => string> = {
    [DockerApiKey.LIST_ALL_CONTAINERS]: () => `/containers/json?all=1`,
    [DockerApiKey.GET_SPECIFIC_CONTAINER]: (id: string) => `/containers/${id}/json`,
    [DockerApiKey.GET_CONTAINER_STAT]: (id: string) => `/containers/${id}/stats?stream=false&one-shot=true`,

    [DockerApiKey.LIST_ALL_IMAGES]: () => `/images/json?shared-size=1&all=1`,
    [DockerApiKey.GET_SPECIFIC_IMAGE]: (id: string) => `/images/${id}/json`,
    [DockerApiKey.DELETE_IMAGE]: (id: string) => `/images/${id}`,
    [DockerApiKey.CREATE_IMAGE]: (query: string) => `/images/create?${query}`,
    [DockerApiKey.SEARCH_IMAGE]: (query: string) => `/images/search?${query}`,
    [DockerApiKey.GET_IMAGE_HISTORY]: (name: string) => `/images/${name}/history`,


    [DockerApiKey.GET_SYSTEM_INFO]: () => `/info`,
}

export type IDockerApiKey = keyof typeof DOCKER_API;