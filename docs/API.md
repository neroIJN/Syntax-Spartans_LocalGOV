# e-Services API Documentation

## Overview

This document provides comprehensive API documentation for the e-Services platform - a centralized appointment booking system for Sri Lankan government services.

## Architecture

The system follows a microservices architecture with the following services:

### Core Services

1. **IAM Service** (Port 3010)
   - User authentication and authorization
   - JWT token management
   - Role-based access control

2. **Service Directory Service** (Port 3011)
   - Government services catalog
   - Service requirements and documentation
   - Eligibility checking

3. **Appointment Booking Service** (Port 3012)
   - Core appointment scheduling
   - Slot management
   - Booking lifecycle

4. **Document Management Service** (Port 3013)
   - File upload and storage
   - Document verification
   - Secure access

5. **Payment Service** (Port 3014)
   - Payment gateway integration
   - Transaction management
   - Fee processing

6. **Notification Service** (Port 3015)
   - Email notifications
   - SMS alerts
   - Message queuing

### Frontend Applications

1. **Citizen Portal** (Port 3000)
   - Public-facing application
   - Service discovery and booking
   - User account management

2. **Officer Dashboard** (Port 3001)
   - Internal officer tools
   - Appointment management
   - Document verification

### Infrastructure

- **API Gateway** (Port 8080)
- **PostgreSQL** (Port 5432)
- **MongoDB** (Port 27017)
- **Redis** (Port 6379)
- **RabbitMQ** (Port 5672)
- **MinIO** (Port 9000)

## Authentication

All API endpoints (except public ones) require JWT authentication:

```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### IAM Service (`/api/auth`)

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

#### User Management
- `GET /api/auth/users/profile` - Get user profile
- `PUT /api/auth/users/profile` - Update user profile
- `GET /api/auth/users` - List users (admin)
- `POST /api/auth/users` - Create user (admin)
- `PUT /api/auth/users/:id` - Update user (admin)
- `DELETE /api/auth/users/:id` - Delete user (admin)

### Service Directory (`/api/services`)

#### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `GET /api/services/categories` - List service categories
- `GET /api/services/search` - Search services

#### Requirements
- `GET /api/services/:id/requirements` - Get service requirements
- `GET /api/services/:id/documents` - Get required documents
- `GET /api/services/:id/fees` - Get service fees

### Appointments (`/api/appointments`)

#### Booking
- `GET /api/appointments/slots` - Get available slots
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

#### Management
- `GET /api/appointments` - List user appointments
- `GET /api/appointments/upcoming` - Get upcoming appointments
- `GET /api/appointments/history` - Get appointment history
- `PUT /api/appointments/:id/reschedule` - Reschedule appointment

#### Officer Actions
- `PUT /api/appointments/:id/checkin` - Check-in citizen
- `PUT /api/appointments/:id/verify` - Verify documents
- `PUT /api/appointments/:id/complete` - Mark completed
- `GET /api/appointments/daily` - Get daily appointments (officer)

### Documents (`/api/documents`)

#### Upload
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/:id` - Download document
- `DELETE /api/documents/:id` - Delete document

#### Management
- `GET /api/documents` - List user documents
- `PUT /api/documents/:id/verify` - Verify document (officer)
- `GET /api/documents/appointment/:appointmentId` - Get appointment documents

### Payments (`/api/payments`)

#### Processing
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/:id` - Get payment details
- `GET /api/payments/appointment/:appointmentId` - Get appointment payment

#### Management
- `GET /api/payments` - List user payments
- `GET /api/payments/history` - Payment history
- `POST /api/payments/refund` - Request refund (admin)

### Notifications (`/api/notifications`)

#### User Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

#### System Notifications
- `POST /api/notifications/send` - Send notification (system)
- `GET /api/notifications/stats` - Notification statistics (admin)

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details"
  },
  "timestamp": "2024-08-14T10:30:00Z",
  "path": "/api/endpoint"
}
```

### Common Error Codes
- `UNAUTHORIZED` - Invalid or missing authentication
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid request data
- `INTERNAL_ERROR` - Server error

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited:
- Authentication endpoints: 5 requests per minute
- General endpoints: 100 requests per minute
- File upload endpoints: 10 requests per minute

## Development Setup

See the main README.md for development setup instructions.

## Testing

Each service includes comprehensive test suites covering:
- Unit tests
- Integration tests
- API endpoint tests
- Authentication tests

## Deployment

The entire system can be deployed using Docker Compose:

```bash
docker-compose up -d
```

Individual services can be scaled as needed.
