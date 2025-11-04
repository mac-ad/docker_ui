import { z } from 'zod';
import { ApiErrorResponseBase, ApiSuccessResponseBase } from './api';

export const DockerContainerPort = z.object({
    PrivatePort: z.number().optional(),
    PublicPort: z.number().optional(),
    Type: z.string().optional()
})

export type IDockerContainerPort = z.infer<typeof DockerContainerPort>

export const DockerContainerSchema = z.object({
    Id: z.string(),
    Names: z.array(z.string()),
    Image: z.string(),
    ImageID: z.string(),
    Status: z.string(),
    Created: z.number(),
    State: z.string(),
    Ports: z.array(DockerContainerPort)
})

export type IDockerContainer = z.infer<typeof DockerContainerSchema>

export const createContainerSchema = z.object({
    name: z.string().min(1)
})

// container stat
export const ContainerStat = z.object({
    name: z.string(),
    id: z.string(),
    read: z.string(),
    preread: z.string(),
    cpu_stats: z.object({
        cpu_usage: z.object({
            total_usage: z.number(),
            usage_in_kernelmode: z.number(),
            usage_in_usermode: z.number()
        }),
        online_cpus: z.number(),
        system_cpu_usage: z.number()
    }),
    precpu_stats: z.object({
        cpu_usage: z.object({
            total_usage: z.number(),
            usage_in_kernelmode: z.number(),
            usage_in_usermode: z.number()
        }),
        system_cpu_usage: z.number()
    }),
    networks: z.record(
        z.string(), z.object({
            rx_bytes: z.number(),
            rx_packets: z.number(),
            tx_bytes: z.number(),
            tx_packets: z.number()
        })
    ),
    blkio_stats: z.object({
        io_service_bytes_recursive: z.array(
            z.object({
                major: z.number(),
                minor: z.number(),
                op: z.string(),
                value: z.number()
            })
        )
    }),
    memory_stats: z.object({
        usage: z.number(),
        limit: z.number()
    })
})


const ContainerState = z.object({
    Status: z.string(),
    Running: z.string(),
    Paused: z.boolean(),
    Restarting: z.boolean(),
    OOMKilled: z.boolean(),
    Dead: z.boolean(),
    Pid: z.number(),
    ExitCode: z.number(),
    Error: z.string(),
    StartedAt: z.string(),
    FinishedAt: z.string(),
    Health: z.object({
        Status: z.string(),
        FailingStreak: z.number(),
        Log: z.array(z.any())
    }).optional()
})

// container detail
export const ContainerDetail = z.object({
    Id: z.string(),
    Created: z.string(),
    Path: z.string(),
    State: ContainerState,
    Image: z.string(),
    Name: z.string(),
    RestartCount: z.number(),
    Platform: z.string(),
    LogPath: z.string(),
    AppArmorProfile: z.string()
})

export type IContainerDetail = z.infer<typeof ContainerDetail>


// container processes list
export const ContainerProcesses = z.object({
    Titles: z.array(z.string()),
    Processes: z.array(z.array(z.string()))
})

export type IContainerProcesses = z.infer<typeof ContainerProcesses>


// get all container repsonse
export const getAllContainersResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
    data: z.array(DockerContainerSchema)
})

export type IGetAllContainersResponse = z.infer<typeof getAllContainersResponseSchema>

// get container stat response
export const getContainerStatsResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
    data: ContainerStat
})

export type IGetContainerStatsResponse = z.infer<typeof getContainerStatsResponseSchema>


// create container response
export const createContainerResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
});

// container detail response
export const getContainerDetailResponseSchema = z.object({
    ...ApiSuccessResponseBase.shape,
    data: ContainerDetail
})

export type IGetContainerDetailResponse = z.infer<typeof getContainerDetailResponseSchema>

// container processes respose

export const getContainerProcessesResponse = z.object({
    ...ApiErrorResponseBase.shape,
    data: ContainerProcesses
})

export type IGetContainerProcessesResponse = z.infer<typeof getContainerProcessesResponse>
