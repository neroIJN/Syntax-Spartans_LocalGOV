# LocalGOV System - Entity Relationship (ER) Diagram Specification

## Overview
This document provides a comprehensive specification for drawing the Entity Relationship (ER) diagram for the Sri Lankan Government Services Portal (LocalGOV) system, covering both citizen and officer modules.

---

## Core Entities

### 1. **User** (Central Entity)
**Description**: Represents all system users including citizens, officers, and administrators.

**Attributes**:
- `user_id` (Primary Key, UUID)
- `national_id` (Unique, String) - Sri Lankan National ID
- `first_name` (String, Required)
- `last_name` (String, Required)
- `email` (Unique, String, Required)
- `phone` (String, Required)
- `password_hash` (String, Required)
- `role` (Enum: 'citizen', 'officer', 'admin')
- `is_active` (Boolean, Default: true)
- `is_verified` (Boolean, Default: false)
- `profile_image` (String, URL)
- `date_of_birth` (Date)
- `gender` (Enum: 'male', 'female', 'other')
- `preferred_language` (Enum: 'english', 'sinhala', 'tamil')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Sub-entities**:
- `Address` (Embedded):
  - `street` (String)
  - `city` (String)
  - `district` (String)
  - `postal_code` (String)
- `Notifications_Settings` (Embedded):
  - `email_enabled` (Boolean, Default: true)
  - `sms_enabled` (Boolean, Default: true)

---

### 2. **Service** (Core Business Entity)
**Description**: Represents government services available for booking.

**Attributes**:
- `service_id` (Primary Key, UUID)
- `name` (String, Required)
- `description` (Text, Required)
- `category` (Enum: 'civil_registration', 'business_registration', 'land_services', 'taxation', 'licensing', 'social_services', 'health_services', 'education', 'transport', 'other')
- `department` (String, Required)
- `is_active` (Boolean, Default: true)
- `is_online` (Boolean, Default: false)
- `appointment_required` (Boolean, Default: true)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Sub-entities**:
- `Required_Documents` (Array):
  - `document_name` (String, Required)
  - `description` (String)
  - `is_mandatory` (Boolean, Default: true)
- `Fees`:
  - `amount` (Decimal, Default: 0)
  - `currency` (String, Default: 'LKR')
  - `payment_methods` (Array of Enum: 'cash', 'card', 'bank_transfer', 'online')
- `Processing_Time`:
  - `estimated_duration` (String, Required)
  - `time_unit` (Enum: 'minutes', 'hours', 'days', 'weeks')
- `Eligibility`:
  - `min_age` (Integer)
  - `max_age` (Integer)
  - `citizenship_requirement` (Enum: 'sri_lankan', 'any')
  - `additional_requirements` (Array of String)
- `Available_Slots` (Array):
  - `day_of_week` (Enum: 'monday' to 'sunday')
  - `start_time` (Time)
  - `end_time` (Time)
  - `slot_duration_minutes` (Integer, Default: 30)
- `Service_Locations` (Array):
  - `location_name` (String)
  - `address` (String)
  - `latitude` (Decimal)
  - `longitude` (Decimal)
  - `contact_phone` (String)
  - `contact_email` (String)
- `Process_Steps` (Array):
  - `step_number` (Integer)
  - `step_title` (String)
  - `step_description` (String)
  - `estimated_time` (String)
- `Frequently_Asked_Questions` (Array):
  - `question` (String)
  - `answer` (Text)
- `Contact_Information`:
  - `phone` (String)
  - `email` (String)
  - `website` (String)

---

### 3. **Appointment** (Primary Transaction Entity)
**Description**: Represents appointment bookings between citizens and government services.

**Attributes**:
- `appointment_id` (Primary Key, UUID)
- `citizen_id` (Foreign Key → User.user_id)
- `service_id` (Foreign Key → Service.service_id)
- `assigned_officer_id` (Foreign Key → User.user_id, Nullable)
- `appointment_date` (Date, Required)
- `time_slot` (String, Required) - e.g., "09:00-09:30"
- `status` (Enum: 'pending', 'confirmed', 'completed', 'cancelled', 'rescheduled')
- `department` (String, Required)
- `queue_number` (Integer)
- `estimated_wait_time_minutes` (Integer)
- `priority` (Enum: 'low', 'normal', 'high', 'urgent')
- `description` (Text, Max: 500 chars)
- `cancellation_reason` (Text, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Sub-entities**:
- `Location`:
  - `location_name` (String, Required)
  - `address` (String, Required)
  - `latitude` (Decimal)
  - `longitude` (Decimal)
- `Notes`:
  - `citizen_notes` (Text)
  - `officer_notes` (Text)
  - `admin_notes` (Text)
- `Reschedule_History` (Array):
  - `old_date` (Date)
  - `new_date` (Date)
  - `reason` (String)
  - `rescheduled_by_user_id` (Foreign Key → User.user_id)
  - `rescheduled_at` (Timestamp)
- `Feedback`:
  - `rating` (Integer, 1-5)
  - `comment` (Text)
  - `submitted_at` (Timestamp)

---

### 4. **Document** (Supporting Entity)
**Description**: Represents documents uploaded or required for services.

**Attributes**:
- `document_id` (Primary Key, UUID)
- `user_id` (Foreign Key → User.user_id)
- `appointment_id` (Foreign Key → Appointment.appointment_id, Nullable)
- `service_id` (Foreign Key → Service.service_id, Nullable)
- `document_name` (String, Required)
- `original_filename` (String, Required)
- `file_type` (String) - MIME type
- `file_size_bytes` (Integer)
- `file_url` (String, Required) - MinIO/S3 URL
- `document_category` (Enum: 'identity', 'address_proof', 'income_proof', 'educational', 'medical', 'other')
- `verification_status` (Enum: 'pending', 'verified', 'rejected')
- `verified_by_officer_id` (Foreign Key → User.user_id, Nullable)
- `verification_notes` (Text)
- `verified_at` (Timestamp, Nullable)
- `expiry_date` (Date, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

---

### 5. **Payment** (Financial Entity)
**Description**: Represents payment transactions for government services.

**Attributes**:
- `payment_id` (Primary Key, UUID)
- `user_id` (Foreign Key → User.user_id)
- `appointment_id` (Foreign Key → Appointment.appointment_id, Nullable)
- `service_id` (Foreign Key → Service.service_id)
- `amount` (Decimal, Required)
- `currency` (String, Default: 'LKR')
- `payment_method` (Enum: 'cash', 'card', 'bank_transfer', 'online_gateway')
- `payment_status` (Enum: 'pending', 'completed', 'failed', 'refunded', 'cancelled')
- `transaction_reference` (String, Unique)
- `gateway_transaction_id` (String, Nullable)
- `payment_gateway` (String, Nullable) - e.g., 'PayHere', 'Bank'
- `processing_fee` (Decimal, Default: 0)
- `net_amount` (Decimal)
- `paid_at` (Timestamp, Nullable)
- `refund_amount` (Decimal, Default: 0)
- `refunded_at` (Timestamp, Nullable)
- `refund_reason` (Text, Nullable)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Sub-entities**:
- `Payment_Details`:
  - `card_last_four` (String, Nullable)
  - `bank_reference` (String, Nullable)
  - `receipt_number` (String, Nullable)

---

### 6. **Notification** (Communication Entity)
**Description**: Represents system notifications sent to users.

**Attributes**:
- `notification_id` (Primary Key, UUID)
- `user_id` (Foreign Key → User.user_id)
- `appointment_id` (Foreign Key → Appointment.appointment_id, Nullable)
- `title` (String, Required)
- `message` (Text, Required)
- `notification_type` (Enum: 'appointment_confirmation', 'appointment_reminder', 'document_verification', 'payment_confirmation', 'service_update', 'system_announcement')
- `priority` (Enum: 'low', 'normal', 'high', 'urgent')
- `delivery_method` (Enum: 'in_app', 'email', 'sms', 'push')
- `is_read` (Boolean, Default: false)
- `read_at` (Timestamp, Nullable)
- `sent_at` (Timestamp)
- `delivery_status` (Enum: 'pending', 'sent', 'delivered', 'failed')
- `created_at` (Timestamp)

---

### 7. **Department** (Organizational Entity)
**Description**: Represents government departments offering services.

**Attributes**:
- `department_id` (Primary Key, UUID)
- `department_name` (String, Required, Unique)
- `department_code` (String, Required, Unique)
- `description` (Text)
- `head_officer_id` (Foreign Key → User.user_id, Nullable)
- `contact_email` (String)
- `contact_phone` (String)
- `office_address` (Text)
- `working_hours` (JSON) - Days and times
- `is_active` (Boolean, Default: true)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

---

### 8. **Officer_Assignment** (Relationship Entity)
**Description**: Manages assignment of officers to departments and services.

**Attributes**:
- `assignment_id` (Primary Key, UUID)
- `officer_id` (Foreign Key → User.user_id)
- `department_id` (Foreign Key → Department.department_id)
- `service_id` (Foreign Key → Service.service_id, Nullable)
- `assignment_type` (Enum: 'department_head', 'service_specialist', 'general_officer')
- `start_date` (Date, Required)
- `end_date` (Date, Nullable)
- `is_active` (Boolean, Default: true)
- `created_at` (Timestamp)

---

### 9. **System_Audit_Log** (Monitoring Entity)
**Description**: Tracks all system activities for security and compliance.

**Attributes**:
- `log_id` (Primary Key, UUID)
- `user_id` (Foreign Key → User.user_id, Nullable)
- `action` (String, Required) - e.g., 'login', 'appointment_created', 'document_uploaded'
- `entity_type` (String) - e.g., 'User', 'Appointment', 'Document'
- `entity_id` (String, Nullable)
- `old_values` (JSON, Nullable)
- `new_values` (JSON, Nullable)
- `ip_address` (String)
- `user_agent` (String)
- `success` (Boolean)
- `error_message` (Text, Nullable)
- `created_at` (Timestamp)

---

### 10. **Service_Report** (Analytics Entity)
**Description**: Stores analytical data and reports for officers and administrators.

**Attributes**:
- `report_id` (Primary Key, UUID)
- `generated_by_officer_id` (Foreign Key → User.user_id)
- `report_type` (Enum: 'daily_appointments', 'service_usage', 'department_performance', 'citizen_satisfaction', 'financial_summary')
- `report_period_start` (Date)
- `report_period_end` (Date)
- `report_data` (JSON) - Aggregated statistics
- `file_url` (String, Nullable) - Generated report file
- `created_at` (Timestamp)

---

## Entity Relationships

### Primary Relationships

1. **User → Appointment** (1:M)
   - A citizen can have multiple appointments
   - Relationship: `User.user_id = Appointment.citizen_id`

2. **User → Appointment** (1:M) - Officer Assignment
   - An officer can be assigned to multiple appointments
   - Relationship: `User.user_id = Appointment.assigned_officer_id`

3. **Service → Appointment** (1:M)
   - A service can have multiple appointments
   - Relationship: `Service.service_id = Appointment.service_id`

4. **User → Document** (1:M)
   - A user can upload multiple documents
   - Relationship: `User.user_id = Document.user_id`

5. **Appointment → Document** (1:M)
   - An appointment can have multiple associated documents
   - Relationship: `Appointment.appointment_id = Document.appointment_id`

6. **User → Payment** (1:M)
   - A user can make multiple payments
   - Relationship: `User.user_id = Payment.user_id`

7. **Appointment → Payment** (1:1)
   - Each appointment can have one payment
   - Relationship: `Appointment.appointment_id = Payment.appointment_id`

8. **Service → Payment** (1:M)
   - A service can have multiple payments
   - Relationship: `Service.service_id = Payment.service_id`

9. **User → Notification** (1:M)
   - A user can receive multiple notifications
   - Relationship: `User.user_id = Notification.user_id`

10. **Department → User** (1:M) - Officer Assignment
    - A department can have multiple officers
    - Relationship: `Department.department_id = Officer_Assignment.department_id`

11. **User → Officer_Assignment** (1:M)
    - An officer can have multiple assignments
    - Relationship: `User.user_id = Officer_Assignment.officer_id`

12. **Department → Service** (1:M)
    - A department can offer multiple services
    - Relationship: `Department.department_name = Service.department` (String-based)

### Secondary Relationships

13. **User → System_Audit_Log** (1:M)
    - A user's actions generate multiple audit logs
    - Relationship: `User.user_id = System_Audit_Log.user_id`

14. **User → Service_Report** (1:M)
    - An officer can generate multiple reports
    - Relationship: `User.user_id = Service_Report.generated_by_officer_id`

15. **User → Document** (1:M) - Verification
    - An officer can verify multiple documents
    - Relationship: `User.user_id = Document.verified_by_officer_id`

---

## ER Diagram Drawing Instructions

### Entity Representation
- **Rectangles**: Use for all main entities (User, Service, Appointment, etc.)
- **Double Rectangles**: Use for weak entities if any
- **Diamonds**: Use for relationships between entities
- **Ellipses**: Use for attributes
- **Double Ellipses**: Use for multivalued attributes (arrays)
- **Dashed Ellipses**: Use for derived attributes

### Cardinality Notation
- **1:1**: One-to-One (rare in this system)
- **1:M**: One-to-Many (most common)
- **M:N**: Many-to-Many (use junction tables)

### Key Attributes
- **Underline**: Primary keys
- **Double Underline**: Composite primary keys
- **Dotted Underline**: Foreign keys

### Color Coding Suggestion
- **Blue**: Core entities (User, Service, Appointment)
- **Green**: Supporting entities (Document, Payment, Notification)
- **Orange**: Administrative entities (Department, Officer_Assignment)
- **Purple**: Monitoring entities (System_Audit_Log, Service_Report)

### Layout Recommendations
1. Place **User** entity at the center as it's the most connected
2. Position **Service** and **Appointment** prominently as core business entities
3. Group related entities together (e.g., Payment and Service fees)
4. Keep administrative entities on one side
5. Place monitoring/audit entities at the bottom

---

## Officer Module Specific Entities

The officer module primarily uses the same entities but with different access patterns:

### Officer Dashboard Features:
- **View all appointments** assigned to them
- **Manage citizen documents** (verify/reject)
- **Generate reports** using Service_Report entity
- **Oversee department services** through Department and Officer_Assignment
- **Process payments** and handle refunds
- **Send notifications** to citizens
- **Access audit logs** for compliance

### Officer-Specific Views:
- All entities are shared, but officers have:
  - **Administrative privileges** on appointments
  - **Verification rights** on documents
  - **Reporting capabilities** through Service_Report
  - **Department management** through Officer_Assignment

---

## Database Indexes (Performance Optimization)

### Primary Indexes:
1. `User.national_id` (Unique)
2. `User.email` (Unique)
3. `Appointment.citizen_id, appointment_date`
4. `Appointment.assigned_officer_id, appointment_date`
5. `Appointment.status, appointment_date`
6. `Service.category, is_active`
7. `Service.department, is_active`
8. `Document.user_id, created_at`
9. `Payment.user_id, created_at`
10. `Notification.user_id, is_read`

---

## Security Considerations

### Data Protection:
- **Sensitive Data**: National ID, passwords (hashed), payment details
- **Access Control**: Role-based permissions (citizen/officer/admin)
- **Audit Trail**: All actions logged in System_Audit_Log
- **Document Security**: File access through secure URLs with expiration
- **Payment Security**: No storage of full card details, only last 4 digits

### Compliance:
- **Sri Lankan Data Protection**: National ID handling compliance
- **Government Standards**: Audit logging for transparency
- **Financial Regulations**: Payment processing compliance

---

This comprehensive specification provides all the information needed to create a detailed ER diagram for your LocalGOV system, covering both citizen and officer modules with all necessary relationships, attributes, and business rules.
