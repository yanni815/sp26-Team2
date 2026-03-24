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
Endpoint: GET /customers/{id} Use Case: Customer profile view Description: Retrieve specific customer by ID.
```
GET /customers/1

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







