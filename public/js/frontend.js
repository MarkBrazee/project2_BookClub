$(document).ready(function(){
  // $.get("api/books",(data)=>{
  //   console.log(data)
  //   res.json(data)
  //   // let hbsObject = {
  //   //   bookTable: data
  //   // }
  //   // console.log(hbsObject)
    
  // })
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

        searchedBook = $("<div>").addClass("card test")
        title = $("<p>").text(element.volumeInfo.title)
        authors = $("<p>").text(element.volumeInfo.authors[0])

        coverPic = $("<img>").attr("src",element.volumeInfo.imageLinks.smallThumbnail)
        coverPic.attr("class","coverPic")
        searchedBook.append(title)
        searchedBook.append(authors)
        searchedBook.append(coverPic)
        $("#searchRes").append(searchedBook)
        $(searchedBook).on("click",(event)=>{
          console.log("click")
          let newClickedBook = {
            book_title: event.currentTarget.children[0].innerText,
            author_name: event.currentTarget.children[1].innerText,
            book_cover: event.currentTarget.children[2].src
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
  
  
})