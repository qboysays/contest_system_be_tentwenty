# Contest API

## Overview
This is a RESTful API for managing online contests, where users can participate in quizzes, submit answers, and compete on leaderboards.

## Features
- User authentication (Admin, VIP, Normal, Guest roles)
- Contest creation and management
- Question and multiple-choice option management
- User participation tracking
- Score calculation and leaderboard ranking
- Secure role-based access control

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MySQL with Knexjs
- **API Documentation**: Postman 
- **API Logging**: Winston Logger 
---

## Installation & Setup
### Prerequisites
- Node.js (v18 or later)
- MySQL (v8 or later)
- Postman (for API testing)

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/qboysays/contest_system_be_tentwenty.git

```

### 2️⃣ Install Dependencies
```sh
cd applib
npm install
npm pack
-- copy the path of the .tgz file that gets created.
cd ..
cd src
npm install 
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:(.env file shared over mail)
```env
DATABASE_HOST               =   <host>
DATABASE_PORT               =   <port>
DATABASE_USER               =   <user>
DATABASE_PASSWORD           =   <password>
DATABASE_NAME               =   <dbname>
CHARSET                     =   utf8



NODE_PORT = <port>
SALT = <salt>
```

### 5️⃣ Start the Server
```sh
npm start
```

---

## API Endpoints
### 🔹 Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login and get Authtoken |

### 🔹 Contest Management
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET   | `/api/contest/list` | Get all contests |
| GET   | `/api/contest/details?reference=<reference>` | Get contest details |
| POST  | `/api/contest/create` | Create /update new contest (Admin) |

### 🔹 Contest Participation
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/contest/join?contestRef=<contestRef>` | Join a contest |
| POST   | `/api/contest/submit?contestRef=<contestRef>` | Submit answers and calculate score |

### 🔹 User
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/api/user/details` | Get User rankings |
| GET    | `/api/contest/leaderboard?contestRef=<contestRef>` | Get leaderboard rankings |
