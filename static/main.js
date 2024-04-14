document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.planet-btn').forEach(button => {
        button.addEventListener('click', function() {
            const planetNumber = this.getAttribute('data-planet');
            console.log("Planet number: ", planetNumber);
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
            if ((planetNumber === '1') || (planetNumber === '2' && fuelAmount >= 100) || (planetNumber === '3' && fuelAmount >= 300)) {
                fetchDataForPlanet(planetNumber);
            } else {
                alert('Not enough fuel to travel to planet ' + planetNumber);
            }
        });
    });
});

function fetchDataForPlanet(planetNumber) {
    $.ajax({
        url: "/get-questions2",
        type: "POST",
        data: { "planet": planetNumber },
        dataType: "json",
        success: function(response) {
            console.log('Data fetched for planet ' + planetNumber + ": ", response);
            if (response.formatted_information) {
                console.log('Formatted Information: ', response.formatted_information);
                saveData(response.formatted_information);  // Pass data directly to saveData
            }
        },
        error: function(error) {
            console.error('Error fetching data for planet ' + planetNumber, error);
        }
    });
}

function saveData(formattedInfo){
    console.log("Saving data: ", formattedInfo);
    $.ajax({
        url: "/save_data",
        type: "POST",
        contentType: "application/json",  // Setting content type as JSON
        data: JSON.stringify({ "formatted_info": formattedInfo }),
        dataType: "json",
        success: function(response) {

            window.location.href = '/notes';
        },
        error: function(error) {
            alert("Failed to save data.");
            console.error('Error saving data: ', error);
        }
    });
}

function displayData(globalData) {
    // Process and display data specific to the planet
    // alert(globalData);
    // // Example: Update UI elements based on fetched data
    // document.querySelector('#fuel-number').innerHTML = 'Fuel: ' + data.fuel;
}
// $(document).ready(function() {
//     var currentIndex = 0; // Initialize the index to 0
//     var facts = []; // Array to store all the facts

//     // Function to fetch data from the server
//     function fetchData() {
//         $.ajax({
//             url: "/get-questions",
//             type: "POST",
//             dataType: "json",
//             success: function(response) {
//                 alert(response.formatted_information)
//                 facts = response.formatted_information; // Store all facts
//                 displayFact(currentIndex); // Display the initial fact
//                 alert(facts);
//             },
//             error: function(error) {
//                 console.error('Error fetching data:', error);
//             }
//         });
//     }

//     // Function to display the fact at a given index
//     function displayFact(index) {
//         var fact = facts[index][7]; // Get the fact at the specified index
//         $('#data-container').text(fact); // Display the fact
//     }

//     // Function to handle the next button click
//     $('#next-btn').click(function() {
//          // Increment the index
//         if (currentIndex >= facts.length - 1) {
//             alert("finished"); // Reset index to loop back to the first fact
//         }else{
//             currentIndex++;
//             displayFact(currentIndex); // Display the next fact            
//         }

//     });

//     // Function to handle the previous button click
//     $('#prev-btn').click(function() {
//          // Decrement the index
//         if (currentIndex === 0) {
//             alert("start") // Set index to the last fact if it goes below 0
//         }else{
//             currentIndex--;
//             displayFact(currentIndex); // Display the previous fact            
//         }

//     });

//     // Fetch initial data when the document is ready
//     fetchData();
// });
$(document).ready(function() {
    var currentIndex = 0; // Initialize the index to 0
    var facts = []; // Array to store all the facts

    // Function to fetch data from the server
    function fetchData() {
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            dataType: "json",
            success: function(response) {
                // alert(response.stored_data)
                facts = response.stored_data;
                facts = parseQuestionString(facts)
                displayFact(currentIndex);
            },
            error: function(error) {
                
            }
        });
    }

    function parseQuestionString(questionString) {
        var items = questionString.split(',');
        var questions = [];
        var temp = [];
    
        items.forEach((item, index) => {
            temp.push(item);
    
            // Assuming the last item of each question could be detected by a keyword or sentence ending.
            // Here I'm assuming that each description at the end of a question ends with a period.
            // Adjust the logic according to your actual data.
            if (item.endsWith('.')) {
                questions.push([...temp]);  // Clone temp array into questions
                temp = [];  // Reset for next question
            }
        });
    
        return questions;
    }
    

    function displayFact(index) {
        if (index < facts.length && facts[index].length > 7) {
            var fact = facts[index][7]; // Make sure this index exists
            $('#data-container').text(fact); // Display the fact
        } else {
            $('#data-container').text("No detail available for this fact.");
        }
    }
    

    // Function to handle the next button click
    $('#next-btn').click(function() {
         // Increment the index
        if (currentIndex >= facts.length - 1) {
            alert("This is the end of the stack"); // Reset index to loop back to the first fact
        }else{
            currentIndex++;
            displayFact(currentIndex); // Display the next fact            
        }

    });

    // Function to handle the previous button click
    $('#prev-btn').click(function() {
         // Decrement the index
        if (currentIndex === 0) {
            alert("This is the start of the stack") // Set index to the last fact if it goes below 0
        }else{
            currentIndex--;
            displayFact(currentIndex); // Display the previous fact            
        }

    });

    // Fetch initial data when the document is ready
    fetchData();
});


$(document).ready(function() {
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0; // Initialize score

    function fetchData() {
        $.ajax({
            url: "/retrieve_data",
            type: "POST",
            dataType: "json",
            success: function(response) {
                // alert(response.stored_data)
                questions = response.stored_data;
                questions = parseQuestionString2(questions);
                if (questions.length > 0) {
                    displayQuestion(currentQuestionIndex);
                }
            },
            error: function(error) {
                
            }
        });
        $.ajax({
            url: "/get_fuel",
            type: "POST",
            dataType: "json",
            success: function(response) {
                // alert(response.stored_data)
                fuel = parseInt(response.fuel);
            },
            error: function(error) {
            
            }
        });
    }

    function parseQuestionString2(questionString) {
        var items = questionString.split(',');
        var ques = [];
        var temp = [];
    
        items.forEach((item, index) => {
            temp.push(item);
    
            // Assuming the last item of each question could be detected by a keyword or sentence ending.
            // Here I'm assuming that each description at the end of a question ends with a period.
            // Adjust the logic according to your actual data.
            if (item.endsWith('.')) {
                ques.push([...temp]);  // Clone temp array into questions
                temp = [];  // Reset for next question
            }
        });
    
        return ques;
    }
    

    function displayQuestion(questionIndex) {
        const questionData = questions[questionIndex];
        $('#question-title').text((questionIndex + 1) + '. ' + questionData[1]);
        const correctAnswer = questionData[6]; // Correct answer at index 6
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

    function checkAnswer(selectedAnswer, correctAnswer, fact) {
        if (selectedAnswer === correctAnswer) {
            score++;
            var element = document.querySelector('#\\#score-quiz');
            element.innerHTML = 'Score: '+ score;  // For HTML content
            alert("Correct");
            updateFuel();
            
        } else {
            alert("Incorrect!\n" + fact);
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
            displayQuestion(currentQuestionIndex);
        } else {
            alert('You have reached the end of the quiz!');
            $('#next-question').hide();
            window.location.href = '/level';
        }
    }

    // setTimeout(function() {
    //     window.location.href = '/home';
    // }, 3000); // Redirects after 3000 milliseconds (3 seconds)
    

    function updateFuel(){
        fuel = fuel+ 10;
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
// $(document).ready(function() {
//     let currentQuestionIndex = 0;
//     let questions = [];
//     let score = 0; // Initialize score

//     function fetchData() {
//         $.ajax({
//             url: "/retrieve_data",
//             type: "POST",
//             dataType: "json",
//             success: function(response) {
//                 alert(response.stored_data)
//                 questions = response.stored_data;
//                 questions = parseQuestionString(questions);
//                 if (questions.length > 0) {
//                     displayQuestion(currentQuestionIndex);
//                 }
//                 alert(questions);
//             },
//             error: function(error) {
//                 alert("Failed to fetch data.");
//             }
//         });
//     }

//     function parseQuestionString(questionString) {
//         var items = questionString.split(',');
//         var questions = [];
    
//         // Each question consists of 8 elements, loop through and group them
//         for (let i = 0; i < items.length; i += 8) {
//             // Slice out 8 elements for each question and push as a sub-array
//             questions.push(items.slice(i, i + 8));
//         }
    
//         return questions;
//     }
//     function displayQuestion(questionIndex) {
//         const questionData = questions[questionIndex];
//         $('#question-title').text((questionIndex + 1) + '. ' + questionData[1]);
//         const correctAnswer = questionData[6]; // Correct answer at index 6

//         ['answer1', 'answer2', 'answer3', 'answer4'].forEach((id, index) => {
//             const answer = questionData[index + 2];
//             const answerElement = $(`#${id}`);
//             answerElement.find('button').off('click').click(function() { 
//                 checkAnswer(answer, correctAnswer); 
//             });
//             answerElement.find('span').text(answer);
//         });

//         $('#next-question').toggle(questionIndex < questions.length - 1);
//     }

//     function checkAnswer(selectedAnswer, correctAnswer) {
//         if (selectedAnswer === correctAnswer) {
//             score++;
//             var element = document.querySelector('#\\#score-quiz');

//             element.innerHTML = 'Score: '+ score;  // For HTML content

//             alert("Correct! Your new score is " + score);
//             updateFuel();
//             alert(fuel);
//         } else {
//             alert("Incorrect");
//         }

//         if (currentQuestionIndex < questions.length - 1) {
//             currentQuestionIndex++;
//             localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
//             displayQuestion(currentQuestionIndex);
//         } else {
//             alert('You have reached the end of the quiz!');
//             $('#next-question').hide();
//             window.location.href = '/';
//         }
//     }

//     // setTimeout(function() {
//     //     window.location.href = '/home';
//     // }, 3000); // Redirects after 3000 milliseconds (3 seconds)
    

//     function updateFuel(){
//         alert("yes")
//         fuel = fuel+ 10;
//         $.ajax({
//             url: "/update_fuel",
//             type: "POST",
//             dataType: "json",
//             data: {
//                 "fuel" : fuel
//             },
//             success: function(response) {
//                 alert(response.Fuel)
//             },
//             error: function(error) {
//                 alert("bad");
//             }
//         });
//     }
//     fetchData();
// })

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