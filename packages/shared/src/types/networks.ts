import { z } from 'zod';


export const NetworkSchema = z.object({
    Name: z.string(),
    Id: z.string(),
    Created: z.string(),
    Driver: z.string(),
    Scope: z.string(),
    IPAM: z.object({
        Driver: z.string(),
        Config: z.array(z.object({
            Subnet: z.string()
        })).nullable()
    }),
    Attachable: z.boolean(),
    EnableIPv4: z.boolean(),
    Internal: z.boolean(),
})

export type INetwork = z.infer<typeof NetworkSchema>