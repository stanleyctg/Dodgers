# Dodgers
Create Educational Website for primary school kids to learn about the solar system
Project: Solar System Educational Website
Objective: To create an interactive web platform for learners to study the solar system
and track their learning progress.
Technical Stack
Frontend: HTML, CSS, Javascript (AJAX for asynchronous requests and Chart.js for
rendering charts).
Backend: Flask
Database: SQLite3 (Store user information, scores, and quiz questions)
Version Control: Github
Website Structure
The website will consists of the following main components
1. Login Page
- Description: A simple and secure login system to authenticate users
- Implementation: HTML forms for input, AJAX to send data to the backend for authentication against
the user details in database. If it is registration, simply use AJAX to send the data to flask and insert
into database.
2. Study notes and templates
- Description: Allow the user to study before the test. Page is broken down into sections (easy,
medium and hard). It consists of notes regarding the quiz they will take (next section).
- Implementation: Use Chatgpt to retrieve information and based on those information construct quiz
questions with answer options that will be insert in the database (mention later).
3. Quiz Template
-Description: User can set the difficulty of the questions, each quiz has 10 questions, all being mcqs.
In the format of a slideshow. Score is initialised to 0 and will be tracked throughout the quiz
- Implementation: Fetch questions, answer options, exact answers from the database. Using AJAX to
fetch the data into javascript, render the template to display the questions and options. If user
chooses the correct option and presses next question it repeats but with another question, then add
the score. Else, provide feedback on the correct answer and why. When quiz is finish, the score is
noted and inserted into the database which will be fetch to draw charts.
4. Profile template
- Description: Display users’ information and their performance via a chart that display their score
each quiz.
- Implementation: As user finish the quiz the score will be insert into database. Fetch value from
database into chart.js using AJAX then draw the chart.
