from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)
quiz_db = "quiz.db"
profile_db = "profile.db"

def get_db_connection(database):
    conn = sqlite3.connect(database)
    return conn


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get-questions", methods=['POST'])
def get_questions():
    conn = sqlite3.connect('quiz.db')
    cur = conn.cursor()
    cur.execute("SELECT id, question, answers, correct_answer, facts FROM earth")
    questions = cur.fetchall()
    formatted_questions = []
    for q in questions:
        answers = q[2].split('|')
        answer_dict = {chr(65 + i): answers[i] for i in range(len(answers))}  # Creates dict: {'A': 'First', 'B': 'Second', ...}
        formatted_questions.append({
            'id': q[0],
            'question': q[1],
            'answers': answer_dict,
            'correct_answer': [k for k, v in answer_dict.items() if v == q[3]][0],  # Find the key where value matches the correct answer
            'facts': q[4]
        })
    cur.close()
    conn.close()
    # Cannot be return as there is no ajax connected to it
    print(formatted_questions[0]["facts"]) # This is the example of the data for flashcard
    # return jsonify({"formatted_information" : formatted_questions})


if __name__ == "__main__":
    get_questions()
    app.run(debug=True)
