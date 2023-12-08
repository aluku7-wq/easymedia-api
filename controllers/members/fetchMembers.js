const Member = require("../../models/member");

const fetchMembers = async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).send({ message: members });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = fetchMembers;
