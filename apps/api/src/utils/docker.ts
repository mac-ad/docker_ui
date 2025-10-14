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
                // try {
                //     resolve(JSON.parse(data))
                // } catch (err) {
                //     resolve(data)
                // }

                const isJson = res.headers["content-type"]?.includes("application/json")
                const result = isJson ? JSON.parse(data || "{}") : data

                // 🚨 Check for HTTP error codes
                if (res.statusCode && res.statusCode >= 400) {
                    return reject({
                        statusCode: res.statusCode,
                        message: result.message || res.statusMessage || result,
                    })
                }

                resolve(result)
            })

        })

        req.on("error", (err) => {
            console.log("inside on error")
            reject(err)
        });
        req.end();
    });
}
