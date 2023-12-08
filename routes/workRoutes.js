const express = require("express");
const addWork = require("../controllers/work/addWork");
const updateWork = require("../controllers/work/updateWork");
const deleteWork = require("../controllers/work/deleteWork");
const fetchWorks = require("../controllers/work/fetchWorks");
const fetchWork = require("../controllers/work/fetchWork");
const workRoutes = express.Router();

workRoutes.post("/addwork", addWork);
workRoutes.get("/fetchworks", fetchWorks);
workRoutes.get("/fetchwork/:id", fetchWork);
workRoutes.put("/updatework/:id", updateWork);
workRoutes.delete("/deletework/:id", deleteWork);

module.exports = workRoutes;
