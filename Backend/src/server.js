import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import HealthcheckRoute from "./routes/Healthcheck.route.js";
import MessageRoute from "./routes/message.route.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

// ✅ IMPORTANT
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', MessageRoute);

// health route
app.use('/api/health', HealthcheckRoute);

// production setup
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/.*/, (_, res) => {
        if (req.path.startsWith("/api")) {
            return res.status(404).json({ message: "API route not found" });
        }
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});