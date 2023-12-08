const express = require("express");
const memberRoutes = express.Router();
const addMember = require("../controllers/members/addMember");
const fetchMembers = require("../controllers/members/fetchMembers");
const fetchMember = require("../controllers/members/fetchMember");
const updateMember = require("../controllers/members/updateMember");
const deleteMember = require("../controllers/members/deleteMember");

memberRoutes.post("/addmember", addMember);
memberRoutes.get("/fetchmembers", fetchMembers);
memberRoutes.get("/fetchmember/:id", fetchMember);
memberRoutes.put("/updatemember/:id", updateMember);
memberRoutes.delete("/deletemember/:id", deleteMember);

module.exports = memberRoutes;
