# Full-Stack Web Application with JWT Authentication and Real-Time WebSocket Chat

This is a full-stack admin management web application that demonstrates JWT authentication and a real-time WebSocket chat feature for user communication. The application consists of a backend developed with **FastAPI** and a **MySQL** database, along with a frontend developed with **React**.

## Features

- **JWT Authentication** for secure login and user authorization.
- **RESTful API** for CRUD operations on user data.
- **Real-Time WebSocket Chat** for communication between the admin and other admin users.
- **Admin Panel** for managing users and chatting with them.

## Technologies Used

- **Backend**: FastAPI (Python)
- **Frontend**: React 
- **Database**: MySQL
- **Real-Time Communication**: WebSockets
- **Authentication**: JWT (JSON Web Tokens)

## Setup Guide


### 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/Sorarat/admin-management.git
cd management
```

### 2. Install Backend Dependencies
```
pip install -r requirements.txt
```
### 3. Setup MySQL database

1. Ensure that you have MySQL installed. If not, install them
2. Create a database in MySQL

eg.
```
CREATE DATABASE admin-management;
```

3. Create multiple users using the following query:
```
INSERT INTO user (username, email, phone, password)
VALUES ('admin', 'admin@example.com', '12345678', '$2a$12$QzGPBv8Y3ypfdx63qTCghOdjYphgdR2GOvBGdY6SMt8S.pK0SH8Cq');
INSERT INTO user (username, email, phone, password)
VALUES ('admin2', 'admin2@example.com', '87654321', '$2a$12$QzGPBv8Y3ypfdx63qTCghOdjYphgdR2GOvBGdY6SMt8S.pK0SH8Cq');
INSERT INTO user (username, email, phone, password)
VALUES ('admin3', 'admin3@example.com', '2345678', '$2a$12$QzGPBv8Y3ypfdx63qTCghOdjYphgdR2GOvBGdY6SMt8S.pK0SH8Cq');
```
**Note**: In this case, the password is hashed. You can use a tool like [bcrypt](https://bcrypt-generator.com/) to generate password hashes.

### 4. Configure the backend

1. create a .env file in the backend directory.
2. Set Environment Variables: The .env file should contain the following variables:

```
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

```
SECRET_KEY: This is a secret key used to encode and decode the JWT token. Make sure to use a secure and random string for this value.

3. In database.py, update the following with your MySQL credentials:
```
URL_DATABASE = 'mysql+pymysql://root:mysql@localhost:3306/adminManagement'
```

### 5. Run the backend
start the backend server using uvicorn:
```
cd backend
uvicorn main:app --reload
```


### 6. Run the frontend

```
cd React
cd frontend
npm install
npm run dev
```

### 7. Access Swagger API Documentation

[http://localhost:8000/docs](http://localhost:8000/docs)

1. In Swagger UI, click on the "Authorize" button in the top-right corner.
2. Enter your username and password of one of the admin users you created in the MySQL database (e.g., admin, admin2, or admin3).
3. Click Authorize to get a JWT token.
4. After authorization, Swagger will append the Bearer token to your requests, allowing you to interact with the protected endpoints.

### 8. Testing the Application
Login: log in as one of the user

Access the Admin Panel after logging in and tried on the CRUD operations

Real-Time Chat: Chat with the admin via the WebSocket feature.


### Design Choices:
JWT Authentication: This provides secure, stateless authentication. It is implemented in FastAPI using the OAuth2PasswordBearer and JWT methods.

MySQL Database: Chosen for relational data storage and easy querying of user data.

WebSockets: For real-time chat, ensuring that messages are sent and received immediately without page reloads.

### Further Improvements:
If I had more time, I would implement a Role-Based Access Control (RBAC) system where:
- Normal users would not have admin privileges, but would only have the ability to chat with other users or admin users.
- Only admin users would have the ability to perform CRUD operations on other users.
