# Calendar App BACKEND 🚀

**MVP DONE...**

Backend with Node + Express + Mongo stack for the ** snowboard lesson booking platform**. Perfect portfolio project showcasing full-stack basics with MongoDB backend. This is a Express backend which lets the user create events. It has to be updated to let the user create "availability" events and "booking" events on top of them.

### Base URL: https://calendar-backend-javier.up.railway.app/api




### Available endpoints

| Method | Endpoint              | Description                  |
|--------|----------------------|------------------------------|
| `POST` | `/events/new`            | Create new event             |
| `GET`  | `/events/all`            | Get all events               |
| `GET`  | `/events/`        | Get events of that user           |
| `PUT`  | `/events/:id`        | Update event                 |
| `DELETE` | `/events/:id`      | Delete event                 |
| `POST` | `/auth/new`     | Register new user            |
| `POST` | `/auth/login`        | Login user (returns JWT)     |

### Headers



## Tech Stack

| Category     | Tech              |
|--------------|-------------------|
| Backend      | Node.js + Express |
| Database     | Mongoose + MongoDB Atlas     |
| Dates        | date-fns          |
| Build        | Vite              |

## 🎯 Why This Project?

Small stepping stone to build **date fluency** (range selection, availability, validations) before the **BIG Snowboard Booking Platform**.

- MongoDB for real persistence
- Javascript to make it faster

## Features

- ✅ User creation
- ✅ JWT Session persistion
- ✅ MongoDB CRUD operations

## Architecture
Frontend (React/Redux/Bootstrap)
↓ API calls
Backend (Node/Express/Mongo)
↓ Persist
MongoDB Collections: events, bookings



## Next Steps → Snowboard Booking

This powers my **full platform**:
- Instructor calendars
- Lesson availability
- User bookings
- Payments (Stripe)

## Run Locally

```bash
# Backend
npm install
npm run dev
```
**Built with ❤️ in Zürich (small steps to BIG platforms)**

**⭐ Star for more tech**
