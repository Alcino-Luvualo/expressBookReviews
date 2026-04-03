# Express Book Reviews API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)

**A modern RESTful API for managing books and reviews, built with Express.js**

---

## About the Project

**Express Book Reviews** is a complete REST API that allows you to manage a book catalog and its reviews. Built with Node.js and Express.js, it offers secure authentication using JWT (JSON Web Tokens), allowing registered users to add and manage book reviews.

### Features

- **User Authentication**: Registration and login system with JWT
- **Book Catalog**: Full listing of available books
- **Advanced Search**: Search by ISBN, author, or title
- **Review System**: Authenticated users can add and delete reviews
- **Route Protection**: Authentication middleware for protected routes
- **Sessions**: Session management with express-session

---

## Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **JSON Web Token (JWT)** - Token-based authentication
- **express-session** - Session management
- **nodemon** - Hot-reload for development

---

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Alcino-Luvualo/expressBookReviews
cd expressBookReviews
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

The server will be running at `http://localhost:5000`

---

## Usage

### 1. Register a New User

```bash
POST http://localhost:5000/register
Content-Type: application/json

{
  "username": "user123",
  "password": "pass123"
}
```

**Success response:**
```json
{
  "message": "User successfully registered. Now you can login"
}
```

### 2. Login

```bash
POST http://localhost:5000/customer/login
Content-Type: application/json

{
  "username": "user123",
  "password": "pass123"
}
```

**Success response:**
```
Welcome back user123
```

### 3. List All Books

```bash
GET http://localhost:5000/
```

### 4. Get Book by ISBN

```bash
GET http://localhost:5000/isbn/1
```

### 5. Get Books by Author

```bash
GET http://localhost:5000/author/Chinua%20Achebe
```

### 6. Get Book by Title

```bash
GET http://localhost:5000/title/Things%20Fall%20Apart
```

### 7. Get Book Reviews

```bash
GET http://localhost:5000/review/1
```

### 8. Add Review (Authenticated)

```bash
PUT http://localhost:5000/customer/auth/review/1?review=Excellent book!
```

### 9. Delete Review (Authenticated)

```bash
DELETE http://localhost:5000/customer/auth/review/1
```

---

## API Documentation

### Public Endpoints

#### `POST /register`
Registers a new user in the system.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `200` - User registered successfully
- `404` - User already exists or invalid data

---

#### `GET /`
Returns the complete list of all available books.

**Response:**
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
}
```

---

#### `GET /isbn/:isbn`
Returns the details of a specific book by ISBN.

**Parameters:**
- `isbn` (path) - Book ISBN

**Response:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

#### `GET /author/:author`
Returns all books by a specific author.

**Parameters:**
- `author` (path) - Author name

**Response:**
```json
[
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
]
```

---

#### `GET /title/:title`
Returns a specific book by title.

**Parameters:**
- `title` (path) - Book title

**Response:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

#### `GET /review/:isbn`
Returns all reviews for a specific book.

**Parameters:**
- `isbn` (path) - Book ISBN

**Response:**
```json
{
  "user123": "Excellent book!",
  "anotherUser": "Very good!"
}
```

---

### Authenticated Endpoints

> **Note:** All endpoints below require authentication. Login first to obtain the access token.

#### `POST /customer/login`
Authenticates a user and creates a session.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `200` - Login successful
- `401` - Invalid credentials

---

#### `PUT /customer/auth/review/:isbn`
Adds or updates a review for a specific book.

**Parameters:**
- `isbn` (path) - Book ISBN
- `review` (query) - Review text

**Responses:**
- `200` - Review added successfully
- `400` - Review not provided
- `401` - User not authenticated
- `404` - Book not found

**Example:**
```
PUT /customer/auth/review/1?review=Loved this book!
```

---

#### `DELETE /customer/auth/review/:isbn`
Removes the authenticated user's review from a specific book.

**Parameters:**
- `isbn` (path) - Book ISBN

**Responses:**
- `200` - Review deleted successfully
- `401` - User not authenticated
- `404` - Review not found

---

## Project Structure

```
expressBookReviews/
│
├── index.js                  # Main server file
├── package.json              # Project dependencies
├── package-lock.json         # Dependency lock file
│
├── router/
│   ├── auth_users.js         # Authentication and review routes
│   ├── booksdb.js            # Book database
│   └── general.js            # Public routes
│
├── LICENSE                   # Apache 2.0 License
└── README.md                 # This file
```

---

## Authentication

The system uses **JWT (JSON Web Tokens)** for authentication. After logging in, an access token is stored in the user's session and is valid for 60 seconds.

**Authentication Flow:**
1. User logs in at `/customer/login`
2. A JWT token is generated and stored in the session
3. The token is automatically verified on protected routes (`/customer/auth/*`)
4. If the token is invalid or expired, access is denied

---

## cURL Examples

### Register User
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"newUser","password":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"newUser","password":"pass123"}' \
  -c cookies.txt
```

### Add Review (with session cookies)
```bash
curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Great book!" \
  -b cookies.txt
```

---

## Testing the API

You can test the API using:

- **cURL** - Command line
- **Postman** - GUI client
- **Thunder Client** - VS Code extension
- **Insomnia** - REST client
- **httpie** - Modern HTTP client

---

## Configuration

### Environment Variables

For production, consider moving the following to environment variables:

- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - JWT secret key (currently: "access")
- `SESSION_SECRET` - Session secret key (currently: "fingerprint_customer")

---

## Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

---

## Author

Developed by Alcino

---

Made with Express.js
