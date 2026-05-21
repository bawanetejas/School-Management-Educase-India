const { z } = require('zod');

// POST /addSchool

const addSchoolSchema = z.object({
    name: z.string().trim().min(3).max(255),

    address: z.string().trim().min(5).max(500),

    latitude: z.coerce.number().min(-90).max(90),

    longitude: z.coerce.number().min(-180).max(180)
});


// GET /listSchools

const listSchoolsSchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),

    longitude: z.coerce.number().min(-180).max(180)
});

module.exports = {
    addSchoolSchema,
    listSchoolsSchema
};