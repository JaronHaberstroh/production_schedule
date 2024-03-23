import mongoose from "mongoose";
import { config } from "dotenv";

import app from "./app.js";

// Import .env variables
config();

// Create PORT variable
const PORT = process.env.PORT || 3000;

// MongoDB
await mongoose.connect(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
