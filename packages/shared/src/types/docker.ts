import { z } from 'zod';

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

export const ListImageSchema = z.object({
    Id: z.string(),
    ParentId: z.string(),
    RepoTags: z.array(z.string()),
    RepoDigests: z.array(z.string()),
    Created: z.number(),
    Size: z.number(),
    SharedSize: z.number(),
    Labels: z.record(z.string(), z.string()).nullable(),
    Containers: z.number(),
    Manifests: z.any(),

})

export type IListImageSchema = z.infer<typeof ListImageSchema>