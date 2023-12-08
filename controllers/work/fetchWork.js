const Work = require("../../models/work");

const fetchWork = async (req, res) => {
    const { id } = req.params;
    try {
        const works = await Work.findOne({ _id: id });
        res.status(200).send({ message: works });
    } catch (error) {
        res.status(500).send({ message: "error occured,try again later" });
    }
};

module.exports = fetchWork;
