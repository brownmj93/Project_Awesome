



  //Save user input into an array
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#searchParameter").empty();
    var searchInput = $("#ingredients").val().trim();
    $("#ingredients").val("");
    $("#searchParameter").append("You searched for " + searchInput);

    var url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput}=10&ranking=2&apiKey=bc2496f0cbc84ffea77af8212c502219`;

    $.ajax({
  
      url: url,
      method: "GET"
     
    }).then(function(data){
    
        console.log(searchInput);
      
        console.log(data);
        console.log(data[0].title);
     
    });
    


  });
v
  var food = "chicken, beef, eggs"
    
    
    
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
  "data": `{\r\n \"query\":\"${food}\",\r\n \"timezone\": \"US/Eastern\"\r\n}`
}

var calories = [];
console.log('Calories: ', calories);
var foodName = [];
console.log('FoodName: ',foodName);
var totalCarbs = [];
console.log('FoodName: ',totalCarbs);
var protein = [];
console.log('FoodName: ',protein);
var totalFat = [];
console.log('FoodName: ',totalFat);

function foodList(results) {

    for ( i = 0; i < results.length; i++) {

      pieList = results[i];
      console.log('Search results Array: ', pieList.food_name,'Serving Size: ', pieList.serving_qty, pieList.serving_unit,'Calories: ', pieList.nf_calories,'Fat: ',pieList.nf_total_fat,'Protein: ', pieList.nf_protein);
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
// ************** ABOVE LIES THE NUTRITION ****************//