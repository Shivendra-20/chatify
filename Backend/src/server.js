import express from "express";
import { ENV } from "./lib/env.js";
import authRoutes from "./routes/auth.route.js";
import HealthcheckRoute from "./routes/Healthcheck.route.js";
import MessageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser";


const PORT = ENV.PORT || 5000;

const app = express();

app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

// ✅ Middleware
//payload too large error
app.use(express.json());       // const { yahan pr jo hoga usko samajne ke liya h yeh line } = ....
app.use(cookieParser());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', MessageRoute);
// health route
app.use('/api/health', HealthcheckRoute);
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});








// ***************************** NOT USE **********************************************

// production setup --> This is for combined deployment of backend and frontend
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get(/.*/, (_, res) => {
//         if (req.path.startsWith("/api")) {
//             return res.status(404).json({ message: "API route not found" });
//         }
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//     });
// }