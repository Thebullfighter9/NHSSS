import http.server
import socketserver
import webbrowser
import subprocess
import time

PORT_MAIN = 8000  # Port for the main page
PORT_REVIEWS = 8001  # Use the same port as in reviews_server.py (8001)

# Custom request handler for the main page
class MainHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"Received GET request for {self.path}")
        super().do_GET()

# Custom request handler for the reviews page
class ReviewsHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(f"Received GET request for {self.path}")
        super().do_GET()

# Start the main page server
def run_main_server(port):
    with socketserver.TCPServer(("", port), MainHandler) as httpd:
        print(f"Serving main page at port {port}")
        webbrowser.open(f"http://localhost:{port}")
        httpd.serve_forever()

# Start the reviews page server
def run_reviews_server(port):
    with socketserver.TCPServer(("", port), ReviewsHandler) as httpd:
        print(f"Serving reviews page at port {port}")
        httpd.serve_forever()

if __name__ == "__main__":
    # Start the main page server
    main_server_process = subprocess.Popen(['python', 'reviews_server.py'])
    time.sleep(1)  # Give it some time to start

    run_main_server(PORT_MAIN)
