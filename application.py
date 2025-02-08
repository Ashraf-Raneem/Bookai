import os

from flask import Flask, session, jsonify, request
from flask_session import Session
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


@app.route("/")
def index():
    return "Project 1: TODO"


@app.route("/books", methods=["GET"])
def get_books():
    page = request.args.get('page', 1, type=int)
    per_page = 10
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
    print(book_id)
    sql = text("""
               
    SELECT * FROM books
    WHERE isbn=:book_id
    
    """)

    with engine.connect() as conn:
        res = conn.execute(sql, {'book_id': book_id})
        col = res.keys()
        data = [dict(zip(col, row)) for row in res.fetchall()]
        print(data, res, col)

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
        data = [dict(zip(col, row)) for row in res.fetchall()]

    return jsonify(data)
