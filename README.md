# Project Management System

A full-stack Project Management System built using the MERN Stack where Admins can manage clients, projects, and tasks, while Users can view and manage only their assigned projects and tasks.

This application helps teams organize work efficiently with role-based access control, task tracking, deadline management, and dashboard analytics.

---

## Features

### Admin Features

* JWT Based Authentication
* Role-Based Authorization
* Add / Update / Delete Clients
* Create and Manage Projects
* Create and Manage Tasks
* Assign Tasks to Users
* View All Clients, Projects, and Tasks
* Automatic Project Status Update
* Dashboard Analytics

### Admin Dashboard Includes

* Total Clients
* Total Projects
* Total Tasks
* Pending Tasks
* Completed Tasks
* Recent Clients

---

### User Features

* Secure Login Authentication
* View Assigned Projects
* View Personal Tasks
* Update Task Status
* Personalized User Dashboard

---

## Advanced Features

* Protected Routes using JWT Middleware
* Role-Based Access Control (Admin/User)
* Automatic Project Completion Status
* Task Deadline Validation
* MongoDB Relationships using `populate()`
* Axios Interceptors for Token Authentication

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Tools

* Postman
* Git & GitHub

---

## Project Structure

```bash
project-management-system/
│
├── backend/
│   ├── db/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── routes/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Authentication & Authorization

This project uses JWT Authentication for secure access.

### Authentication Flow

* User logs in using email and password
* JWT Token is generated after successful login
* Token is stored on the frontend
* Protected routes are accessed using middleware verification

### Role-Based Access

#### Admin

* Full Access
* Manage Clients
* Manage Projects
* Manage Tasks
* Assign Tasks

#### User

* Limited Access
* View Assigned Projects
* View Assigned Tasks
* Update Task Status

---

## Dashboard Features

### Admin Dashboard

* Total Clients
* Total Projects
* Total Tasks
* Pending Tasks
* Completed Tasks
* Recent Clients

### User Dashboard

* Assigned Projects
* Assigned Tasks
* Task Status Updates

---

## Database Models

### User Model

```js
{
  name,
  email,
  password,
  role
}
```

### Client Model

```js
{
  name,
  email,
  phone,
  companyname,
  address,
  notes
}
```

### Project Model

```js
{
  projectName,
  description,
  clientId,
  status,
  deadline
}
```

### Task Model

```js
{
  title,
  description,
  status,
  priority,
  deadline,
  assignedTo,
  projectId,
  clientId
}
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repo-link>
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

## Run Project

### Backend

```bash
node server.js
```

### Frontend

```bash
npm run dev
```

---

## API Routes

### Auth Routes

```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/getuser
```

### Client Routes

```http
POST   /api/client/addclient
GET    /api/client/getClient
GET    /api/client/getClientbyId/:id
GET    /api/client/getrecentclient
PATCH    /api/client/updateClient/:id
DELETE /api/client/deleteClient/:id
```

### Project Routes

```http
POST   /api/project/createproject
GET    /api/project/getproject
GET    /api/project/getprojectbyid/:id
GET    /api/project/getprojectbyclient/:clientId
GET    /api/project/myproject
PUT    /api/project/updateproject/:id
DELETE /api/project/Deleteproject/:id
```

### Task Routes

```http
POST   /api/task/addtask
GET    /api/task/gettask
GET    /api/task/gettaskbyid/:_id
GET    /api/task/mytask
PATCH  /api/task/updatetask/:_id
PATCH  /api/task/updatestatus/:id
PATCH  /api/task/updateProjectStatus/:id
DELETE /api/task/Delete/:_id
```

---

## Learning Outcomes

Through this project, I learned:

* REST API Development
* JWT Authentication
* Role-Based Authorization
* MongoDB Relationships using Populate
* React Routing
* Protected Routes
* Axios Interceptors
* Backend Validation
* CRUD Operations
* Dashboard Data Handling
* Authentication Middleware
* Full Stack Application Architecture

---

## Future Improvements

* Email Notifications
* File Upload Support
* Team Chat System
* Project Analytics
* Calendar Integration
* Real-Time Updates using Socket.io

---

## Live Demo

Frontend: https://project-management-system-gules.vercel.app/

Backend: https://project-management-system-1-1cbw.onrender.com

---

## Author

Aanjali Singh

