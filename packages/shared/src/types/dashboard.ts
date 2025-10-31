import { z } from 'zod';
import { DockerContainerSchema, ListImageSchema } from './docker';

export const SystemInfoSchema = z.object({
    ID: z.string(),
    Containers: z.number(),
    ContainersRunning: z.number(),
    ContainersPaused: z.number(),
    ContainersStopped: z.number(),
    Images: z.number(),
    OperatingSystem: z.string(),
    OSType: z.string(),
    NCPU: z.number(),
    MemTotal: z.number(),
    Architecture: z.string(),
})

export type ISystemInfo = z.infer<typeof SystemInfoSchema>

export const VolumeSchema = z.object({
    CreatedAt: z.string(),
    Driver: z.string(),
    Name: z.string(),
    Mountpoint: z.string()
})

export const SystemDataUsageSchema = z.object({
    Images: z.array(ListImageSchema),
    Containers: z.array(DockerContainerSchema),
    Volumes: z.array(VolumeSchema),
    LayersSize: z.number()
})

export type ISystemDataUsage = z.infer<typeof SystemDataUsageSchema>