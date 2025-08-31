# Vacation Statistics Dashboard - Part III

**Developer:** George Mattar

## Project Overview

This is Part III of the Python Full Stack Web Developer project - a comprehensive vacation statistics dashboard that provides analytics for a vacation management system. The project includes both backend API services and a frontend dashboard for administrators.

## Technologies Used

- **Backend:** Django + Django REST Framework
- **Frontend:** React.js with React Router
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Cloud Deployment:** AWS Cloud Ready

## Project Structure

```
projectRoot/
├── stats_website/
│   ├── backend/           ← Django backend for statistics
│   │   ├── Dockerfile
│   │   ├── manage.py
│   │   ├── requirements.txt
│   │   ├── stats_backend/
│   │   └── api/
│   └── frontend/          ← React frontend for statistics
│       ├── Dockerfile
│       ├── package.json
│       ├── public/
│       └── src/
├── docker-compose.yml
├── init_db.sql
└── README.md
```

## Features

### Backend API Endpoints
- `POST /login/` - Admin authentication
- `POST /logout/` - User logout
- `GET /stats/vacations/` - Vacation statistics (past, ongoing, future)
- `GET /users/total/` - Total users count
- `GET /likes/total/` - Total likes count
- `GET /likes/distribution/` - Likes distribution by destination

### Frontend Pages
- **Home Page:** Welcome page with system overview
- **Login Page:** Admin authentication (only admin users can access)
- **Statistics Page:** Interactive dashboard with charts and metrics
- **About Page:** Developer information and project details
- **404 Page:** Not found page with navigation

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed
- Git (for version control)

### Running the Project

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd thirdproject
   ```

2. **Start the entire system using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Start PostgreSQL database with initial data
   - Build and run Django backend on port 8001
   - Build and run React frontend on port 3001

3. **Access the application:**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:8001
   - Database: localhost:5435

### Demo Credentials
- **Admin User:**
  - Email: admin@example.com
  - Password: adminpass

### Database Schema
The project uses the same PostgreSQL database from Part II with tables for:
- Users (with admin/user roles)
- Countries and Vacations
- Likes (user preferences)

### Development Notes
- Initial data is automatically loaded via `init_db.sql`
- All services are containerized for consistent deployment
- CORS is configured for frontend-backend communication
- Admin authentication is required for statistics access

## Additional Notes
- The system includes comprehensive error handling
- Responsive design for mobile and desktop
- Interactive charts using Recharts library
- Secure admin-only access to statistics

## Submission Date
01/09/2025