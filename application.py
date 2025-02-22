import os
import random
from flask import Flask, session, jsonify, request
from flask_session import Session
from flask_jwt_extended import JWTManager, create_access_token
from sqlalchemy import create_engine, text
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
engine = create_engine(os.getenv("DATABASE_URL"))
db = scoped_session(sessionmaker(bind=engine))
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_TOKEN")
jwt = JWTManager(app)


@app.route("/")
def index():
    return "Project 1: TODO"


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    id = random.randint(100000, 999999)

    print(name, email, password)

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    check_user_sql = text("""

    SELECT id, full_name, email, password FROM users
    WHERE email= :email
               
    """)

    new_user_insert_sql = text("""

    INSERT INTO 
    users (id, email, full_name, password) 
    VALUES (:id, :email, :full_name, :password)
    RETURNING id, full_name, email
               
    """)

    with engine.connect() as conn:
        try:
            # Checking if user exist with the same email
            res_check_existing_user = conn.execute(
                check_user_sql, {'email': email})
            existing_user = res_check_existing_user.fetchone()

            if existing_user:
                return jsonify({"error": "Email is already registered"}), 400

            res_new_user = conn.execute(
                new_user_insert_sql, {'id': id, 'email': email, 'full_name': name, 'password': password})
            user = res_new_user.fetchone()
            conn.commit()

            return jsonify({"message": "User created successfully", "user": {"id": user[0], "username": user[1], "email": user[2]}})

        except Exception as e:
            return jsonify({"Error": str(e)}), 400
        finally:
            conn.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Both email and password are required"}), 400

    sql = text("""

    SELECT id, full_name, email, password FROM users
    users WHERE email= :email AND password= :password
               
    """)

    with engine.connect() as conn:
        result = conn.execute(
            sql, {'email': email, 'password': password})
        user = result.fetchone()
        if user:
            access_token = create_access_token(identity=email)
            return jsonify({"message": "User login successful", "user": {"id": user[0], "username": user[1], "email": user[2], "access_token": access_token}})

    return jsonify({"Error": "Invalid credentials"}), 401


@app.route("/books", methods=["GET"])
def get_books():
    page = request.args.get('page', 1, type=int)
    per_page = 12
    limit = page * per_page

    sql = text("""

    SELECT * FROM books
    LIMIT :limit
               
    """)

    with engine.connect() as conn:
        res = conn.execute(sql, {'limit': limit})
        col = res.keys()
        data = [dict(zip(col, row)) for row in res.fetchall()]

    return jsonify(data)


@app.route("/book", methods=["GET"])
def get_book():
    book_id = request.args.get('book_id', type=str)

    sql = text("""
               
    SELECT * FROM books
    WHERE isbn=:book_id
    
    """)

    with engine.connect() as conn:
        res = conn.execute(sql, {'book_id': book_id})
        col = res.keys()
        data = [dict(zip(col, row)) for row in res.fetchall()]

    return jsonify(data[0])


@app.route("/search", methods=["GET"])
def query_search():
    query = request.args.get('query', type=str)
    sql = text("""

        SELECT * FROM BOOKS 
        WHERE 
        isbn ILIKE :query OR
        author ILIKE :query OR
        title ILIKE :query OR
        year::TEXT ILIKE :query
    
    """)

    with engine.connect() as conn:
        res = conn.execute(sql, {'query': f'%{query}%'})
        col = res.keys()
        data = {'query': query, 'books': [
            dict(zip(col, row)) for row in res.fetchall()]}

    return jsonify(data)


@app.route("/review", methods=["GET", "PUT", "DELETE", "POST"])
def review():
    if request.method == 'GET':
        data = request.args
    else:
        data = request.get_json()

    book_id = data.get('book_id')
    user_id = data.get('user_id')
    username = data.get('user_name')
    comment = data.get('comment')
    rating = data.get('rating')

    if not book_id:
        return jsonify({"error": "Book id needed"})

    new_review_sql = text("""

    INSERT INTO
    review (isbn, user_id, username, comment, rating)
    VALUES (:book_id, :user_id, :username, :comment, :rating)

    """)

    has_user_review_sql = text("""

    SELECT *
    FROM review WHERE isbn= :book_id AND user_id= :user_id

    """)

    get_all_reviews_sql = text("""

    SELECT *
    FROM review WHERE isbn= :book_id
    ORDER BY CASE WHEN user_id = :target_id THEN 0 ELSE 1 END, user_id;

    """)

    delete_review_sql = text("""

    DELETE FROM review
    WHERE isbn= :book_id AND user_id= :user_id
    
    """)

    with engine.connect() as conn:
        try:
            # Getting all the reviews for the book
            if request.method == 'GET':
                res = conn.execute(get_all_reviews_sql, {
                                   'book_id': book_id, 'target_id': user_id})
                col = res.keys()
                data = [dict(zip(col, row)) for row in res.fetchall()]
                return jsonify(data)

            # Adding a review
            if request.method == "POST":

                # Checking if the user has a comment already
                res_has_user_review = conn.execute(
                    has_user_review_sql, {'book_id': book_id, 'user_id': user_id})
                existing_review = res_has_user_review.fetchone()

                if existing_review:
                    return jsonify({"error": "User already has a review"})

                # Adding a new review
                res_new_user_review = conn.execute(
                    new_review_sql, {'book_id': book_id, 'user_id': user_id, 'comment': comment, 'username': username, 'rating': rating})

                conn.commit()

                return jsonify({"message": "Review added successfully"})

            # Delete a review
            if request.method == "DELETE":
                res = conn.execute(delete_review_sql, {
                                   'book_id': book_id, 'user_id': user_id})
                col = res.keys()
                data = [dict(zip(col, row)) for row in res.fetchall()]
                return jsonify({"message": "Review deleted successfully"})

        except Exception as e:
            return jsonify({"Error": str(e)}), 400
        finally:
            conn.close()
