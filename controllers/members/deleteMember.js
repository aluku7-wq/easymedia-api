const Member = require("../../models/member");

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

const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findOne({ _id: id });

        if (!member) {
            console.error(`Member not found with ID: ${id}`);
            return res.status(404).send({ message: "Member not found" });
        }

        // Delete member images
        console.log(`Deleting images for member: ${member.image}`);
        deleteImage(member.image);

        // Delete the member itself
        await Member.deleteOne({ _id: id });

        // Fetch the remaining members after deletion
        const remainingMembers = await Member.find();

        res.status(200).send({
            message: remainingMembers,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message:
                "An error occurred while deleting the member. Please try again later.",
        });
    }
};

module.exports = deleteMember;
