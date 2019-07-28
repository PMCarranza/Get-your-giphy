    // ready() it is used to make the function available for javascript to run after the document has loaded.
    // once the dom is loaded the code inside the funtion will run
$(document).ready(function () {

    // variable animals is declared and array containing 21 catefories of animals is assigned to it.
var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog", "chupacabra", "leon", "foca", "tigre", "quetzal"
];

    // function populateButtons is defined and three parameters are assigne to it
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // method empty() is being used to empty the contents of areaToAdd, this will be done every time the code runs before any other content is added, clearing the way for a new set of pictures to be added to the dom
    $(areaToAddTo).empty();

    // for loop will go through the lenght of parameter arrayToUse for as long as the condition proves true and the loop statements will execute and the counter will increase by one; when the condition proves false; the loop terminates
        for (var i = 0; i < arrayToUse.length; i++) {
        
    // variable a is declared, it will contain a button created via jquery using jquery
            var a = $("<button>");
            
    // variable a is assigned the class classToAdd which is one of the parameters of the populateButtons function
            a.addClass(classToAdd);
            
    // sets variable a with the attribute of data-type and value of arrayToUse at i via the .attr method
            a.attr("data-type", arrayToUse[i]);

    // variable a is being set with the text content of arrayToUse at i
            a.text(arrayToUse[i]);
            
    // the contents of a are inserted at the end of areToAddTo which was emptied earlier
    $(areaToAddTo).append(a);
    }

}

$(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
        }
    });
});

$(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    }
    else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    }
});

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
    animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");

});

populateButtons(animals, "animal-button", "#animal-buttons");
});