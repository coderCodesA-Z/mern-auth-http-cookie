import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

// server listener
app.listen(PORT, () => {
	connectDB().then((message) => {
		console.log(message);
		console.log("=".repeat(message.length));
		console.log(`Server running on port ${PORT}`);
	});
});
