const Statistic = require("../../models/statistic");

const fetchStatistic = async (req, res) => {
    const { id } = req.params;
    try {
        const statistic = await Statistic.findOne({ _id: id });
        res.status(200).send({
            message: statistic,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = fetchStatistic;
