const schoolServicess = require("../servicess/schools.servicess");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createSchool = asyncHandler(async (req, res) => {
    const data = await schoolServicess.createSchool(req.body)
    return res.status(201).json({
        success: true,
        messaage: "School created successfully",
        return: data
    })
})