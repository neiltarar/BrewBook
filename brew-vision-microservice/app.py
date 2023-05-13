from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from Flask microservice!"

if __name__ == '__main__':
    app.run(port=5000)