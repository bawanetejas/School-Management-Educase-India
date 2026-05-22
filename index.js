const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection, pool } = require('./config/database');
const schoolsRoutes = require("./routes/schools.routes")


const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use("/api/schools", schoolsRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});


// Start server
const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();

        if (!dbConnected) {
            console.error('Failed to connect to database. Please check your configuration.');
            process.exit(1);
        }

        // Start listening
        app.listen(PORT, () => {

            console.log(` Server is running on port ${PORT}`);

        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Start the server
startServer();


// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});


