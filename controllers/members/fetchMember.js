const Member = require("../../models/member");

const fetchMember = async (req, res) => {
    const { id } = req.params;

    try {
        const member = await Member.findOne({ _id: id });
        res.status(200).send({
            message: member,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error occured, please try again later",
        });
    }
};

module.exports = fetchMember;
