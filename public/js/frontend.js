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
      
      response.items.forEach(element => {

        searchedBook = $("<div>").addClass("card")
        
        title = $("<h5>").text(element.volumeInfo.title).addClass("nonDisplay")
        authors = $("<p>").text(element.volumeInfo.authors[0]).addClass("nonDisplay")

        coverPic = $("<img>").attr("src",element.volumeInfo.imageLinks.smallThumbnail)
        coverPic.attr("class","coverPic card-img-top")
        searchedBook.append(coverPic)
        cardBody = $("<div>").addClass("overlay")
        searchedBook.append(cardBody)
        // searchedBook.append(searchedBook)
        searchedBook.append(title)
        searchedBook.append(authors)
        
        $("#searchRes").append(searchedBook)
        $(searchedBook).on("click",(event)=>{
          console.log("click")
          console.log(event.currentTarget.children[2].innerText)
          let newClickedBook = {
            book_title: event.currentTarget.children[2].innerText,
            author_name: event.currentTarget.children[3].innerText,
            book_cover: event.currentTarget.children[0].src,
            read_status: false
          }
          console.log(newClickedBook)
          $.ajax("api/books", {
            type: "POST",
            data: newClickedBook
          }).then(function(){
            // location.reload();
          })
        })
      });
    });
    
    $("#searchRes").empty();
  })
  
  $(".read-me").on("click",(event2)=>{
    console.log("click")
    let id = $(this).context.activeElement.dataset.id
    console.log(id)
    let newReadState = {
      read_status: true
    };

    $.ajax(`api/books/${id}`, {
      type: "PUT",
      data: newReadState
    }).then(function(){
      console.log("updated")
      location.reload()
    })
  })
})