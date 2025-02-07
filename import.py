import psycopg2
import os
import pandas as pd

df = pd.read_csv('books.csv')

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Get the database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# Connect to PostgreSQL
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()


# Insert data into PostgreSQL
for _, row in df.iterrows():
    cursor.execute(
        "INSERT INTO books (isbn, title, author, year) VALUES (%s, %s, %s, %s)",
        (row["isbn"], row["title"], row["author"], row["year"])
    )

print(df.info)
conn.commit()
cursor.close()
conn.close()
