const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { addSchoolSchema, listSchoolsSchema } = require("../models/schools.model");
const { createSchool, getSchools } = require("../controllers/schools.controller");

const router = express.Router();


router.post("/addSchool", validate(addSchoolSchema), createSchool)
router.get("/listSchools", validate(listSchoolsSchema, "query"), getSchools)


module.exports = router;