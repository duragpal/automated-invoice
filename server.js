// src/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const invoiceRoutes = require("./routes/invoice.routes");
const schedulerService = require("./services/scheduler.service");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", invoiceRoutes);

// Initialize scheduler
schedulerService.initializeInvoiceProcessing();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
