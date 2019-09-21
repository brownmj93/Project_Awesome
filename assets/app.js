var ingredients = "chicken,flour,sugar";
var url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}=10&ranking=2&apiKey=bc2496f0cbc84ffea77af8212c502219`;

$.ajax({
  
  url: url,
 method: "GET"
 
}).then(function(e){
  console.log(ingredients);
  
    console.log(e);
    console.log(e[0].title);
 
    

    
    
});