$(document).ready(function() {
    let currentQuestionIndex = 0;
    let questions = [];

    // if (localStorage.getItem('currentQuestionIndex')) {
    //     currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex'), 10);
    // }

    $.ajax({
        url: "/get-questions",
        type: "POST",
        dataType: "json",
        success: function(response) {
            questions = response.formatted_information;
            if (questions.length > 0) {
                displayQuestion(currentQuestionIndex);
            }
        },
        error: function(error) {
            console.error('Error fetching questions:', error);
        }
    });

    function displayQuestion(questionIndex) {
        const questionData = questions[questionIndex];
        const qIndex = questionData[0];
        const questionText = questionData[1];

        // Set the question text
        $('#question-title').text(qIndex + '. ' + questionText);
        const correctAnswer = questionData[6]; // Correct answer at index 6

        // Update answer texts and setup click handlers
        ['answer1', 'answer2', 'answer3', 'answer4'].forEach((id, index) => {
            const answer = questionData[index + 2];
            const answerElement = $(`#${id}`);
            answerElement.find('button').off('click').click(function() { checkAnswer(answer, correctAnswer); });
            answerElement.find('span').text(answer); // Set text next to the button
        });
        if (questionIndex >= questions.length - 1) {
            $('#next-question').hide(); // Hide the next button if it's the last question
        } else {
            $('#next-question').show(); // Otherwise, ensure it is visible
        }
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        alert(selectedAnswer === correctAnswer ? 'Correct!' : 'Wrong answer!');
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            displayQuestion(currentQuestionIndex);
        } else {

            alert('You have reached the end of the quiz!');
            // Optionally handle quiz completion
        }
    }
});
