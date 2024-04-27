from flask import Flask, jsonify, render_template, g, request, json
import sqlite3
import random


app = Flask(__name__)
profile_db = "profile.db"


# Inject user details into the website system to be accessed
@app.context_processor
def inject_user():
    # Connect to the database and retrieve user account details
    db = g._database = sqlite3.connect(profile_db)
    db.row_factory = sqlite3.Row
    # Get the specific user detail
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM
                    accounts
                    WHERE username = ?""", ('stanley',))
    account_details = cursor.fetchone()
    print(account_details)
    # Return the detail that accessible from html files
    return {'account': account_details}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/level")
def level():
    return render_template("level.html")


@app.route("/quiz")
def quiz():
    return render_template("quiz.html")


@app.route("/notes")
def notes():
    return render_template("notes.html")


@app.route("/get_fuel", methods=['POST'])
def get_fuel():
    conn = sqlite3.connect('profile.db')
    cur = conn.cursor()
    cur.execute("SELECT fuel FROM accounts WHERE username = ?", ('stanley',))
    fuel = cur.fetchall()

    cur.close()
    conn.close()
    print(fuel)
    return jsonify({"fuel": fuel})


@app.route("/get-questions2", methods=['POST'])
def get_questions2():
    planet_number = request.form["planet"]
    conn = sqlite3.connect('quiz.db')
    cur = conn.cursor()
    if planet_number == '1':
        table = 'earth'
    elif planet_number == '2':
        table = 'mars'
    elif planet_number == '3':
        table = 'jupiter'

    cur.execute(f"""SELECT id, question, answer1, answer2,
                answer3, answer4, correct_answer, facts FROM {table}""")
    questions = cur.fetchall()
    formmated_info = [list(question) for question in questions]
    random.shuffle(formmated_info)
    flattened_data = ','.join(str(item) for sublist in formmated_info for item in sublist)
    cur.close()
    conn.close()

    conn = sqlite3.connect('profile.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO view (stored_info) VALUES (?)", (flattened_data,))
    conn.commit()
    cur.execute("SELECT fuel FROM accounts WHERE username = ?", ("stanley",))
    score = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify({"formatted_information": flattened_data, "fuel": score})


@app.route("/update_fuel", methods=['POST'])
def update_fuel():
    fuel = request.form["fuel"]
    conn = sqlite3.connect('profile.db')
    cur = conn.cursor()
    cur.execute("""UPDATE accounts SET fuel = ?
                 WHERE username = ?""", (fuel, "stanley"))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"Fuel": fuel})


@app.route("/retrieve_data", methods=['POST'])
def retrieve_data():
    conn = sqlite3.connect("profile.db")
    cur = conn.cursor()
    cur.execute("SELECT * FROM view")
    stored_data = cur.fetchall()[-1][1]
    return jsonify({"stored_data": stored_data})


if __name__ == "__main__":
    app.run(debug=True)
