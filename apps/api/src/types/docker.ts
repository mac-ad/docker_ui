
export type IDockerRequest = {
    path: string;
    method?: "GET" | "POST" | "DELETE";
    body?: any;
}