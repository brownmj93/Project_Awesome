



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


