import http.server
import socketserver

PORT = 3000

class FastHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        # Enable responsive caching with must-revalidate so updates show immediately
        if self.path.startswith('/public/images/'):
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
        else:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress image requests to eliminate synchronous console I/O latency
        if hasattr(self, 'path') and self.path.startswith('/public/images/'):
            return
        super().log_message(format, *args)

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

if __name__ == '__main__':
    with ThreadedHTTPServer(("", PORT), FastHTTPRequestHandler) as httpd:
        print(f"High-performance threaded server running on port {PORT}...")
        httpd.serve_forever()
