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

    // for loop will go through the lenght of parameter arrayToUse for as long as the condition proves true the loop statements will execute and the counter will increase by one; when the condition proves false; the loop terminates
    for (var i = 0; i < arrayToUse.length; i++) {
        
    // variable a is declared, it will contain a button created via jquery for every animal in the animals array
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

    // the on() method is attaching an event function to the jquery object, in this case the event is a click to the class animal button
    $(document).on("click", ".animal-button", function () {
    // the div with the id animals is being selected via jquery and the method empty() is being used to empty its contents
        $("#animals").empty();
        
        // using jquery the class animal-button is being selected and its class active is being removed
        $(".animal-button").removeClass("active");
        
        // the value of the dom object with the class animal-button (the buttons with the individual categories), is being capture when clicked and then the class active is being assigned to it.
        $(this).addClass("active");
        
        // variable type is being declared and the value of this is being passed to it along with the attributes of data-type
        var type = $(this).attr("data-type");
        
        // var queryURL is declared and it is assigned the api giphy's web address, the data type is being concatenated  along with the api key and the maximum number of results to be displayed on the page
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // the ajax method is being used to perform an asynchronous request to the api
    $.ajax({

        // in key value pairs the content of queryURL is being passed to url
        url: queryURL,
        // and method gets the type of request wanted, in this case GET
    method: "GET"
    })
        
        // .then() method is the promise to accept the information requested from the library and passes that information to the declared function (response), this information comes back in the form on an array of objectes
    .then(function (response) {
        
        // the ajax response is being stored in the variable results, the response being in the data type of an object
        var results = response.data;

        // for loop will go through the lenght of parameter results for as long as the condition proves true the loop statements will execute and the counter will increase by one; when the condition proves false; the loop terminates
        for (var i = 0; i < results.length; i++) {

        // variable animalDiv is being assigned a new div via jquery with the class animal item, the backslashes (escape selectors) are being used instead of using single quotes inside double quotes
            var animalDiv = $("<div class=\"animal-item\">");
            
        // the contents of rating at results iteration i are being stored in the variable rating this the rating for each image displayed
            var rating = results[i].rating;

        // a p tag is being created via jquery, the word Rating and the value of rating are going to be put in it, the p tag is being stored in the variable p
        var p = $("<p>").text("Rating: " + rating);

        // the values of result at iteration i are being passed to the variable animated, these are the moving images, when clicked their state swtiches to still
            var animated = results[i].images.fixed_height.url;
            
        // the vaules of results at iteration i are being passed to the variable still, these are the still images that when clicked start to 'play' or move
            var still = results[i].images.fixed_height_still.url;
            
        // an image tag is going to be created using jquery and it is going to be passed to the variable animalImage
            var animalImage = $("<img>");
            
        // variable animalImage being passed the attributes of source and the contents of the variable still, each time a button is clicked this will display the first ten images in the promise from line 67
            animalImage.attr("src", still);
            
        // animalImage is being assigned the attribute of "data-still" and the values of the variable still, in this case the still image fo the gif will be displayed
            animalImage.attr("data-still", still);
            
        // animalImage is being assigned the atribute of "data-state", and the values of the variable animated which contains the url for the "moving" gif
            animalImage.attr("data-animate", animated);
            
        // 
            animalImage.attr("data-state", "still");
            
        // the class "animal-image" is being assigned to the animalImage variable
        animalImage.addClass("animal-image");

        //the contents of the paragraph created in line 82 and the word rating along with the value of rating are being append to the animalDiv variable which in turn adds a div with the class animal-item to the dom 
            animalDiv.append(p);

        // the animalImage variable is being appended to the animalDiv variable which is the same div the rating is being appended to
            animalDiv.append(animalImage);
            
        // the contents of both animalImage and  p are being appended to the div animals
        $("#animals").append(animalDiv);
        }  // closes for loop
    });  // closes the .then method and the promise
}); //closes on click and its function

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