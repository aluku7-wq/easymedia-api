const path = require("path");
const Member = require("../../models/member");
const multer = require("multer");

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

const updateMember = (req, res) => {
    upload.fields([{ name: "image", maxCount: 1 }])(req, res, async (err) => {
        const uploadedFiles = req.files;

        try {
            // check the existing data first
            console.log(req.body);
            const initialData = await Member.findById(req.params.id);

            // update data
            const updatedModule = await Member.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    ...req.body,
                    image: uploadedFiles.image
                        ? uploadedFiles.image[0].filename
                        : req.body.image,
                },
                { new: true } // To return the updated document
            );

            // delete replaced images
            if (uploadedFiles.image) {
                if (uploadedFiles.image[0].filename !== req.body.image) {
                    console.log(initialData.image);
                    deleteImage(initialData.image);
                }
            }

            // Save the image filename in the database
            // (Assuming that `image` is the field in your Member model to store the image filename)
            initialData.image = uploadedFiles.image
                ? uploadedFiles.image[0].filename
                : req.body.image;
            await initialData.save();

            res.status(200).send({ message: updatedModule });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error occurred, please try again later",
            });
        }
    });
};

module.exports = updateMember;
