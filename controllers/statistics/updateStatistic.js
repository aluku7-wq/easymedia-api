const Statistic = require("../../models/statistic");

const updateStatistic = async (req, res) => {
    const { id } = req.params;
    try {
        // update data
        const updatedstatistic = await Statistic.findByIdAndUpdate(
            { _id: id },
            {
                ...req.body,
            },
            { new: true } // To return the updated document
        );
        res.status(200).send({
            message: updatedstatistic,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = updateStatistic;
