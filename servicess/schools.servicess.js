const { pool } = require("../config/database");
const AppError = require("../utils/AppError");

exports.createSchool = async (schoolData) => {
    try {
        const { name, address, latitude, longitude } = schoolData;

        // Check if school with same name and location already exists
        const [existingSchools] = await pool.query(
            'SELECT * FROM schools WHERE name = ? AND latitude = ? AND longitude = ?',
            [name, latitude, longitude]
        );

        if (existingSchools.length > 0) {
            throw new AppError("A school with the same name and location already exists", 409);

        }

        // Insert new school
        const [result] = await pool.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, parseFloat(latitude), parseFloat(longitude)]
        );

        // Fetch the newly created school
        const [newSchool] = await pool.query(
            'SELECT * FROM schools WHERE id = ?',
            [result.insertId]
        );


        const data = {
            id: newSchool[0].id,
            name: newSchool[0].name,
            address: newSchool[0].address,
            latitude: newSchool[0].latitude,
            longitude: newSchool[0].longitude,
            created_at: newSchool[0].created_at
        }

        return data;


    } catch (error) {
        console.error('Error in addSchool:', error);
        throw new AppError(error.message, 500);
    }
};