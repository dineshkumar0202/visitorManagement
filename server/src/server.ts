import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    // Start listening FIRST so Render detects the port
    app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`Server running on port ${PORT} 🚀`);
    });

    // Then connect to DB
    try {
        await connectDB();
    } catch (error) {
        console.error("Failed to connect to database:", error);
    }
};

startServer();
