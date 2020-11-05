$(document).ready(function(){

  $(".testbtn").on("click", function(event){
    event.preventDefault();
    let searchTerm = $(".test").val()
    console.log(searchTerm)
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm,
      "method": "GET"
      
    };
  
    $.ajax(settings).done(function (response) {
      console.log(response.items);
      let bookObj = $("<div>")
      let bookName = $("<p>").text(response.items)
      
      $("#testArea").val(response.items[0])
    });
    


  })
  
  
})