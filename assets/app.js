
var searchInput;

//Save user input into an array
$("#searchBtn").on("click", function (event) {
  $('#displaySection').empty();
  event.preventDefault();

  $("#searchParameter").empty();
  searchInput = $("#ingredients").val().trim();
  checkInput();

  $("#ingredients").val("");
  //$("#searchParameter").append("You searched for " + searchInput);
});

//Function for validating user input
function checkInput() {
  var specialCharacters = new RegExp(/[~`!#$%\^&*+=\-\[\]\\;/{}|\\":<>\?]/);

  if (searchInput == "") {
    console.log("empty string");
    $("#inputValidationBody").text("Please enter ingredients");
    $("#inputValidation").modal();
  }
  else if ((searchInput.match(/\d+/g) != null) && (specialCharacters.test(searchInput))) {
    console.log("it has both");
    $("#inputValidationBody").text("Please check your search input.");
    $("#inputValidation").modal();
  }
  else if (searchInput.match(/\d+/g) != null) {
    console.log("it's a number");
    $("#inputValidationBody").text("You typed a number! Please check your search input.");
    $("#inputValidation").modal();
  }
  else if (specialCharacters.test(searchInput)) {
    console.log("special character");
    $("#inputValidationBody").text("Special character in your search! Please check your search input.");
    $("#inputValidation").modal();
  }
  else {
    console.log(searchInput);
    //Calling APIs
    getRecipe();
    nutrition();
  }
};

//Back button
$("#backBtn").on("click", function (event) {
  console.log("btn works");
  console.log(searchInput);
  // clear the container
  $('#displaySection').empty();

  //Disable back to results button
  $("#backBtn").addClass('disabled');
  getRecipe();
});

//Display recipe instruction
var equipment = [];
var equipmentArray;

$('#displaySection').on('click', 'div', function () {
  var id = $(this).data('id');
  var title = $('<h2>');
  title.text($(this).text());
  console.log(title);
  var url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=bc2496f0cbc84ffea77af8212c502219`

  $.ajax({
    url: url,
    method: "GET"
  }).then(function (data) {

    // clear the container
    $('#displaySection').empty();

    console.log(data);
    // console.log(data.analyzedInstructions[0].steps[0].);

    //Display title
    $('#displaySection').append(title);

    //Display the ingredients to the page
    data.extendedIngredients.forEach(function (e) {
      console.log("ingredients");
      console.log(e.originalString);

      var ingredients = $('<h4>');
      ingredients.text(e.originalString + "\n");
      ingredients.appendTo('#displaySection');
    });

    //Add space between ingredients & instruction
    $('#displaySection').append('<br>');

    //if statment to determine if this recipe has instructions
    if (data.analyzedInstructions.length > 0) {

      //instructions and equipment
      console.log("steps");
      data.analyzedInstructions[0].steps.forEach(function (e, index) {
        console.log((index + 1) + " " + e.step);

        // Display instruction in the display section
        var instruction = $('<p>');
        instruction.text((index + 1) + " " + e.step);
        instruction.appendTo('#displaySection');

        data.analyzedInstructions[0].steps[0].equipment.forEach(function (e) {
          //array and deleted duplicate array 
          equipment.push(e.name);
          var newArray = new Set(equipment);
          equipmentArray = [...newArray];
        });

      });
    } else {
      console.log("this recipe is missing instructions");
      //Alert missing instruction
      $("#missingRecipe").modal();
    }
  });
  //Enable back to results button
  $("#backBtn").removeClass('disabled');
});

//Calls the API to get list of recipes
function getRecipe() {
  var url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput}=&number=10&ranking=2&apiKey=151232fe2a814bb085ada1bc425abb72`;

  $.ajax({

    url: url,
    method: "GET"

  }).then(function (data) {

    console.log("recipe Name: " + data[0].title);
    console.log('image: ' + data[0].image);
    console.log(data);
    var result = $('<h2>');
    result.text("Results for " + searchInput);
    result.appendTo('#displaySection');

    data.forEach(myFunction);

    function myFunction(item) {
      console.log(item.id);

      var div = $('<div>');
      var h3 = $('<h3>');
      var img = $("<img>");
      img.attr('src', item.image);
      h3.text(item.title);
      div.attr('data-id', item.id);
      div.addClass("eachRecipe");

      //append images and recipe title
      div.append(img);
      div.append(h3);
      div.appendTo('#displaySection');
    }
  });
}

//Gets the nutrition values
function nutrition() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://trackapi.nutritionix.com/v2/natural/nutrients?x-app-id=4a1eb941&x-app-key=b2d5ab917b068c98f8da06f5987afca8&x-remote-user-id=0&locale=en_US",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "86e48f29-e857-4120-afcc-731dda7b43c7"
    },
    "processData": false,
    "data": `{\r\n \"query\":\"${searchInput}\",\r\n \"timezone\": \"US/Eastern\"\r\n}`
  }

  var calories = [];
  console.log('Calories: ', calories);
  var foodName = [];
  console.log('FoodName: ', foodName);
  var totalCarbs = [];
  console.log('Total Carbs: ', totalCarbs);
  var protein = [];
  console.log('Protein G: ', protein);
  var totalFat = [];
  console.log('Total Fat: ', totalFat);

  function foodList(results) {

    for (i = 0; i < results.length; i++) {

      pieList = results[i];
      console.log('Search results Array: ', pieList.food_name, 'Serving Size: ', pieList.serving_qty, pieList.serving_unit, 'Calories: ', pieList.nf_calories, 'Fat: ', pieList.nf_total_fat, 'Protein: ', pieList.nf_protein);
      calories.push(pieList.nf_calories);
      foodName.push(pieList.food_name);
      protein.push(pieList.nf_protein);
      totalFat.push(pieList.nf_total_fat);
      totalCarbs.push(pieList.nf_total_carbohydrate);

    }
  }

  $.ajax(settings).done(function (response) {

    console.log('RESPONSE: ', response);

    var results = response.foods;
    console.log('RESULTS VAR = response.foods: ', results);
    console.log('RESULTS VAR[0].food_name: ', results[0].food_name);
    console.log('RESULTS VAR[0].serving_qty: ', results[0].serving_qty);
    console.log('RESULTS VAR[0].serving_unit: ', results[0].serving_unit);
    console.log('RESULTS VAR[0].nf_calories: ', results[0].nf_calories);
    console.log('RESULTS VAR[0].nf_total_fat: ', results[0].nf_total_fat);
    console.log('RESULTS VAR[0].nf_protein: ', results[0].nf_protein);
    console.log('RESULTS VAR[0].nf_total_carbohydrate: ', results[0].nf_total_carbohydrate);
    foodList(results);
  });



  //chartjs//

  new Chart(document.getElementById("doughnut-chart-cals"), {
    type: 'doughnut',
    data: {
        labels: foodName,
        datasets: [{
            label: "Calories by ingredient",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: calories
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Calories by ingredient'
        }
    }
   });
   new Chart(document.getElementById("doughnut-chart-protein"), {
    type: 'doughnut',
    data: {
        labels: foodName,
        datasets: [{
            label: "Protein by ingredient",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: protein
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Protein by ingredient'
        }
    }
   });
   new Chart(document.getElementById("doughnut-chart-carbs"), {
    type: 'doughnut',
    data: {
        labels: foodName,
        datasets: [{
            label: "Carbs by ingredient",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
            data: totalCarbs
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Carbs by ingredient'
        }
    }
   });
   
   

}

