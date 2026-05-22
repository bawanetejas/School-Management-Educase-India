# School Management

A Node.js REST API for managing school data with location-based sorting functionality.

## Features

- Add new schools with location coordinates
- Retrieve schools sorted by proximity to user's location
- Input validation and error handling
- MySQL database integration
- RESTful API design
- Production-ready architecture

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bawanetejas/School-Management.git
   cd school-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Edit `.env` file with your database credentials:

   ```
   DATABASE_URL=*********
   PORT=5000
   ```

4. **Start the server**

   Development mode:

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm start
   ```

## API Endpoints

### Base URL

```
http://localhost:5000/api
```

### 1. Add School

**Endpoint:** `POST /api/schools/addSchool`

**Description:** Add a new school to the database

**Request Body:**

```json
{
  "name": "Springfield Elementary School",
  "address": "123 Main St, Springfield, IL",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Success Response (201):**

```json
{
  "success": true,
  "messaage": "School created successfully",
  "return": {
    "id": 4,
    "name":"Springfield Elementary School",
    "address": "123 Main St, Springfield, IL",
    "latitude": 39.7817,
    "longitude": -89.6501
    "created_at": "2026-05-22T03:21:54.000Z"
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Validation failed"
}
```

### 2. List Schools

**Endpoint:** `GET /api/schools/listSchools`

**Description:** Retrieve all schools sorted by proximity to user's location

**Query Parameters:**

- `latitude` (required): User's latitude coordinate
- `longitude` (required): User's longitude coordinate

**Example Request:**

```
GET /api/schools/listSchools?latitude=41.8781&longitude=-87.6298
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Schools retrieved successfully",

  "data": [
    {
      "id": 2,
      "name": "Riverside High School",
      "address": "456 River Rd, Chicago, IL",
      "latitude": 41.8781,
      "longitude": -87.6298,
      "distance": 0.0
    },
    {
      "id": 3,
      "name": "Oakwood Academy",
      "address": "789 Oak Ave, Naperville, IL",
      "latitude": 41.7508,
      "longitude": -88.1535,
      "distance": 45.23
    }
  ]
}
```

### Health Check

**Endpoint:** `GET /health`

**Description:** Check if the server is running

**Success Response (200):**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_coordinates (latitude, longitude)
);
```

## 🏗️ Project Structure

```
school-management/

├── config/
│   ├── database.js       # Database connection
│
├── controllers/
│   └── schools.controller.js  # Business logic
├── routes/
│   └── schools.routes.js   # API routes
├── servicess/
│   └── schools.servicess.js   # api logic
├── models/
│   └── school.model.js # Input validation
├── utils/
│   └── distanceCalculator.js # Haversine formula
    └── AppError.js # Gloable Error handler
    └── asyncHandler.js # controller wrapper

└── index.js             # Main application
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
└── README.md               # Documentation
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **zod** - Input validation
- **mysql2** - MySQL client
- **dotenv** - Environment configuration
- **helmet** - Security headers
- **cors** - CORS handling
- **morgan** - HTTP request logger

## 📝 Validation Rules

### Add School

- `name`: Required, 3-255 characters
- `address`: Required, 5-500 characters
- `latitude`: Required, float between -90 and 90
- `longitude`: Required, float between -180 and 180

### List Schools

- `latitude`: Required, float between -90 and 90
- `longitude`: Required, float between -180 and 180

## Distance Calculation

The API uses the **Haversine formula** to calculate the great-circle distance between two points on Earth:

```
d = 2r × arcsin(√(sin²(Δφ/2) + cos(φ1) × cos(φ2) × sin²(Δλ/2)))
```

Where:

- φ is latitude
- λ is longitude
- r is Earth's radius (6371 km)

## 🚢 Deployment

### Option 1: Render.com

1. Create account on Render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Add environment variables
5. Deploy

### Option 2: Railway.app

1. Create account on Railway.app
2. Create new project from GitHub
3. Add MySQL database
4. Configure environment variables
5. Deploy

## 🔒 Security Features

- Helmet.js for security headers
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- CORS configuration
- Environment variable protection
