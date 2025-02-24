# Project 1

# Book Review Website

This is a full-stack web application built with a React frontend and a Flask backend. The application allows users to browse through a collection of several thousand books, review books, rate them, and browse other users' reviews.

## Features

### Frontend (React)
- User authentication (signup/login/logout)
- Browse a list of books
- Book details page
- Submit book reviews and ratings
- View reviews submitted by other users
- Search through book library

### Backend (Flask + PostgreSQL)
- User authentication
- API endpoints for books and reviews
- PostgreSQL database for storing users, books, and reviews
- Token-based authentication (JWT)
- Generated a summarized description with the help of Google's Gemini api
---

## Requirements to run the application

### Frontend Requirements
- Node.js (>= 16.x)
- npm or yarn

### Backend Requirements
- Python (>= 3.8)
- PostgreSQL database
- Required Python packages (listed in `requirements.txt`)
- Import file added to import the data to your local database

---

## Installation & Setup

### Backend (Flask)

1. Clone the repository:
   ```sh
   git clone https://github.com/Ashraf-Raneem/ENG_651_LAB1.1.git
   cd book-review-app/backend
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```sh
   export DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
   flask db upgrade
   ```

5. Start the Flask server:
   ```sh
   flask run
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```sh
   cd ../book-review-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm start
   ```

The frontend will run on `http://localhost:3000/`, and the backend API will be available at `http://localhost:5000/`.

---

## API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - User login (returns JWT token)
- `GET /api/books` - Fetch list of books
- `POST /api/reviews` - Submit a book review
- `GET /api/book/:book_id` - Gets book details

---

## Environment Variables
Create a `.env` file in the backend directory and add:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/book_reviews
SECRET_KEY=your_secret_key
JWT_SECRET=your_jwt_secret
```

