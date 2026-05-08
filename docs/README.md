# Backend API Documentation

## 1. UML Class Diagram

(./<img width="712" height="1102" alt="UML Diagram drawio" src="https://github.com/user-attachments/assets/41ec8068-2670-4838-9493-b742f5cdd63b" />
)


# Backend API Documentation

## 1. UML Class Diagram

(./UML Diagram drawio)

---

## 2. API Endpoints

### Parent Management

#### Create Parent

**Endpoint:** `POST /parents`  
**Use Case:** US-PAR-001 (Register Parent)  
**Description:** Create a new parent account.

**Request**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "address": "512 Mod ave",
  "phoneNumber": "3478912064",
  "numberOfChildren": 1
}
```

**Response**
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "address": "512 Mod ave",
  "phoneNumber": "3478912064",
  "numberOfChildren": 1
}
```

#### Get Parent By ID

**Endpoint:** `GET /parents/{id}`  
**Use Case:** Parent Profile View  
**Description:** Retrieve a specific parent by ID.

**Example**
```http
GET /parents/1
```

**Response**
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "address": "512 Mod ave",
  "phoneNumber": "3478912064",
  "numberOfChildren": 1
}
```

#### View All Parents

**Endpoint:** `GET /parents`  
**Use Case:** Parent Management  
**Description:** Retrieve all registered parents.

**Example**
```http
GET /parents
```

---

### Babysitter Management

#### Create Babysitter

**Endpoint:** `POST /babysitters`  
**Use Case:** US-BABY-001 (Register Babysitter)  
**Description:** Create a babysitter profile.

**Request**
```json
{
  "name": "Anna Smith",
  "email": "anna@example.com",
  "password": "password123",
  "phoneNumber": "3365552233",
  "hourlyRate": 18.0,
  "rating": 0,
  "verifiedStatus": true,
  "bio": "",
  "availability": ""
}
```

**Response**
```json
{
  "id": 2,
  "name": "Anna Smith",
  "email": "anna@example.com",
  "phoneNumber": "3365552233",
  "hourlyRate": 18.0,
  "rating": 0,
  "verifiedStatus": true,
  "bio": "",
  "availability": ""
}
```

#### Get Babysitter By ID

**Endpoint:** `GET /babysitters/{id}`  
**Use Case:** Babysitter Profile View  
**Description:** Retrieve a specific babysitter profile by ID.

**Example**
```http
GET /babysitters/2
```

#### View All Babysitters

**Endpoint:** `GET /babysitters`  
**Use Case:** Browse Babysitters  
**Description:** Retrieve all babysitter profiles.

**Example**
```http
GET /babysitters
```

#### Update Babysitter Profile

**Endpoint:** `PUT /babysitters/{id}`  
**Use Case:** US-BABY-002 (Update Babysitter Profile)  
**Description:** Update babysitter account information.

**Request**
```json
{
  "name": "Anna Smith",
  "email": "anna@example.com",
  "password": "newpassword123",
  "phoneNumber": "3365552233",
  "hourlyRate": 20.0,
  "rating": 4.8,
  "verifiedStatus": true,
  "bio": "Experienced babysitter",
  "availability": "Weekdays after 4PM"
}
```

#### Delete Babysitter Profile

**Endpoint:** `DELETE /babysitters/{id}`  
**Use Case:** US-BABY-003 (Delete Babysitter Profile)  
**Description:** Remove babysitter account permanently.

**Example**
```http
DELETE /babysitters/2
```

---

### Booking Management

#### Create Booking

**Endpoint:** `POST /bookings`  
**Use Case:** US-BOOK-001 (Book Babysitter)  
**Description:** Parent books a babysitter.

**Request**
```json
{
  "parent": {
    "id": 1
  },
  "babysitter": {
    "id": 2
  },
  "babysitterName": "Anna Smith",
  "date": "2026-03-25",
  "startTime": "18",
  "endTime": "22",
  "totalCost": 72.0,
  "status": "PENDING"
}
```

**Response**
```json
{
  "id": 10,
  "parent": {
    "id": 1
  },
  "babysitter": {
    "id": 2
  },
  "status": "PENDING"
}
```

#### View Bookings

**Endpoint:** `GET /bookings`  
**Use Case:** US-BABY-004 (View Bookings)  
**Description:** Retrieve all bookings and current statuses.

**Example**
```http
GET /bookings
```

#### Accept Booking

**Endpoint:** `PUT /bookings/{id}/accept`  
**Use Case:** US-BABY-005 (Accept Booking)  
**Description:** Babysitter accepts a booking request.

**Example**
```http
PUT /bookings/1/accept
```

**Response**
```json
{
  "id": 1,
  "status": "ACCEPTED"
}
```

#### Decline Booking

**Endpoint:** `PUT /bookings/{id}/decline`  
**Use Case:** US-BABY-006 (Decline Booking)  
**Description:** Babysitter declines a booking request.

**Example**
```http
PUT /bookings/1/decline
```

**Response**
```json
{
  "id": 1,
  "status": "DECLINED"
}
```

#### Delete Booking

**Endpoint:** `DELETE /bookings/{id}`  
**Use Case:** Booking Cancellation  
**Description:** Cancel and remove a booking.

**Example**
```http
DELETE /bookings/10
```

---

### Payment Management

#### Create Payment

**Endpoint:** `POST /payments`  
**Use Case:** US-PAY-001 (Make Payment)  
**Description:** Process payment for a booking.

**Request**
```json
{
  "bookingId": 10,
  "amount": 72.0,
  "status": "PAID"
}
```

**Response**
```json
{
  "id": 5,
  "bookingId": 10,
  "amount": 72.0,
  "status": "PAID"
}
```

#### View Payments

**Endpoint:** `GET /payments`  
**Use Case:** US-BABY-007 (View Payments)  
**Description:** Babysitter views payment records associated with bookings.

**Example**
```http
GET /payments
```

---

### Review Management

#### Create Review

**Endpoint:** `POST /reviews`  
**Use Case:** US-REV-001 (Leave Review)  
**Description:** Parent leaves a review for a babysitter.

**Request**
```json
{
  "rating": 5,
  "comment": "Great service!",
  "babysitter": {
    "id": 2
  }
}
```

**Response**
```json
{
  "reviewID": 3,
  "rating": 5,
  "comment": "Great service!"
}
```

#### View Reviews

**Endpoint:** `GET /reviews`  
**Use Case:** US-BABY-008 (View Reviews)  
**Description:** Babysitter views ratings and feedback left by parents.

**Example**
```http
GET /reviews
```

#### Delete Review

**Endpoint:** `DELETE /reviews/{id}`  
**Use Case:** Review Management  
**Description:** Delete a review entry.

**Example**
```http
DELETE /reviews/3
```

---

### Message Management

#### Send Message

**Endpoint:** `POST /messages/send/{senderId}/{receiverId}`  
**Use Case:** US-MSG-001 (Send Message)  
**Description:** Send a message between parents and babysitters.

**Request**
```json
{
  "content": "Hi, are you available?",
  "timestamp": "2026-05-05"
}
```

**Response**
```json
{
  "id": 7,
  "content": "Hi, are you available?",
  "timestamp": "2026-05-05"
}
```

#### View Messages

**Endpoint:** `GET /messages`  
**Use Case:** Messaging System  
**Description:** Retrieve all stored messages.

**Example**
```http
GET /messages
```

---

## 3. Use Case Mapping

| Use Case | API Endpoint | Description |
|---|---|---|
| Register Parent | `POST /parents` | Allows a parent to create an account |
| View Parent | `GET /parents/{id}` | Retrieves a specific parent |
| View All Parents | `GET /parents` | Lists all parents |
| Register Babysitter | `POST /babysitters` | Allows babysitter account creation |
| View Babysitters | `GET /babysitters` | Lists all babysitters |
| Update Babysitter Profile | `PUT /babysitters/{id}` | Updates babysitter information |
| Delete Babysitter Profile | `DELETE /babysitters/{id}` | Removes babysitter account |
| Create Booking | `POST /bookings` | Parent books a babysitter |
| View Bookings | `GET /bookings` | Displays booking records |
| Accept Booking | `PUT /bookings/{id}/accept` | Babysitter accepts booking |
| Decline Booking | `PUT /bookings/{id}/decline` | Babysitter declines booking |
| Cancel Booking | `DELETE /bookings/{id}` | Removes a booking |
| Create Payment | `POST /payments` | Processes booking payment |
| View Payments | `GET /payments` | Displays payment records |
| Send Message | `POST /messages/send/{senderId}/{receiverId}` | Sends a message between users |
| View Messages | `GET /messages` | Displays all messages |
| Leave Review | `POST /reviews` | Parent leaves a babysitter review |
| View Reviews | `GET /reviews` | Babysitter views feedback |
| Delete Review | `DELETE /reviews/{id}` | Removes review entry |

---

## 4. Frontend Features

### Parent Features
- Parent registration and login
- Browse babysitters
- View babysitter profiles
- Book babysitters
- View bookings
- Cancel bookings
- Make payments
- Send messages to babysitters
- Leave reviews for babysitters

### Babysitter Features
- Babysitter registration and login
- Automatically verified account creation
- View and update profile
- View bookings
- Accept and decline bookings
- View reviews from parents
- Message parents
- Delete babysitter profile

---


## Project Structure

### Backend (`backend-api`)
Handles:
- REST API endpoints
- Database operations
- Business logic
- Authentication logic
- Booking/payment processing

Main layers:
- Controller layer
- Service layer
- Repository layer
- Entity/model layer

### Frontend (`high-fidelity-prototype`)
Handles:
- User interface
- Forms and dashboards
- API requests using fetch()
- Local storage/session management

## 5. How To Run

1. Clone repository
2. Open project in VSCode
3. Run Spring Boot backend application
4. Open frontend with five Server (or live server) 
5. Open `home.html`
