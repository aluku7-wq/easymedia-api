const Statistic = require("../../models/statistic");

const fetchStatistics = async (req, res) => {
    try {
        const statistics = await Statistic.find();
        res.status(200).send({
            message: statistics,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = fetchStatistics;
