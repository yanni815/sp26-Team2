# MVC Architecture Mapping

## Parent Registration

Model:
- Parent entity
- ParentRepository

View:
- signup.html

Controller:
- ParentController
- signup() JavaScript function


---

## Parent Login

Model:
- Parent entity
- ParentRepository

View:
- login.html

Controller:
- ParentController
- login() JavaScript function

---

## Babysitter Registration

Model:
- Babysitter entity
- BabysitterRepository

View:
- babysitter-sign-up.html

Controller:
- BabysitterController
- createBabysitter() JavaScript function

---

## Babysitter Login

Model:
- Babysitter entity
- BabysitterRepository

View:
- babysitter-login.html

Controller:
- BabysitterController
- loginBabysitter() JavaScript function

---

## Create Booking

Model:
- Booking entity
- BookingRepository

View:
- dashboard.html
- bookings.html

Controller:
- BookingController
- BookingService

---


## Update Booking Status

Model:
- Booking entity

View:
- bookings.html

Controller:
- BookingController
- payNow()
- acceptBooking()
- declineBooking()

---

## Babysitter Dashboard

Model:
- Booking entity
- Babysitter entity

View:
- babysitter-dashboard.html

Controller:
- BookingController
- loadBabysitterDashboard()

---


## Babysitter Profile Management

Model:
- Babysitter entity
- BabysitterRepository

View:
- babysitter-profile.html

Controller:
- BabysitterController
- saveBabysitterProfile()

---

## Parent Profile Management

Model:
- Parent entity
- ParentRepository

View:
- parent-profile.html

Controller:
- ParentController
- loadProfile()

---

## Messaging System

Model:
- Message entity
- MessageRepository

View:
- messages.html

Controller:
- MessageController
- sendBabysitterMessage()
- loadConversation()

---

## Reviews System

Model:
- Review entity
- ReviewRepository

View:
- reviews.html

Controller:
- ReviewController
- addReview()
- deleteReview()

---

## Payment Processing

Model:
- Booking entity

View:
- bookings.html

Controller:
- BookingController
- payNow()

---

## Load Babysitters

Model:
- Babysitter entity
- BabysitterRepository

View:
- dashboard.html

Controller:
- BabysitterController
- loadBabysitters()

---


## Delete Babysitter Profile

Model:
- Babysitter entity

View:
- babysitter-profile.html

Controller:
- BabysitterController
- deleteBabysitterProfile()

---

## View Upcoming Jobs

Model:
- Booking entity

View:
- babysitter-dashboard.html

Controller:
- BookingController
- loadBabysitterBookings()
