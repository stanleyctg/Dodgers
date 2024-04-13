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
            score++;
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
            window.location.href = '/';
        }
    }

    // setTimeout(function() {
    //     window.location.href = '/home';
    // }, 3000); // Redirects after 3000 milliseconds (3 seconds)
    

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

$(document).ready(function() {
    var currentIndex = 0; // Initialize the index to 0
    var facts = []; // Array to store all the facts

    // Function to fetch data from the server
    function fetchData() {
        $.ajax({
            url: "/get-questions",
            type: "POST",
            dataType: "json",
            success: function(response) {
                facts = response.formatted_information; // Store all facts
                displayFact(currentIndex); // Display the initial fact
            },
            error: function(error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // Function to display the fact at a given index
    function displayFact(index) {
        var fact = facts[index][7]; // Get the fact at the specified index
        $('#data-container').text(fact); // Display the fact
    }

    // Function to handle the next button click
    $('#next-btn').click(function() {
         // Increment the index
        if (currentIndex >= facts.length - 1) {
            alert("finished"); // Reset index to loop back to the first fact
        }else{
            currentIndex++;
            displayFact(currentIndex); // Display the next fact            
        }

    });

    // Function to handle the previous button click
    $('#prev-btn').click(function() {
         // Decrement the index
        if (currentIndex === 0) {
            alert("start") // Set index to the last fact if it goes below 0
        }else{
            currentIndex--;
            displayFact(currentIndex); // Display the previous fact            
        }

    });

    // Fetch initial data when the document is ready
    fetchData();
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('move-button');
    let currentCircle = 1;
    let fuel = 0; // Initialize fuel at start

    button.addEventListener('click', function() {
        $.ajax({
            url: "/get-questions", // Assuming this endpoint also correctly updates `fuel`
            type: "POST",
            dataType: "json",
            success: function(response) {
                questions = response.formatted_information;
                fuel = parseInt(response.fuel, 10); // Update fuel from the server

                // Check fuel conditions based on the current circle before moving the dot
                if ((currentCircle === 1 && fuel > 100) ) { 
                    currentCircle = currentCircle >= 3 ? 1 : currentCircle + 1;
                    moveDotToCircle(currentCircle);
                    fuel = fuel - 100;
                    $.ajax({
                        url: "/update_fuel",
                        type: "POST",
                        dataType: "json",
                        data: {
                            "fuel" : fuel
                        },
                        success: function(response) {
                            alert(response.Fuel)
                            var element = document.querySelector('#fuel-number');
                            element.innerHTML = 'Fuel: '+ response.Fuel; 
                        },
                        error: function(error) {
                            alert("bad");
                        }
                    });

                }
                else if ((currentCircle === 2 && fuel > 200)){
                    currentCircle = currentCircle >= 3 ? 1 : currentCircle + 1;
                    moveDotToCircle(currentCircle);
                    fuel = fuel - 200;
                    $.ajax({
                        url: "/update_fuel",
                        type: "POST",
                        dataType: "json",
                        data: {
                            "fuel" : fuel
                        },
                        success: function(response) {
                            var element = document.querySelector('#fuel-number');
                            element.innerHTML = 'Fuel: '+ response.Fuel; 
                        },
                        error: function(error) {
                            alert("bad");
                        }
                    });

                }
                else if (currentCircle === 3){
                    alert("Last planet reached")
                }
                 else {
                    alert("Not enough fuel to proceed!"); // Inform the user if not enough fuel
                }

            },
            error: function(error) {
                console.error('Error fetching questions:', error);
            }
        });
    });

    function moveDotToCircle(circleNumber) {
        // Remove dot from all circles
        document.querySelectorAll('.dot').forEach(dot => {
            dot.remove();
        });

        // Add dot to the specified circle
        const newDot = document.createElement('div');
        newDot.className = 'dot';
        document.getElementById('circle' + circleNumber).appendChild(newDot);
    }

    
});