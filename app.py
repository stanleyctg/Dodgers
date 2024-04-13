from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("notes.html")

@app.route("/get-questions", methods=['POST'])
def get_questions():
    conn = sqlite3.connect('quiz.db')
    cur = conn.cursor()
    cur.execute("SELECT id, question, answers, correct_answer, facts FROM earth")
    questions = cur.fetchall()
    formatted_questions = []
    for q in questions:
        answers = q[2].split('|')
        answer_dict = {chr(65 + i): answers[i] for i in range(len(answers))}  
        formatted_questions.append({
            'id': q[0],
            'question': q[1],
            'answers': answer_dict,
            'correct_answer': [k for k, v in answer_dict.items() if v == q[3]][0],
            'facts': q[4]
        })
    cur.close()
    conn.close()
    return jsonify({"formatted_information": formatted_questions})

if __name__ == "__main__":
    app.run(debug=True)
