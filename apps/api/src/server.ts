import express, { Request, Response } from "express";
import cors from "cors";

import { DockerRouter } from './routes';

const app = express();
app.use(cors());
app.use(express.json());


// entry point
app.get("/test", (req: Request, res: Response) => {
    return res.send({
        status: "ok"
    })
})
app.use("/", DockerRouter)

app.listen(4000, () => console.log("🚀 API running on http://localhost:4000"));
