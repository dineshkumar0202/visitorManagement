import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.CLIENT_URL || "",
    ].filter(Boolean),
    credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api", routes);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;