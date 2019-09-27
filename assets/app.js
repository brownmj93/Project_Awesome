
var searchInput;

//Save user input into an array
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  $("#searchParameter").empty();
  searchInput = $("#ingredients").val().trim();
  $("#ingredients").val("");
  $("#searchParameter").append("You searched for " + searchInput);

  $("#backBtn").addClass('enable');

  //Calling APIs
  getReceipe();
  nutrition();

});


//Display search results
var equipment = [];
var equipmentArray;

$('#displaySection').on('click', 'div', function () {
  var id = $(this).data('id');
  var url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=bc2496f0cbc84ffea77af8212c502219`

  $.ajax({
    url: url,
    method: "GET"
  }).then(function (data) {

    console.log(data);
    // console.log(data.analyzedInstructions[0].steps[0].);

    //if statment to determine if this recipe has instructions
    if (data.analyzedInstructions.length > 0) {

      //instructions and equipment
      console.log("steps");
      data.analyzedInstructions[0].steps.forEach(function (e, index) {
        console.log((index + 1) + " " + e.step);

        data.analyzedInstructions[0].steps[0].equipment.forEach(function (e) {
          //array and deleted duplicate array 
          equipment.push(e.name);
          var newArray = new Set(equipment);
          equipmentArray = [...newArray];
        });

      });
    } else {
      console.log("this recipe is missing instructions");
    }
    //extended ingrdients
    data.extendedIngredients.forEach(function (e) {
      console.log("ingredients");
      console.log(e.originalString);

    });
  });

});

//Calls the API to get list of receipes
function getReceipe() {
  var url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput}=&number=10&ranking=2&apiKey=bc2496f0cbc84ffea77af8212c502219`;

  $.ajax({

    url: url,
    method: "GET"

  }).then(function (data) {

    console.log("recipe Name: " + data[0].title);
    console.log('image: ' + data[0].image);
    console.log(data);

    data.forEach(myFunction);

    function myFunction(item) {
      console.log(item.id);

      var div = $('<div>');
      var h3 = $('<h3>');
      var img = $('<img>');
      img.attr('src', item.image);
      h3.text(item.title);
      div.attr('data-id', item.id);
      div.append(h3);
      //append images comment out
      // div.append(img);
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
  console.log('FoodName: ', totalCarbs);
  var protein = [];
  console.log('FoodName: ', protein);
  var totalFat = [];
  console.log('FoodName: ', totalFat);

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

}