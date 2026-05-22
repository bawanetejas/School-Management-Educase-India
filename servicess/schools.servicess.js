const { pool } = require("../config/database");
const AppError = require("../utils/AppError");
const { calculateDistance } = require("../utils/distanceCalcultor");


//  add school
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



//  List all schools sorted by proximity to user's location

exports.listSchools = async (coordinates) => {
    try {
        const userLatitude = parseFloat(coordinates.latitude);
        const userLongitude = parseFloat(coordinates.longitude);

        // Fetch all schools from database
        const [schools] = await pool.query('SELECT * FROM schools');

        if (schools.length === 0) {
            return []
        }

        // Calculate distance for each school and add to object
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                userLatitude,
                userLongitude,
                school.latitude,
                school.longitude
            );

            return {
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distance: parseFloat(distance.toFixed(2)) // Distance in kilometers
            };
        });

        // Sort schools by distance (nearest first)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        return schoolsWithDistance;

    } catch (error) {
        console.error('Error in listSchools:', error);
        throw new AppError("An error occurred while retrieving schools", 500);

    }
};
