# LocalGov: Sri Lankan Government Services Portal

LocalGov is a comprehensive, microservices-based appointment booking system for Sri Lankan government services, specifically focusing on Grama Niladhari and Divisional Secretariat services.

## 🏗️ Architecture Overview

This system implements a complete microservices architecture with two frontend applications:

### Frontend Applications
- **frontend-citizen**: Next.js 14+ citizen portal (public-facing)
- **frontend-officer**: Next.js 14+ officer dashboard (internal)

### Microservices
- **iam-service**: User authentication & authorization (Node.js/PostgreSQL)
- **servicedirectory-service**: Service catalog & requirements (Node.js/MongoDB)
- **appointment-booking-service**: Core booking engine (Go/PostgreSQL)
- **document-management-service**: File uploads & storage (Python/MinIO)
- **payment-service**: Payment processing (Node.js/PostgreSQL)
- **notification-service**: Email/SMS notifications (Node.js/RabbitMQ)

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd Syntax-Spartans_LocalGOV

# Start all services
docker-compose up -d

# Access the applications
# Citizen Portal: http://localhost:3000
# Officer Dashboard: http://localhost:3001
# API Gateway: http://localhost:8080
```

## 📁 Project Structure

```
LocalGov/
├── frontend-citizen/          # Next.js citizen portal
├── frontend-officer/          # Next.js officer dashboard
├── services/
│   ├── iam-service/          # Authentication service (Node.js)
│   ├── servicedirectory-service/  # Service catalog (Node.js)
│   ├── appointment-booking-service/  # Booking engine (Go)
│   ├── document-management-service/  # Document handling (Python)
│   ├── payment-service/      # Payment processing (Node.js)
│   └── notification-service/ # Notifications (Node.js)
├── docker-compose.yml        # Complete system orchestration
├── api-gateway/             # API Gateway configuration
└── docs/                    # API documentation
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+, Tailwind CSS, TypeScript
- **Backend**: Go (Gin), Node.js (Fastify), Python (FastAPI)
- **Databases**: PostgreSQL 16+, MongoDB, Redis
- **Infrastructure**: Docker, Docker Compose, MinIO, RabbitMQ
- **Authentication**: JWT with Role-Based Access Control

## 🔧 Development Setup

Detailed setup instructions will be provided as each service is implemented.

## 📚 API Documentation

API documentation will be available at:
- Swagger UI: http://localhost:8080/docs
- OpenAPI 3.0 specifications in `/docs` directory

## 🏛️ Government Services Supported

- Grama Niladhari Services
- Divisional Secretariat Services
- Document Verification
- Appointment Scheduling
- Fee Processing

---

**Development Status**: 🚧 Under Active Development