const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { addSchoolSchema } = require("../models/schools.model");
const { createSchool } = require("../controllers/schools.controller");

const router = express.Router();


router.post("/addSchool", validate(addSchoolSchema), createSchool)


module.exports = router;