var signUpForm = $("form.signup");
var emailInput = $("input#email-input");
var passwordInput = $("input#password-input");

signUpForm.on("submit", function(event){
  event.preventDefault();
  if(event.isDefaultPrevented()){
    console.log("default prevented")
  } else {
  console.log("line 8")
  }
  var userData = {
    email: emailInput.val().trim(),
    password: passwordInput.val().trim()
  };

  if(!userData.email || !userData.password){
    return;
  }

  signUpUser(userData.email, userData.password);
  emailInput.val("");
  passwordInput.val("");
});

function signUpUser(email, password){
  console.log("line 23")
  $.post("/api/signup", {
    email: email,
    password: password
  })
  .then(function(data){
    window.location.replace("/books");
    // window.location.href="/books";
  })
  .error(err => console.log(err));
}

function handleLoginErr(err){
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}
