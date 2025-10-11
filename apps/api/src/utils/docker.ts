import { DOCKER_SOCK } from "../constant/docker";
import { IDockerRequest } from "../types/docker";
import http from 'http'

export async function dockerRequest({
    path,
    method = "GET",
    body = null
}: IDockerRequest): Promise<any> {

    return new Promise(async (resolve, reject) => {
        const options = {
            socketPath: DOCKER_SOCK,
            path,
            method
        }

        const req = http.request(options, (res) => {
            let data = ""
            res.on("data", (chunk) => {
                data += chunk
            })
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data))
                } catch (err) {
                    resolve(data)
                }
            })

        })

        req.on("error", (err) => reject(err));
        req.end();
    });
}
