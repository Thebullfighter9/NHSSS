from http.server import SimpleHTTPRequestHandler
import http.server
import socketserver
import json
import sqlite3
from urllib.parse import urlparse, parse_qs

# Function to create the reviews table if it doesn't exist
def create_reviews_table():
    conn = sqlite3.connect('data/reviews.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        rating INTEGER
    )
    ''')
    conn.commit()
    conn.close()

# Function to add a review to the database
def add_review(name, description, rating):
    conn = sqlite3.connect('data/reviews.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO reviews (name, description, rating) VALUES (?, ?, ?)", (name, description, rating))
    conn.commit()
    conn.close()

# Function to retrieve all reviews from the database
def get_reviews():
    conn = sqlite3.connect('data/reviews.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reviews")
    reviews = cursor.fetchall()
    conn.close()
    return reviews

# Custom request handler to log requests for debugging
class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL to determine the path
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == '/reviews.html':
            with open('reviews.html', 'rb') as file:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html')
                self.end_headers()
                self.wfile.write(file.read())
        elif path == '/api/reviews':
            # Handle API request to get reviews
            reviews = get_reviews()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(reviews).encode())
        else:
            super().do_GET()

    def do_POST(self):
        # Parse the URL to determine the path
        parsed_url = urlparse(self.path)
        path = parsed_url.path

        if path == '/api/reviews':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = post_data.decode()
            post_params = parse_qs(post_data)

            name = post_params['name'][0]
            description = post_params['description'][0]
            rating = int(post_params['rating'][0])

            add_review(name, description, rating)
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Review added successfully')

if __name__ == "__main__":
    PORT = 8000

    create_reviews_table()

    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()
