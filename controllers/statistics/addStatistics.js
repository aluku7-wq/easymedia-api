const Statistic = require("../../models/statistic");

const addStatistics = async (req, res) => {
    try {
        const addstatsitic = await Statistic.create({ ...req.body });
        res.status(200).send({ message: addstatsitic });
    } catch (error) {
        res.status(500).send({ message: "error ocurred,try agin later" });
    }
};

module.exports = addStatistics;
