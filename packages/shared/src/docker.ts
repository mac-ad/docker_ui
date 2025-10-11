
import {z} from 'zod';


export const DockerContainerSchema = z.object({
    Id : z.string(),
    Names : z.array(z.string()),
    Image : z.string(),
    Status : z.string()
})


export type IDockerContainer = z.infer<typeof DockerContainerSchema>
