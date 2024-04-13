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
