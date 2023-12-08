const Statistic = require("../../models/statistic");

const deleteStatistic = async (req, res) => {
    const { id } = req.params;
    try {
        // update data
        // Delete the member itself
        await Statistic.deleteOne({ _id: id });

        // Fetch the remaining members after deletion
        const remainingStatistics = await Statistic.find();

        res.status(200).send({
            message: remainingStatistics,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = deleteStatistic;
