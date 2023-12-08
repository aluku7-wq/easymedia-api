const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const connectDB = require("./dbConfig/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// Import the Routes
const memberRoutes = require("./routes/memberRoutes");
const workRoutes = require("./routes/workRoutes");
const statisticsRoutes = require("./routes/statisticsRoute");

// Enable CORS for all routes
app.use(cors());
// cookie passing middlewdre
app.use(cookieParser());
// Use body parsing middleware
app.use(bodyParser.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json());

// routes
app.use("/backend/members", memberRoutes);
app.use("/backend/work", workRoutes);
app.use("/backend/statistics", statisticsRoutes);

app.listen(port, () => {
    // database connection
    connectDB();
    console.log(`Server is running on port ${port}`);
});
