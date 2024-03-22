import express from "express";
import cors from "cors";

import departmentRoutes from "./routes/departmentRoutes.js";

// Initialize app instance
const app = express();

// Enable cors
app.use(cors());

// Enable handling of JSON data
app.use(express.json());

// Enable body parsing
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/department", departmentRoutes);

export default app;
