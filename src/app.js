//Server
import express from "express";
import helmet from "helmet";
//Server Middlewares
import cors from "cors";
import morgan from "morgan";
//Custom Middlewares
import { errorHandler } from "./middlewares/error-handler.middleware.js";
//Database
import { connectDB } from "./config/db.js";
//Routes
import { authRoutes } from "./routes/auth.routes.js";
import { fileRoutes } from "./routes/file.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { categoryRoutes } from "./routes/category.routes.js";
import { seedAdmin } from "./utils/seed.js";
import filter from "content-filter";

const corsOptions = {
  origin: ["localhost"],
  optionsSuccessStatus: 200,
};

const app = express();

// Connect to database
connectDB();

seedAdmin();

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(filter());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/categories", categoryRoutes);

// Error handler middleware
app.use(errorHandler);

export default app;
