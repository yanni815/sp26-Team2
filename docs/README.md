# Backend API Documentation

## 1. UML Class Diagram

![UML Diagram](./<img width="712" height="1102" alt="UML Diagram drawio" src="https://github.com/user-attachments/assets/41ec8068-2670-4838-9493-b742f5cdd63b" />
)

**Classes to include (example):**
- User / Babysitter (inheritance if applicable)
- Availability
- Message / Conversation
- Relationships between classes (associations, aggregations, etc.)

---

## 2. API Endpoints



| Method | Endpoint | Description | Request Body | Response |
|--------|---------|-------------|--------------|---------|
|  GET  |    /parents     |             |              |         |
| POST   | /parents 
|  PUT   | /parents/1
| DELETE | /parents/1

|  GET  |    /babysitters     |             |              |         |
| POST   | /babysitters  
|  PUT   | /babysitters /1
| DELETE | /babysitters/1

|  GET  |    /bookings    |             |              |         |
| POST   | /bookings  
|  PUT   | /bookings/1
| DELETE |  /bookings/1

|  GET  |    /payments     |             |              |         |
| POST   |
|  PUT   |
| DELETE |

|  GET  |    /messages     |             |              |         |
| POST   |
|  PUT   |
| DELETE |

|  GET  |    /reviews    |             |              |         |
| POST   |
|  PUT   |
| DELETE |

---

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






[Demo Link](https://your-demo-link.com)

