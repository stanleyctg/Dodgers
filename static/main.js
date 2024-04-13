$(document).ready(function() {
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0; // Initialize score

    $.ajax({
        url: "/get-questions",
        type: "POST",
        dataType: "json",
        success: function(response) {
            questions = response.formatted_information;
            fuel = parseInt(response.fuel, 10); // Assuming the base is 10
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
        $('#question-title').text((questionIndex + 1) + '. ' + questionData[1]);
        const correctAnswer = questionData[6]; // Correct answer at index 6

        ['answer1', 'answer2', 'answer3', 'answer4'].forEach((id, index) => {
            const answer = questionData[index + 2];
            const answerElement = $(`#${id}`);
            answerElement.find('button').off('click').click(function() { 
                checkAnswer(answer, correctAnswer); 
            });
            answerElement.find('span').text(answer);
        });

        $('#next-question').toggle(questionIndex < questions.length - 1);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        if (selectedAnswer === correctAnswer) {
            score++; // Increment score if correct
            // Select the element by escaping the hash symbol
            var element = document.querySelector('#\\#score-quiz');

            element.innerHTML = 'Score: '+ score;  // For HTML content

            alert("Correct! Your new score is " + score);
            updateFuel();
            alert(fuel);
        } else {
            alert("Incorrect");
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            displayQuestion(currentQuestionIndex);
        } else {
            alert('You have reached the end of the quiz!');
            $('#next-question').hide();
        }
    }

    function updateFuel(){
        alert("yes")
        fuel = fuel+ 10;
        $.ajax({
            url: "/update_fuel",
            type: "POST",
            dataType: "json",
            data: {
                "fuel" : fuel
            },
            success: function(response) {
                alert(response.Fuel)
            },
            error: function(error) {
                alert("bad");
            }
        });
    }
})