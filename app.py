from flask import Flask, make_response, render_template
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("layout.html")

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/notes")
def notes():
    return render_template("notes.html")

@app.route('/profile')
def profile():
    return render_template("profile.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

if __name__ == "__main__":
    app.run(debug=True)
