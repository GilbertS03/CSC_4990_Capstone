# WOMM - Computer Reservation System (CRS)

A full-stack web application for managing and reserving devices/computers in library buildings. Built as a capstone project (CSC_4990_Capstone) for a computer science course.

**Live Site:** https://womm.space  
**API Base:** https://api.womm.space

---

## 📋 Project Overview

WOMM is a production-ready reservation system that enables users to browse libraries, find available devices (computers, printers, etc.), and book time slots. Administrators can manage buildings, rooms, devices, and oversee all system operations.

### Key Use Cases

- **Users**: Browse buildings and rooms, reserve available devices, track usage hours, manage reservations
- **Admins**: Manage facilities, configure system settings, monitor user activity, schedule building closures

---

## ✨ Features

### User Features

- 🔐 **Secure Authentication** - JWT-based login/signup with bcrypt password hashing
- 🏢 **Building Explorer** - Browse buildings and rooms with grid-based device layouts
- 📅 **Device Reservation** - Book time slots for available devices
- 📊 **Usage Tracking** - Monitor weekly device usage hours
- 📧 **Notifications** - Email alerts for reservation changes
- 👤 **Profile Management** - View and manage personal account

### Admin Features

- 🛠️ **Facility Management** - Create/edit/delete buildings, rooms, and devices
- 🗺️ **Device Positioning** - Manage device positions within room grids (X,Y coordinates)
- 👥 **User Management** - Manage user roles, activity, and usage limits
- 📅 **Closure Management** - Schedule planned building closures
- ⚙️ **System Settings** - Configure system-wide parameters
- 📊 **Reservation Overview** - Monitor and manage all reservations
- 🎛️ **Device Configuration** - Manage device types and status categories

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React/Vite)                   │
│         Deployed: AWS S3 + CloudFront (womm.space)          │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────────────────────┐
│              API Gateway & Load Balancer                    │
└────────────────────┬────────────────────────────────────────┘
                     │ Docker
┌────────────────────▼────────────────────────────────────────┐
│            Backend (FastAPI - Python)                       │
│      Deployed: AWS ECR (Container Registry)                 │
│              Port: 8000                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│              MySQL Database                                  │
│     Development: localhost:3306                              │
│     Production: Configured via environment                  │
└─────────────────────────────────────────────────────────────┘
```

### Backend Structure

```
app-backend/api/
├── main.py                 # FastAPI application entry point
├── routes/                 # API endpoint handlers
│   ├── users.py           # User management endpoints
│   ├── buildings.py       # Building management endpoints
│   ├── rooms.py           # Room management endpoints
│   ├── devices.py         # Device management endpoints
│   ├── reservations.py    # Reservation endpoints
│   ├── device_types.py    # Device type configuration
│   ├── device_statuses.py # Device status configuration
│   └── settings.py        # System settings endpoints
├── auth/                   # Authentication & authorization
│   ├── models/            # Login/token response models
│   ├── routes/            # Auth endpoints
│   ├── services/          # Auth business logic
│   └── utils/             # JWT utilities
├── services/               # Business logic layer
│   ├── users.py
│   ├── buildings.py
│   ├── rooms.py
│   ├── devices.py
│   ├── reservations.py
│   └── ...
├── models/                 # SQLModel database schemas (11 entities)
│   ├── User.py
│   ├── Buildings.py
│   ├── Rooms.py
│   ├── Devices.py
│   ├── Reservations.py
│   └── ...
├── schema/                 # Pydantic validation schemas
├── db/                     # Database configuration
│   ├── engine.py          # SQLAlchemy engine setup
│   └── session.py         # Session management
├── emailSystem/            # Email notification service
└── core/                   # Configuration & settings

unit-tests/                # Comprehensive test suite
├── test_user_services.py
├── test_building_services.py
├── test_device_services.py
├── test_reservation_services.py
└── ...
```

### Frontend Structure

```
app-frontend/src/
├── App.jsx                 # Main application component
├── main.jsx                # Vite entry point
├── index.css               # Global styles
├── theme.css               # Theme variables
├── components/
│   ├── admin-components/   # Admin dashboard & management UI
│   ├── home-components/    # Public pages (Home, About, Contact)
│   ├── login-and-signup-components/  # Auth pages
│   ├── reservation-pages/  # Reservation booking flow
│   ├── route-types/        # Protected route wrappers
│   └── default-components/ # Reusable components
├── layouts/
│   ├── AdminLayout.jsx     # Admin dashboard layout
│   └── PublicLayout.jsx    # Public pages layout
├── services/
│   ├── auth.js            # Authentication API calls
│   ├── api/               # API service layer
│   └── ...
├── context/
│   └── AuthContext.jsx    # Global authentication state
└── utils/
    ├── jwt.js             # JWT token handling
    ├── validation.js      # Form validation utilities
    └── assets.js          # Asset management
```

---

## 🛠️ Technology Stack

### Backend

- **Framework**: FastAPI 0.128.8 (async Python web framework)
- **ORM**: SQLModel 0.0.33 (SQL + Pydantic integration)
- **Database**: MySQL with PyMySQL driver
- **Authentication**: JWT (PyJWT 2.11.0) + BCrypt
- **Security**: PyOTP for 2FA support
- **Cloud**: Boto3 for AWS integration
- **Email**: Gmail SMTP for notifications
- **Python**: 3.11

### Frontend

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router v7
- **Styling**: Bootstrap 5.3.8 + Custom CSS
- **HTTP Client**: Axios 1.13.6
- **Icons**: Lucide React
- **Utilities**: JWT Decode library
- **Node.js**: 20

### Infrastructure & DevOps

- **Containerization**: Docker (separate backend/frontend images)
- **Registry**: AWS ECR (Elastic Container Registry)
- **Frontend Hosting**: AWS S3 + CloudFront CDN
- **IaC**: Terraform for infrastructure provisioning
- **Domain**: Custom domain with SSL/TLS

---

## 📊 Database Schema

The system uses 11 core database entities:

| Entity                  | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| **User**                | User accounts with roles and weekly hour limits        |
| **Roles**               | Role definitions (admin, user, etc.)                   |
| **Buildings**           | Library buildings with operating hours                 |
| **Closures**            | Planned building closures                              |
| **Rooms**               | Rooms within buildings with layout dimensions          |
| **Devices**             | Physical devices with grid positions (X,Y coordinates) |
| **DeviceType**          | Device categories (computer, printer, etc.)            |
| **DeviceStatus**        | Device availability statuses                           |
| **Reservations**        | User bookings with time slots                          |
| **ReservationStatuses** | Reservation state tracking                             |
| **Settings**            | System configuration (key-value pairs)                 |

---

## 🔌 API Documentation

### Authentication Endpoints

```
POST   /auth/login          - User login (email, password)
POST   /auth/signup         - User registration
```

### User Endpoints

```
GET    /users/all           - List all users (admin only)
GET    /users/me            - Get current user profile
GET    /users/{user_id}     - Get specific user (admin only)
PUT    /users/edit/{user_id} - Update user role/hours (admin only)
DELETE /users/delete/{user_id} - Delete user (admin only)
```

### Building Endpoints

```
GET    /buildings           - List all buildings
POST   /buildings/create    - Create building (admin only)
PUT    /buildings/edit/{buildingId} - Update building (admin only)
DELETE /buildings/delete/{buildingId} - Delete building (admin only)
POST   /buildings/close/{buildingId} - Schedule closure (admin only)
GET    /buildings/{buildingId}/reservations - Get building reservations
```

### Room Endpoints

```
GET    /rooms               - List all rooms
GET    /rooms/{buildingId}  - Get rooms in building
POST   /rooms/new-room      - Create room (admin only)
GET    /rooms/room-layouts/{roomId} - Get room grid layout
PUT    /rooms/room-layouts/{roomId}/edit - Update room dimensions (admin only)
DELETE /rooms/delete-room/{roomId} - Delete room (admin only)
```

### Device Endpoints

```
GET    /devices             - List all devices (admin only)
POST   /devices/create      - Create device (admin only)
GET    /devices/device-positions - Get all device positions
GET    /devices/device-positions/{roomId} - Get devices by room
PUT    /devices/device-positions/edit/{dId} - Update device position
PUT    /devices/edit/{deviceId} - Edit device (admin only)
DELETE /devices/delete/{dId} - Delete device (admin only)
```

### Reservation Endpoints

```
GET    /reservations/all    - All reservations (admin only)
GET    /reservations/{userId} - User's reservations
POST   /reservations/create - Create reservation
GET    /reservations/search - Search reservations by device & date
PUT    /reservations/drop-reservation/{resId} - Cancel reservation
PUT    /reservations/drop-reservations - Cancel multiple (admin only)
DELETE /reservations/delete/{resId} - Delete reservation (admin only)
```

### Configuration Endpoints

```
GET    /device-types        - List device types
GET    /device-statuses     - List device statuses
GET    /settings            - Get all settings (admin only)
PUT    /settings/edit/{settingName} - Update setting (admin only)
```

---

## 🚀 Getting Started

### Prerequisites

- **Backend**: Python 3.11, MySQL 8.0+
- **Frontend**: Node.js 20+, npm/yarn
- **General**: Docker (for containerized deployment)

### Local Development Setup

#### 1. Clone Repository

```bash
git clone <repository-url>
cd CSC_4990_Capstone
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd app-backend

# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows
source .venv/bin/activate      # macOS/Linux

# Install dependencies
cd api
pip install -r requirements.txt

# Configure environment
# Create .env file or set environment variables:
# - DATABASE_URL: MySQL connection string
# - SMTP_EMAIL: Gmail address for notifications
# - SMTP_PASSWORD: Gmail app password
# - JWT_SECRET_KEY: Secret for JWT signing

# Run migrations (if applicable)
# python manage.py migrate

# Start backend server
python main.py
# Server runs on http://localhost:8000
# API docs available at http://localhost:8000/docs
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd app-frontend

# Install dependencies
npm install

# Configure environment
# Create .env file or .env.local:
# - VITE_API_BASE_URL=http://localhost:8000
# - VITE_API_TIMEOUT=10000

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

#### 4. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE womm_db;
CREATE USER 'womm_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON womm_db.* TO 'womm_user'@'localhost';
FLUSH PRIVILEGES;

# Update DATABASE_URL in backend .env:
# DATABASE_URL=mysql+pymysql://womm_user:password@localhost:3306/womm_db
```

### Running Tests

```bash
# Backend unit tests
cd app-backend
python -m pytest unit-tests/

# Test coverage
python -m pytest unit-tests/ --cov=api --cov-report=html
```

---

## 🐳 Docker Deployment

### Build and Run with Docker Compose

```bash
cd docker-files/back
docker-compose up --build

# Frontend container
docker build -f frontend.Dockerfile -t womm-frontend:latest ../..
docker run -p 80:3000 womm-frontend:latest
```

### Build Individual Images

```bash
# Backend
docker build -f docker-files/back/backend.Dockerfile -t womm-backend:latest .
docker run -p 8000:8000 womm-backend:latest

# Frontend
docker build -f docker-files/front/frontend.Dockerfile -t womm-frontend:latest .
docker run -p 3000:80 womm-frontend:latest
```

---

## ☁️ Production Deployment (AWS)

### Infrastructure as Code (Terraform)

```bash
cd terraform

# S3 + CloudFront for frontend
cd s3Cloudfront/
terraform init
terraform apply

# EC2 instance for backend
cd ../front-ec2-deprecated/
terraform init
terraform apply

# S3 bucket setup
cd ../s3-bucket/
terraform init
terraform apply
```

### Deployment Steps

1. **Frontend**: Push to S3 bucket, invalidate CloudFront cache
2. **Backend**: Push Docker image to AWS ECR, update ECS task definition
3. **Database**: Ensure MySQL instance is running and accessible
4. **Environment**: Configure environment variables in AWS Secrets Manager or EC2 Parameter Store

### DNS & SSL

- Frontend: `womm.space` → CloudFront distribution
- API: `api.womm.space` → Load balancer/EC2 instance
- SSL/TLS certificates via AWS Certificate Manager

---

## 📝 Development Guidelines

### Code Organization

- **Backend**: Service layer handles business logic, routes handle HTTP concerns
- **Frontend**: Component-based architecture with separate concerns (pages, components, services, utilities)
- **Database**: SQLModel combines SQLAlchemy and Pydantic for type safety

### Best Practices

- ✅ Use JWT for stateless authentication
- ✅ Validate all input with Pydantic schemas (backend) and form validation (frontend)
- ✅ Implement role-based access control (RBAC) for admin operations
- ✅ Use async/await in FastAPI routes for performance
- ✅ Include comprehensive error handling and logging
- ✅ Write unit tests for critical business logic
- ✅ Use environment variables for configuration

## 📞 Support & Documentation

- **API Documentation**: Available at `/docs` endpoint (Swagger UI)
- **Test Suite**: See `unit-tests/` directory for examples
- **Configuration**: Edit `app-backend/api/core/config.py`

---

## 📄 License

This project is part of a university capstone course (CSC_4990_Capstone).

---

## 👥 Team

Developed as a capstone project by the development team.
Gilbert Salazar
Christopher Maldonado
Nicolas Ruiz
Alejandro Niño

---

## 🔄 Version

- **Current Version**: 1.0.0
- **Python**: 3.11
- **Node.js**: 20
- **Last Updated**: April 2026

---

### Frontend API Connection

Verify `VITE_API_BASE_URL` in frontend `.env.local`:

```
VITE_API_BASE_URL=http://localhost:8000
```

---

**Happy coding! 🚀**
