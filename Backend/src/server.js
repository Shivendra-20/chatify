import express, { Router } from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js"
import HealthcheckRoute from "./routes/Healthcheck.route.js"
import MessageRoute from "./routes/message.route.js"

const app = express();
const PORT = process.env.PORT

app.use('/api/auth',authRoutes);
app.use('/api/messages',MessageRoute)
app.use('/',HealthcheckRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})
