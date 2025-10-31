
export enum DockerApiKey {
    LIST_ALL_CONTAINERS = 'LIST_ALL_CONTAINERS',
    GET_SPECIFIC_CONTAINER = 'GET_SPECIFIC_CONTAINER',
    GET_CONTAINER_STAT = 'GET_CONTAINER_STAT',
    GET_CONTAINER_PROCESS = 'GET_CONTAINER_PROCESS',
    START_CONTAINER = 'START_CONTAINER',
    STOP_CONTAINER = 'STOP_CONTAINER',
    RESTART_CONTAINER = 'RESTART_CONTAINER',
    KILL_CONTAINER = 'KILL_CONTAINER',
    PAUSE_CONTAINER = 'PAUSE_CONTAINER',
    UNPAUSE_CONTAINER = 'UNPAUSE_CONTAINER',
    REFRESH_CONTAINER = 'REFRESH_CONTAINER',
    GET_CONTAINER_LOGS = 'GET_CONTAINER_LOGS',

    LIST_ALL_IMAGES = 'LIST_ALL_IMAGES',
    GET_SPECIFIC_IMAGE = "GET_SPECIFIC_IMAGE",
    DELETE_IMAGE = "DELETE_IMAGE",
    CREATE_IMAGE = 'CREATE_IMAGE',
    SEARCH_IMAGE = 'SEARCH_IMAGE',


    GET_IMAGE_HISTORY = 'GET_IMAGE_HISTORY',
    GET_SYSTEM_INFO = "GET_SYSTEM_INFO",
    GET_SYSTEM_DATA_USAGE = "GET_SYSTEM_DATA_USAGE",

    GET_NETWORKS_LIST = "GET_NETWORKS_LIST"
}


export const DOCKER_API: Record<DockerApiKey, (data?: any) => string> = {
    [DockerApiKey.LIST_ALL_CONTAINERS]: () => `/containers/json?all=1`,
    [DockerApiKey.GET_SPECIFIC_CONTAINER]: (id: string) => `/containers/${id}/json`,
    [DockerApiKey.GET_CONTAINER_STAT]: (id: string) => `/containers/${id}/stats?stream=false`,
    [DockerApiKey.GET_CONTAINER_PROCESS]: (id: string) => `/containers/${id}/top`,
    [DockerApiKey.START_CONTAINER]: (id: string) => `/containers/${id}/start`,
    [DockerApiKey.STOP_CONTAINER]: (id: string) => `/containers/${id}/stop`,
    [DockerApiKey.RESTART_CONTAINER]: (id: string) => `/containers/${id}/restart`,
    [DockerApiKey.KILL_CONTAINER]: (id: string) => `/containers/${id}/kill`,
    [DockerApiKey.PAUSE_CONTAINER]: (id: string) => `/containers/${id}/pause`,
    [DockerApiKey.UNPAUSE_CONTAINER]: (id: string) => `/containers/${id}/unpause`,
    [DockerApiKey.REFRESH_CONTAINER]: (id: string) => `/containers/${id}/refresh`,
    [DockerApiKey.GET_CONTAINER_LOGS]: (id: string) => `/containers/${id}/logs?stdout=1&stderr=1&follow=1`,


    [DockerApiKey.LIST_ALL_IMAGES]: () => `/images/json?shared-size=1&all=1`,
    [DockerApiKey.GET_SPECIFIC_IMAGE]: (id: string) => `/images/${id}/json`,
    [DockerApiKey.DELETE_IMAGE]: (id: string) => `/images/${id}`,
    [DockerApiKey.CREATE_IMAGE]: (query: string) => `/images/create?${query}`,
    [DockerApiKey.SEARCH_IMAGE]: (query: string) => `/images/search?${query}`,
    [DockerApiKey.GET_IMAGE_HISTORY]: (name: string) => `/images/${name}/history`,


    [DockerApiKey.GET_SYSTEM_INFO]: () => `/info`,
    [DockerApiKey.GET_SYSTEM_DATA_USAGE]: () => `/system/df`,

    [DockerApiKey.GET_NETWORKS_LIST]: () => `/networks`
}

export type IDockerApiKey = keyof typeof DOCKER_API;