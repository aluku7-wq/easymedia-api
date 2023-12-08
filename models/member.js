const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema(
    {
        englishName: {
            type: String,
        },
        arabicName: {
            type: String,
        },
        position: {
            type: String,
        },
        officeCode: {
            type: String,
        },
        image: {
            type: String,
        },
    },

    { timestamps: true }
);
const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
