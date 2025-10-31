import { DOCKER_SOCK } from "../constant/docker";
import { IDockerRequest, IDockerStreamRequest } from "../types/docker";
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

export async function dockerStreamRequest({
    path,
    method = "GET",
    req,
    res
}: IDockerStreamRequest) {

    // upgrade http to SSE connection
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })
    res.flushHeaders()


    const options = {
        socketPath: DOCKER_SOCK,
        path,
        method
    }


    const dockerReq = http.request(options, dockerRes => {
        dockerRes.on('data', chunk => {
            chunk.toString()
                .split('\n')
                .filter(Boolean)
                .forEach((line: string) => {
                    // try {
                    //     const json = JSON.parse(line);
                    //     console.log("json = ", json)
                    //     res.write(`data: ${JSON.stringify(json)}\n\n`);
                    // } catch (err) {
                    res.write(`data: ${line}\n\n`);
                    // }
                });
        })

        dockerRes.on('end', () => {
            res.write('event: end\ndata: done\n\n');
            res.end();
        });
    })

    dockerReq.on('error', err => {
        res.write(`data: ERROR: ${err.message}\n\n`);
        res.end();
    });

    dockerReq.end();

    req.on('close', () => {
        dockerReq.abort();
    });
}
