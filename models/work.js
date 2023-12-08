const mongoose = require("mongoose");
const workSchema = new mongoose.Schema(
    {
        cEnglishName: {
            type: String,
        },
        cArabicName: {
            type: String,
        },
        projectUrl: {
            type: Object,
        },
        subSection: {
            type: String,
        },
        descriptionEn: {
            type: String,
        },
        descriptionAr: {
            type: String,
        },
        mainSection: {
            type: String,
        },
        mainPhoto: {
            type: String,
        },
        mainPhoto: {
            type: String,
        },
        userInterface: { type: Array },
    },

    { timestamps: true }
);
const Work = mongoose.model("Work", workSchema);
module.exports = Work;
