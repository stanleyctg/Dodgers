import sqlite3


conn_quiz = sqlite3.connect('quiz.db')
c_quiz = conn_quiz.cursor()
c_quiz.execute('''
CREATE TABLE earth (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answers TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''
CREATE TABLE mars (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answers TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''               
CREATE TABLE jupiter (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answers TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
# Insert data into the Earth table
c_quiz.executemany('''
INSERT INTO earth (question, answers, facts) VALUES (?, ?, ?)
''', [
    ("What is the largest ocean on Earth?", "Pacific", "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."),
    ("What percentage of the Earth's surface is covered by water?", "About 71%", "The Earth's surface is covered by water to a large extent, majorly by oceans."),
    ("How old is the Earth?", "About 4.5 billion years", "Scientists estimate that Earth is about 4.5 billion years old.")
])

# Insert data into the Mars table
c_quiz.executemany('''
INSERT INTO mars (question, answers, facts) VALUES (?, ?, ?)
''', [
    ("What is the tallest volcano on Mars?", "Olympus Mons", "Olympus Mons is the tallest planetary mountain in our solar system."),
    ("What is the main component of the Martian atmosphere?", "Carbon Dioxide", "Mars' atmosphere is 95% carbon dioxide."),
    ("How many moons does Mars have?", "2", "Mars has two moons: Phobos and Deimos.")
])

# Insert data into the Jupiter table
c_quiz.executemany('''
INSERT INTO jupiter (question, answers, facts) VALUES (?, ?, ?)
''', [
    ("What is the Great Red Spot on Jupiter?", "A storm", "The Great Red Spot is a giant storm on Jupiter, larger than Earth."),
    ("How many moons does Jupiter have?", "79 known moons", "Jupiter has 79 known moons, the largest being Ganymede."),
    ("How short is a day on Jupiter?", "About 10 hours", "A day on Jupiter, or the duration of one rotation, is about 10 hours long.")
])
conn_quiz.commit()
conn_quiz.close()

# Setup profile.db
conn_profile = sqlite3.connect('profile.db')
c_profile = conn_profile.cursor()
c_profile.execute('''
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    planet TEXT NOT NULL
)
''')
c_profile.execute('''
INSERT INTO accounts (username, password, score, planet)
VALUES ("stanley", "12345", 0, "Earth")
''')
conn_profile.commit()
conn_profile.close()