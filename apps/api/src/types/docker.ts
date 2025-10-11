
export type IDockerRequest = {
    path: string;
    method?: "GET" | "POST";
    body?: any;
}