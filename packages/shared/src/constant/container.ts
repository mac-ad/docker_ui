export enum CONTAINER_ACTION {
    START = "START",
    STOP = "STOP",
    RESTART = "RESTART",
    KILL = "KILL",
    PAUSE = "PAUSE",
    REMOVE = "REMOVE",
    UNPAUSE = "UNPAUSE",
    REFRESH = 'REFRESH'
}

export type ContainerActionType = keyof typeof CONTAINER_ACTION;
