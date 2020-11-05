$(".testbtn").on("click", function(event){
  event.preventDefault();
  let testInput = $(".test").val().trim(); 
  $.ajax("/api/test", {
    type: "POST",
    data: testInput
  }).then(function(res){
    console.log("Succesully created test")
  })
})