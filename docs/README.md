# Backend API Documentation

## 1. UML Class Diagram

(./<img width="712" height="1102" alt="UML Diagram drawio" src="https://github.com/user-attachments/assets/41ec8068-2670-4838-9493-b742f5cdd63b" />
)


---

## 2. API Endpoints
### Parent Management

#### Create Parent

**Endpoint:** POST /parents  
**Use Case:** US-PAR-001 (Register Parent)  
**Description:** Create a new parent account.
```json
POST /parents
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
"address": "512 Mod ave",
"phoneNumber": 3478912064,
"numberOfChildren": 1
```
Response
```
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com"
 "password": "password123",
"address": "512 Mod ave",
"phoneNumber": 3478912064,
"numberOfChildren": 1
}

```
Get parent by ID
Endpoint: GET /parents/{id} Use Case: Customer profile view Description: Retrieve specific customer by ID.
```
GET /parents/1

```
Babysitter Management
Create Babysitter

Endpoint: POST /babysitters
Use Case: US-BABY-001 (Register Babysitter)
Description: Create a babysitter profile.
```
POST /babysitters
Content-Type: application/json

{
  "name": "Anna Smith",
  "experience": 3,
  "rate": 15.0
}
```
Response:
```
{
  "id": 2,
  "name": "Anna Smith",
  "experience": 3,
  "rate": 15.0
}
```


Booking Management
Create Booking

Endpoint: POST /bookings
Use Case: US-BOOK-001 (Book Babysitter)
Description: Parent books a babysitter.
```
POST /bookings
Content-Type: application/json

{
  "parentId": 1,
  "babysitterId": 2,
  "date": "2026-03-25",
  "time": "18:00"
}
```
Response:
```
{
  "id": 10,
  "parentId": 1,
  "babysitterId": 2,
  "status": "CONFIRMED"
}

```
Payment Management
Create Payment

Endpoint: POST /payments
Use Case: US-PAY-001 (Make Payment)
Description: Process payment for a booking.
```
POST /payments
Content-Type: application/json

{
  "bookingId": 10,
  "amount": 45.00,
  "status": "PAID"
}
```
Response:

{
  "id": 5,
  "bookingId": 10,
  "amount": 45.00,
  "status": "PAID"
}



Review Management
Create Review

Endpoint: POST /reviews
Use Case: US-REV-001 (Leave Review)
Description: Parent leaves a review for a babysitter.
```
POST /reviews
Content-Type: application/json

{
  "parentId": 1,
  "babysitterId": 2,
  "rating": 5,
  "comment": "Great service!"
}
```
Response:

{
  "id": 3,
  "rating": 5,
  "comment": "Great service!"
}

Message Management
Send Message

Endpoint: POST /messages
Use Case: US-MSG-001 (Send Message)
Description: Send a message between users.
```
POST /messages
Content-Type: application/json

{
  "senderId": 1,
  "receiverId": 2,
  "content": "Hi, are you available?"
}
```
Response:
```
{
  "id": 7,
  "senderId": 1,
  "receiverId": 2,
  "content": "Hi, are you available?"
}

---


```
## 3. Use Case Mapping

| Use Case | API Endpoint | Description |
|----------|-------------|-------------|
| User Registration | POST /users | Allows a new user to sign up |
| View All Users | GET /users | Lists all registered users |
| Update Profile | PUT /users/{id} | Edit user information |
| Add parent | POST /parents | Adds parents to the system |
| Add sitter | POST /babysitters| Adds babysitters to the system|
|Add payment| POST /payments | Parents can pay the babysitter 
| Send Message | POST /messages/send | Users can send messages to each other |
| Leave review| POST /review | parents can leave reviews for sitters 


### Babysitter Operations

#### Create Availability

**Endpoint:** POST /availability  
**Use Case:** US-BABY-002 (Set Availability)  
**Description:** Babysitter creates and updates their available working schedule.
```json
POST /availability
Content-Type: application/json

{
  "day": "Monday",
  "startTime": "16:00",
  "endTime": "22:00",
  "babysitter": {
    "id": 1
  }
}
```
Response:
```

{
  "id": 1,
  "day": "Monday",
  "startTime": "16:00",
  "endTime": "22:00",
  "babysitter": {
    "id": 1
  }
}
```
View Availability

Endpoint: GET /availability/babysitter/{id}
Use Case: US-BABY-003 (View Availability)
Description: Retrieve all availability entries for a specific babysitter.
```
GET /availability/babysitter/1
```
Booking Management 
Accept Booking

Endpoint: PUT /bookings/{id}
Use Case: US-BABY-004 (Accept Booking)
Description: Babysitter updates booking status to ACCEPTED.
```

PUT /bookings/1
Content-Type: application/json

{
  "parent": { "id": 1 },
  "babysitter": { "id": 1 },
  "date": "2026-03-25",
  "startTime": "18:00",
  "endTime": "22:00",
  "totalCost": 72.0,
  "status": "ACCEPTED"
}

```
Response:
```
{
  "id": 1,
  "status": "ACCEPTED"
}
```
Decline Booking

Endpoint: PUT /bookings/{id}
Use Case: US-BABY-005 (Decline Booking)
Description: Babysitter updates booking status to DECLINED.
```

PUT /bookings/1
Content-Type: application/json

{
  "parent": { "id": 1 },
  "babysitter": { "id": 1 },
  "date": "2026-03-25",
  "startTime": "18:00",
  "endTime": "22:00",
  "totalCost": 72.0,
  "status": "DECLINED"
}

```
View Bookings

Endpoint: GET /bookings
Use Case: US-BABY-006 (View Bookings)
Description: Retrieve all bookings and their current status.
```

GET /bookings

```

Payment Management 
View Payments

Endpoint: GET /payments
Use Case: US-BABY-007 (View Payments)
Description: Babysitter views payment records associated with bookings.
```

GET /payments
```
Review Management (Babysitter Perspective)
View Reviews

Endpoint: GET /reviews
Use Case: US-BABY-008 (View Reviews)
Description: Babysitter views ratings and feedback left by parents.
```
GET /reviews
```
## 3. Use Case Mapping (Babysitter)

| Use Case | API Endpoint | Description |
|----------|-------------|-------------|
| Set availability | POST /availability | Babysitter sets working schedule |
| View availability | GET /availability/babysitter/{id} | View babysitter availability |
| Accept booking | PUT /bookings/{id} | Babysitter accepts booking request |
| Decline booking | PUT /bookings/{id} | Babysitter declines booking request |
| View bookings | GET /bookings | Babysitter views all bookings |
| View payments | GET /payments | Babysitter views payment records |
| View reviews | GET /reviews | Babysitter views feedback from parents |
