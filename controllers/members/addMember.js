const multer = require("multer");
const path = require("path");
const Member = require("../../models/member");

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

const upload = multer({
    storage,
});
const addMember = async (req, res, next) => {
    try {
        upload.single("image")(req, res, async (err) => {
            if (err) {
                console.error("Upload error:", err);
                return res.status(400).send({
                    message: "Upload failed",
                });
            }
            if (!req.file) {
                return res.status(400).send({
                    message: "No image file provided",
                });
            }
            // Save the new filename in the database
            const newMember = await Member.create({
                ...req.body,
                image: req.file.filename,
            });

            return res.status(200).send({
                message: newMember,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error occurred saving the image. Try again later.",
        });
    }
};

module.exports = addMember;
