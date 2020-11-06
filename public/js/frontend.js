$(document).ready(function(){
  $("#bookSearch").on("click", function(event){
    event.preventDefault();
    let searchTerm = $("#searchTerms").val()
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm,
      "method": "GET"
    };
  
    $.ajax(settings).done(function (response) {
      console.log(response.items);
      response.items.forEach(element => {
        console.log(element.volumeInfo.title)
        console.log(element.volumeInfo.authors[0])
        console.log(element.volumeInfo.imageLinks.smallThumbnail)
      });
      $("#testArea").val(response.items[0].volumeInfo.title)
    });
    


  })
  
  
})