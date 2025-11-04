import express, { Express, Request, Response } from "express";
import cors from "cors";

import { DockerRouter } from './routes/container.route';
import { ImageRoutes } from "./routes/image.route";
import { DashboardRoutes } from "./routes/dashboard.route";
import { NetworksRoutes } from "./routes/networks.route";

const app: Express = express();


declare global {
    namespace Express {
        interface Request {
            parsedQuery: Record<string, unknown>;
            parsedBody: Record<string, unknown>;
        }
    }
}

app.use(cors());
app.use(express.json());


// entry point
app.get("/test", (req: Request, res: Response) => {
    return res.send({
        status: "ok"
    })
})

app.use("/dashboard", DashboardRoutes);
app.use("/containers", DockerRouter)
app.use("/images", ImageRoutes)
app.use("/networks", NetworksRoutes)



export default app;