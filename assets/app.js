



  //Save user input into an array
  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#searchParameter").empty();
    var searchInput = $("#ingredients").val().trim();
    $("#ingredients").val("");
    $("#searchParameter").append("You searched for " + searchInput);

    var url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput}=&number=10&ranking=2&apiKey=bc2496f0cbc84ffea77af8212c502219`;
 
    $.ajax({
  
      url: url,
      method: "GET"
     
    }).then(function(data){  

      
        console.log("recipe Name: " +data[0].title);
        console.log('image: '+ data[0].image);
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
  
  
  });

  var equipment = [];
  var equipmentArray;

  $('#displaySection').on('click','div', function(){
    var id = $(this).data('id');
    var url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=bc2496f0cbc84ffea77af8212c502219`
   
    $.ajax({
      url: url,
      method: "GET" 
    }).then(function(data){
     
      console.log(data);
      // console.log(data.analyzedInstructions[0].steps[0].);
   
      //if statment to determine if this recipe has instructions
      if(data.analyzedInstructions.length > 0){

          //instructions and equipment
          console.log("steps");
      data.analyzedInstructions[0].steps.forEach(function(e, index){
          console.log((index+1) + " " +e.step);

          data.analyzedInstructions[0].steps[0].equipment.forEach(function(e){      
            //array and deleted duplicate array 
            equipment.push(e.name);
            var newArray = new Set(equipment);
            equipmentArray = [...newArray];
          }); 
        }); 
      }else{
        console.log("this recipe is missing instructions");
      }
         //extended ingrdients
        data.extendedIngredients.forEach(function(e){ 
          console.log("ingredients");    
          console.log(e.originalString);
              
         });
        
      });
     
       
        
      
  });


