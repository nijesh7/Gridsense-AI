/**
 * GridSense AI - Node.js Express Server Entrypoint
 */

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const apiRoutes = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "GridSense AI Node.js Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Mount Central API Routes
app.use("/api", apiRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡ [GridSense Server] Express backend running on http://localhost:${PORT}`);
  console.log(`⚡ [GridSense Server] API routes available under http://localhost:${PORT}/api`);
});

module.exports = app;
