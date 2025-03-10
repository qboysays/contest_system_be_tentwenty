"use strict";
require("dotenv").config({ path: __dirname + "/.env" });
const settings = require("./common/settings").Settings;
const databaseModule = require("./database/database");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const appLib = require("applib");
const cors = require("cors");
const logger = new appLib.Logger(null, null);
const rateLimit = require('express-rate-limit');

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(limiter);

startServerProcess(logger);

const middleware = require("./middleware/authenticator");
app.use(middleware.AuthenticateRequest);

const authRoute = require("./routes/authRoutes");
app.use("/api/auth", authRoute);

const contestRoute = require("./routes/contestRoutes");
app.use("/api/contest", contestRoute);

const userRoute = require("./routes/userRoutes");
app.use("/api/user", userRoute);

// Fetch Primary Setings From Database Residing in applib

async function startServerProcess(logger) {
  try {
    logger.logInfo(`StartServerProcess Invoked()`);
    await appLib.fetchDBSettings(
      logger,
      settings,
      databaseModule
    );
    app.listen(process.env.NODE_PORT, () => {
      console.log("server running on port " + process.env.NODE_PORT);
      logger.logInfo("server running on port " + process.env.NODE_PORT);
    });
  } catch (errFetchDBSettings) {
    console.error("Error occured in starting node services. Need immediate check.");

    logger.logInfo(
      "Error occured in starting node services. Need immediate check."
    );
  }
}
