import sqlite3


conn_quiz = sqlite3.connect('quiz.db')
c_quiz = conn_quiz.cursor()
c_quiz.execute('''
CREATE TABLE earth (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''
CREATE TABLE mars (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
c_quiz.execute('''               
CREATE TABLE jupiter (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    facts TEXT NOT NULL
)
''')
# Insert data into the Earth table
# Insert data into the Earth table with multiple answers
# Insert data into the Earth table
c_quiz.executemany('''
INSERT INTO earth (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)
''', [
    ("What is the largest ocean on Earth?", "Pacific","Atlantic","Indian","Southern", "Pacific", "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions."),
    ("What percentage of the Earth's surface is covered by water?", "About 71%","About 65%","About 75%","About 80%", "About 71%", "The Earth's surface is covered by water to a large extent, majorly by oceans."),
    ("How old is the Earth?", "About 4.5 billion years","About 4 billion years","About 5 billion years","About 3.5 billion years", "About 4.5 billion years", "Scientists estimate that Earth is about 4.5 billion years old.")
])

# Insert data into the Mars table
c_quiz.executemany('''
INSERT INTO mars (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)
''', [
    ("What is the tallest volcano on Mars?", "Olympus Mons","Mount Everest","Mauna Loa","Krakatoa", "Olympus Mons", "Olympus Mons is the tallest planetary mountain in our solar system."),
    ("What is the main component of the Martian atmosphere?", "Carbon Dioxide","Oxygen","Nitrogen","Hydrogen", "Carbon Dioxide", "Mars' atmosphere is 95% carbon dioxide."),
    ("How many moons does Mars have?", "2","1","3","4", "2", "Mars has two moons: Phobos and Deimos.")
])

# Insert data into the Jupiter table
c_quiz.executemany('''
INSERT INTO jupiter (question, answer1, answer2, answer3, answer4, correct_answer, facts) VALUES (?, ?, ?, ?, ?, ?, ?)
''', [
    ("What is the Great Red Spot on Jupiter?", "A storm","A mountain","A lake","A desert", "A storm", "The Great Red Spot is a giant storm on Jupiter, larger than Earth."),
    ("How many moons does Jupiter have?", "79 known moons","50 known moons","63 known moons","72 known moons", "79 known moons", "Jupiter has 79 known moons, the largest being Ganymede."),
    ("How short is a day on Jupiter?", "About 10 hours","About 12 hours","About 8 hours","About 15 hours", "About 10 hours", "A day on Jupiter, or the duration of one rotation, is about 10 hours long.")
])

# Commit the changes and close the connection
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
    fuel INTEGER DEFAULT 0,
    planet TEXT NOT NULL
)
''')
c_profile.execute('''
INSERT INTO accounts (username, password, fuel, planet)
VALUES ("stanley", "12345", 10000, "Earth")
''')
conn_profile.commit()
conn_profile.close()