const Work = require("../../models/work");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
const addWork = (req, res) => {
    upload.fields([
        { name: "mainPhoto", maxCount: 1 },
        { name: "userInterface", maxCount: 8 },
    ])(req, res, async (err) => {
        if (err) {
            console.error("Error uploading files:", err);
            res.status(500).send("File Upload Error");
            return;
        }
        const uploadedFiles = req.files;

        // save to the database
        let manyFiles = [];
        try {
            for (const file of uploadedFiles.userInterface) {
                manyFiles.push(file.filename);
            }
            const newwork = await Work.create({
                ...req.body,

                mainPhoto: uploadedFiles.mainPhoto
                    ? uploadedFiles.mainPhoto[0].filename
                    : "",
                userInterface: uploadedFiles.userInterface ? manyFiles : [],
            });

            return res.status(200).send({
                message: newwork,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    });
};

module.exports = addWork;
