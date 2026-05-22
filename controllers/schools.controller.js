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

exports.getSchools = asyncHandler(async (req, res) => {
    const data = await schoolServicess.listSchools(req.query);
    if (data.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No school found",
            data: data
        })
    }

    return res.status(200).json({
        success: true,
        message: "Schools retrieved successfully",
        data: data
    })
})