const express = require("express");
const addStatistics = require("../controllers/statistics/addStatistics");
const fetchStatistics = require("../controllers/statistics/fetchStatistics");
const fetchStatistic = require("../controllers/statistics/fetchstatistic");
const updateStatistic = require("../controllers/statistics/updateStatistic");
const deleteStatistic = require("../controllers/statistics/deleteStatistic");
const statisticsRoutes = express.Router();

statisticsRoutes.post("/addstatistic", addStatistics);
statisticsRoutes.get("/fetchstatistics", fetchStatistics);
statisticsRoutes.get("/fetchstatistic/:id", fetchStatistic);
statisticsRoutes.put("/updatestatistic/:id", updateStatistic);
statisticsRoutes.delete("/deletestatistic/:id", deleteStatistic);

module.exports = statisticsRoutes;
