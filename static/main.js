$(document).ready(function() {
    $.ajax({
        url: "/get-questions",
        type: "POST",
        dataType: "json",
        success: function(response) {
            var data = response.formatted_information[0].facts;  // Get the facts of the first question
            $('#data-container').text(data);  // Display the facts in the data container
        },
        error: function(error) {
            console.error('Error fetching data:', error);
        }
    });
});
