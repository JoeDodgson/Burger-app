// Wait until the DOM is fully loaded Make sure we wait to attach our handlers .
$(function() {

  // Listener for the devour button click
  $(".devour-button").on("click", function(event) {
    // Prevent default on the devour-button click event
    event.preventDefault();

    // Store the id of the burger being eaten from the data-id attribute
    const id = $(this).data("id");

    // Send the PUT request using the id of the burger being eaten
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT"
    }).then(
      () => {
        // Reload the page to get the updated list of burgers
        location.reload();
      }
    );
  });

  // Listener for the form submit
  $(".create-form").on("submit", function(event) {
    // Prevent default on the submit click event
    event.preventDefault();

    // Create an object for the new burger using the text input by the user. Trim space characters from end
    const newBurger = {
      name: $("#burger-name-input").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
