from flask import Flask, jsonify, render_template, g
import sqlite3

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

    conn = sqlite3.connect('profile.db')
    cur = conn.cursor()
    cur.execute("SELECT score FROM accounts WHERE username = ?", ("stanley",))
    score = cur.fetchall()
    cur.close()
    conn.close()

    print(formmated_info)
    return jsonify({"formatted_information": formmated_info, "score" : score})

if __name__ == "__main__":
    app.run(debug=True)
