const mongoose = require("mongoose");
const statisticSchema = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        value: {
            type: String,
        },
    },

    { timestamps: true }
);
const Statistic = mongoose.model("Statistic", statisticSchema);
module.exports = Statistic;
