const Work = require("../../models/work");

const fetchWorks = async (req, res) => {
    try {
        const works = await Work.find();
        res.status(200).send({ message: works });
    } catch (error) {
        res.status(500).send({ message: "error occured,try again later" });
    }
};

module.exports = fetchWorks;
