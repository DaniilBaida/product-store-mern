import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(errorMiddleware);

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    });
