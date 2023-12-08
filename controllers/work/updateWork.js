const Work = require("../../models/work");
const multer = require("multer");
const path = require("path");
// Function to delete an image by reference
const deleteImage = (reference) => {
    const fs = require("fs");
    const imagePath = `../uploads/${reference}`;
    try {
        fs.unlinkSync(imagePath);
        console.log(
            `Image ${reference} deleted successfully from path: ${imagePath}`
        );
    } catch (error) {
        console.error(`Error deleting image ${reference}: ${error.message}`);
    }
};
// upload images
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
const updateWork = (req, res) => {
    upload.fields([
        { name: "mainPhoto", maxCount: 1 },
        { name: "userInterface", maxCount: 8 },
    ])(req, res, async (err) => {
        const uploadedFiles = req.files;
        let manyFiles = [];
        try {
            for (const file of uploadedFiles.userInterface) {
                manyFiles.push(file.filename);
            }
            // check the existing data first
            const initialData = await Work.find({ _id: req.params.id });
            // update data

            const updatedWork = await Work.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    ...req.body,
                    mainPhoto: uploadedFiles.mainPhoto
                        ? uploadedFiles.mainPhoto[0].filename
                        : "",
                    userInterface: uploadedFiles.userInterface ? manyFiles : [],
                },
                { new: true } // To return the updated document
            );
            // delete replaced images
            if (uploadedFiles.mainPhoto) {
                if (
                    uploadedFiles.mainPhoto[0].filename !== req.body.mainPhoto
                ) {
                    console.log(initialData[0].mainPhoto);
                    deleteImage(initialData[0].mainPhoto);
                }
            }
            if (uploadedFiles.userInterface) {
                if (
                    uploadedFiles.userInterface[0].filename !==
                    initialData[0].userInterface[0]
                ) {
                    for (const image of initialData[0].userInterface) {
                        deleteImage(image);
                    }
                }
            }

            res.status(200).send({ message: updatedWork });
        } catch (error) {
            console.log(error);

            res.status(500).send({
                message: "Error occured please try again later",
            });
        }
    });
};

module.exports = updateWork;
