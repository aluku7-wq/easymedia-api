const Work = require("../../models/work");

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

const deleteWork = async (req, res) => {
    const { id } = req.params;
    try {
        const work = await Work.findOne({ _id: id });

        if (!work) {
            console.error(`work not found with ID: ${id}`);
            return res.status(404).send({ message: "work not found" });
        }

        // Delete work images
        deleteImage(work.mainPhoto);
        for (const image of work.userInterface) {
            deleteImage(image);
        }

        // Delete the work itself
        await Work.deleteOne({ _id: id });
        const remainingWork = await Work.find();
        res.status(200).send({ message: remainingWork });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message:
                "An error occurred while deleting the lesson. Please try again later.",
        });
    }
};

module.exports = deleteWork;
