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
            if (response.formatted_information) {
                console.log('Formatted Information: ', response.formatted_information);
                window.location.href = '/notes';
            }
        },
        error: function(error) {
            console.error('Error fetching data for planet ' + planetNumber, error);
        }
    });
}


// Handle the flashcard movements
$(document).ready(function() {
    var currentIndex = 0;
    var facts = [];

    // Function to fetch data from the server
    function fetchData() {
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            dataType: "json",
            success: function(response) {
                facts = response.stored_data;
                facts = parseQuestionString(facts)
                displayFact(currentIndex);
            },
            error: function(error) {
                
            }
        });
    }

    // Change the format of the questionString so it works for the movement and accessing of index
    function parseQuestionString(questionString) {
        var items = questionString.split(',');
        var questions = [];
        var temp = [];
    
        items.forEach((item, index) => {
            temp.push(item);

            if (item.endsWith('.')) {
                questions.push([...temp]); 
                temp = [];
            }
        });
    
        return questions;
    }
    

    // Display the fact (flashcard)
    function displayFact(index) {
        if (index < facts.length && facts[index].length > 7) {
            var fact = facts[index][7];
            $('#data-container').text(fact);
        } else {
            $('#data-container').text("No detail available for this fact.");
        }
    }
    

    // Function to handle the next button click
    $('#next-btn').click(function() {
        if (currentIndex >= facts.length - 1) {
            alert("This is the end of the stack");
        }else{ 
            currentIndex++;
            displayFact(currentIndex);          
        }

    });


    // Function to handle the previous button click
    $('#prev-btn').click(function() {
        if (currentIndex === 0) {
            alert("This is the start of the stack");
        }else{
            currentIndex--;
            displayFact(currentIndex);         
        }

    });

    fetchData();
});


// Handles the movement and logic of questions
$(document).ready(function() {
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
            if (item.endsWith('.')) {
                ques.push([...temp]); 
                temp = [];
            }
        });
    
        return ques;
    }
    

    // Display the questions as mcq format
    function displayQuestion(questionIndex) {
        const questionData = questions[questionIndex];
        $('#question-title').text((questionIndex + 1) + '. ' + questionData[1]);
        const correctAnswer = questionData[6];
        const fact = questionData[7];

        ['answer1', 'answer2', 'answer3', 'answer4'].forEach((id, index) => {
            const answer = questionData[index + 2];
            const answerElement = $(`#${id}`);
            answerElement.find('button').off('click').click(function() { 
                checkAnswer(answer, correctAnswer, fact); 
            });
            answerElement.find('span').text(answer);
        });

        $('#next-question').toggle(questionIndex < questions.length - 1);
    }

    // Function to check answer and update database
    function checkAnswer(selectedAnswer, correctAnswer, fact) {
        if (selectedAnswer === correctAnswer) {
            score++;
            var element = document.querySelector('#\\#score-quiz');
            element.innerHTML = 'Score: '+ score;
            alert("Correct");
            updateFuel();
        
        } else {
            alert("Incorrect!\n" + fact);
        }
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            alert('You have reached the end of the quiz!');
            $('#next-question').hide();
            window.location.href = '/level';
        }
    }
    
    // Function to update fuel
    function updateFuel(){
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