import express, {Request, Response} from "express";
import http from "http";
import cors from "cors";
import { DOCKER_API } from "./constant/endpoints";
import { 
    DockerContainerSchema,
    IDockerContainer,
} from '@repo/shared'

const app = express();
app.use(cors());
app.use(express.json());

const DOCKER_SOCK = "/var/run/docker.sock";

type IDockerRequest = {
    path : string;
    method? : "GET" | "POST";
    body? : any;
}

async function dockerRequest({
    path,
    method = "GET",
    body = null
}:IDockerRequest) {

   return new Promise(async (resolve,reject) => {
     const options = {
        socketPath :DOCKER_SOCK,
        path,
        method
    }

    const req = http.request(options, (res) => {
        let data = ""
        res.on("data",(chunk) => {
            data += chunk
        })
        res.on("end", () => {
            try{
                resolve(JSON.parse(data))
            }catch(err){
                resolve(data)
            }   
        })

    })

    req.on("error",(err) => reject(err));
    req.end();
   });
}

app.get("/containers", async (req:Request, res:Response) => {
  const data:any = await dockerRequest({
    path : DOCKER_API.LIST_ALL_CONTAINERS
  });
  
  const refinedData:IDockerContainer[] = data.map((i:any) => (DockerContainerSchema.parse(i)))

  res.json({data : refinedData});
});

app.post("/containers/:id/start", async (req, res) => {
//   await dockerRequest(`/containers/${req.params.id}/start`, "POST");
  res.json({ ok: true });
});

app.listen(4000, () => console.log("🚀 API running on http://localhost:4000"));
