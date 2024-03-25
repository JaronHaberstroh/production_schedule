import express from "express";
import cors from "cors";

import departmentRoutes from "#routes/departmentRoutes.js";
import unhandledRoutes from "#middleware/unhandledRoutes.js";

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

// Catch unhandled routes
app.use(unhandledRoutes);

//Error handling middleware
app.use((error, _, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.json({
    status: "error",
    message: error.message || "An unknown error occurred!",
  });
});

export default app;
