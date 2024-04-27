// Handles the level page
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.planet-btn').forEach(button => {
        button.addEventListener('click', function() {
            const planetNumber = this.getAttribute('data-planet');
            console.log("Planet number: ", planetNumber);
            // Get the amount of fuel from flask
            $.ajax({
                url: "/get_fuel",
                type: "POST",
                dataType: "json",
                success: function(response) {
                    fuelAmount = parseInt(response.fuel);
                },
                error: function(error) {
                    alert("Failed to fetch data.");
                }
            });
            // Determine which planet they are at and fetch data according to that plannet
            if ((planetNumber === '1') || (planetNumber === '2' && fuelAmount >= 100) || (planetNumber === '3' && fuelAmount >= 300)) {
                fetchDataForPlanet(planetNumber);
            } else {
                alert('Not enough fuel to travel to planet ' + planetNumber);
            }
        });
    });
});


// Get data accoring to the planet
function fetchDataForPlanet(planetNumber) {
    // Fetch data about planet from backend
    $.ajax({
        url: "/get-questions2",
        type: "POST",
        data: { "planet": planetNumber },
        dataType: "json",
        success: function(response) {
            console.log('Data fetched for planet ' + planetNumber + ": ", response);
            // Save the data so it can be use afterwards
            if (response.formatted_information) {
                console.log('Formatted Information: ', response.formatted_information);
                window.location.href = '/notes';
                // saveData(response.formatted_information);  // Pass data directly to saveData
            }
        },
        error: function(error) {
            console.error('Error fetching data for planet ' + planetNumber, error);
        }
    });
}


// Handle the flashcard movements
$(document).ready(function() {
    // Initialise the index, and facts
    var currentIndex = 0;
    var facts = [];

    // Function to fetch data from the server
    function fetchData() {
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            dataType: "json",
            success: function(response) {
                // alert(response.stored_data)
                facts = response.stored_data;
                // Format the facts
                facts = parseQuestionString(facts)
                displayFact(currentIndex);
            },
            error: function(error) {
                
            }
        });
    }

    function parseQuestionString(questionString) {
        // Change the format of the questionString so it works for the movement and accessing of index
        var items = questionString.split(',');
        var questions = [];
        var temp = [];
    
        items.forEach((item, index) => {
            temp.push(item);
    
            // Assuming the last item of each question could be detected by a keyword or sentence ending.
            // Stop appending when all the information of an element is appended
            // Purposefully made each element to end with a period before a new fact
            if (item.endsWith('.')) {
                questions.push([...temp]);  // Clone temp array into questions
                temp = [];  // Reset for next question
            }
        });
    
        return questions;
    }
    

    // Display the fact (flashcard)
    function displayFact(index) {
        if (index < facts.length && facts[index].length > 7) {
            // The fact exists at index 7
            var fact = facts[index][7];
            $('#data-container').text(fact);
        } else {
            $('#data-container').text("No detail available for this fact.");
        }
    }
    

    // Function to handle the next button click
    $('#next-btn').click(function() {
         // Increment the index
        if (currentIndex >= facts.length - 1) {
            alert("This is the end of the stack");
        }else{
             // Display the next fact  
            currentIndex++;
            displayFact(currentIndex);          
        }

    });


    // Function to handle the previous button click
    $('#prev-btn').click(function() {
         // Decrement the index
        if (currentIndex === 0) {
            alert("This is the start of the stack");
        }else{
            currentIndex--;
            displayFact(currentIndex);         
        }

    });

    // Fetch initial data when the document is ready
    fetchData();
});


// Handles the movement and logic of questions
$(document).ready(function() {
    // Initialise question index, questions and score
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0;

    // Fetch the data from server to get the information about the planet
    function fetchData() {
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            dataType: "json",
            success: function(response) {
                questions = response.stored_data;
                // Same as before call the function to format the questions
                questions = parseQuestionString2(questions);
                if (questions.length > 0) {
                    displayQuestion(currentQuestionIndex);
                }
            },
            error: function(error) {
                
            }
        });
        // Fetch the fuel data then initialise it
        $.ajax({
            url: "/get_fuel",
            type: "POST",
            dataType: "json",
            success: function(response) {
                fuel = parseInt(response.fuel);
            },
            error: function(error) {
            
            }
        });
    }

    // Function to convert the questionString so it can be accessible by index
    function parseQuestionString2(questionString) {
        var items = questionString.split(',');
        var ques = [];
        var temp = [];
    
        items.forEach((item, index) => {
            temp.push(item);
    
            // Assuming the last item of each question could be detected by a keyword or sentence ending.
            // Stop appending when all the information of an element is appended
            // Purposefully made each element to end with a period before a new fact
            if (item.endsWith('.')) {
                ques.push([...temp]);  // Clone temp array into questions
                temp = [];  // Reset for next question
            }
        });
    
        return ques;
    }
    

    // Display the questions
    function displayQuestion(questionIndex) {
        const questionData = questions[questionIndex];
        // Questions are at index 1
        $('#question-title').text((questionIndex + 1) + '. ' + questionData[1]);
        // Correct answers are at index 6
        const correctAnswer = questionData[6];
        // The fact is at index 7
        const fact = questionData[7];

        ['answer1', 'answer2', 'answer3', 'answer4'].forEach((id, index) => {
            const answer = questionData[index + 2];
            const answerElement = $(`#${id}`);
            // When the answer button is pressed calls the check answer function
            answerElement.find('button').off('click').click(function() { 
                checkAnswer(answer, correctAnswer, fact); 
            });
            answerElement.find('span').text(answer);
        });

        $('#next-question').toggle(questionIndex < questions.length - 1);
    }

    // Function to check answer
    function checkAnswer(selectedAnswer, correctAnswer, fact) {
        // If correct, increment the score and update fuel
        if (selectedAnswer === correctAnswer) {
            score++;
            var element = document.querySelector('#\\#score-quiz');
            element.innerHTML = 'Score: '+ score;
            alert("Correct");
            updateFuel();
        
        } else {
            alert("Incorrect!\n" + fact);
        }

        // If there are no more questions, alert user and let them know
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            alert('You have reached the end of the quiz!');
            $('#next-question').hide();
            // Goes back to level page
            window.location.href = '/level';
        }
    }
    
    // Function to update fuel
    function updateFuel(){
        // Adds ten
        fuel = fuel+ 10;
        // Connect to the server and update fuel to the database
        $.ajax({
            url: "/update_fuel",
            type: "POST",
            dataType: "json",
            data: {
                "fuel" : fuel
            },
            success: function(response) {
            },
            error: function(error) {
              
            }
        });
    }
    // When document loaded, fetch content
    fetchData();
})


const stars = 150

function createStars() {
    const previousStars = document.querySelectorAll('.stars');
    previousStars.forEach(star => star.remove());

    for (let i = 0; i < stars; i++) {
        let star = document.createElement("div");
        star.className = 'stars';
        var xy = randomPosition();
        star.style.top = xy[0] + 'px';
        star.style.left = xy[1] + 'px';
        document.body.append(star);
    }
}

function randomPosition() {
    var y = window.innerWidth
    var x = window.innerHeight
    var randomX = Math.floor(Math.random() * x)
    var randomY = Math.floor(Math.random() * y)
    return [randomX, randomY]
}

createStars();

setInterval(createStars, 5000);