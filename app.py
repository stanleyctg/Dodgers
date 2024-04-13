from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("quiz.html")

@app.route("/get-questions", methods=['POST'])
def get_questions():
    conn = sqlite3.connect('quiz.db')
    cur = conn.cursor()
    cur.execute("SELECT id, question, answer1, answer2, answer3, answer4, correct_answer, facts FROM earth")
    info = cur.fetchall()
    formmated_info = [list(row) for row in info]

    cur.close()
    conn.close()
    print(formmated_info)
    return jsonify({"formatted_information": formmated_info})

if __name__ == "__main__":
    app.run(debug=True)
