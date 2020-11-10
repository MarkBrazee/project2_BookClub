$(document).ready(function () {
  
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  // Socket.io Dependency 
  var socket = io(); // For Production
  // var socket = io('http://localhost:8080/') // For Testing LocalHost Server
  const messageContainer = document.getElementById("message-container");

  // Variables
  const messageContainer = document.getElementById("message-container");
  const messageForm = document.getElementById("send-container");
  const messageInput = document.getElementById("message-input");

  // Search for books 
  $("#bookSearch").on("click", function (event) {
    $("#searchRes").show();
    $(".btn-danger").show();
    event.preventDefault();
    let searchTerm = $("#searchTerms").val();
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://www.googleapis.com/books/v1/volumes?q=" + searchTerm,
      method: "GET",
    };

    // Create the search books
    $.ajax(settings).done(function (response) {
      response.items.forEach((element) => {
        searchedBook = $("<div>").addClass("card book-searched");

        title = $("<h5>").text(element.volumeInfo.title).addClass("display");
        authors = $("<p>")
          .text(element.volumeInfo.authors[0])
          .addClass("display");

        coverPic = $("<img>").attr(
          "src",
          element.volumeInfo.imageLinks.smallThumbnail
        );
        coverPic.attr("class", "coverPic card-img-top");
        searchedBook.append(coverPic);
        cardBody = $("<div>").addClass("overlay");
        searchedBook.append(cardBody);
        cardBody.append(title);
        cardBody.append(authors);

        $("#searchRes").append(searchedBook);
        
        // Click on a book to add to upcoming reads
        $(searchedBook).on("click", (event) => {
          let newClickedBook = {
            book_title: event.currentTarget.children[1].children[0].innerText,
            author_name: event.currentTarget.children[1].children[1].innerText,
            book_cover: event.currentTarget.children[0].src,
            read_status: false,
          };
          console.log(newClickedBook);
          $.ajax("api/books", {
            type: "POST",
            data: newClickedBook,
          }).then(function () {
            location.reload();
          });
        });
      });
    });

    $("#searchRes").empty();
  });

  // Hide the sections on page load
  $("#searchRes").hide();
  $("#closeSearch").hide();

  $("#closeSearch").on("click", function () {
    $("#searchRes").hide();
    $("#closeSearch").hide();
  });

  $(".read-me").on("click", (event2) => {
    console.log("click");
    let id = $(this).context.activeElement.dataset.id;
    let newReadState = {
      read_status: true,
    };

    $.ajax(`api/books/${id}`, {
      type: "PUT",
      data: newReadState,
    }).then(function () {});
    location.reload();
  });

  $(".delete-book").on("click", (event3) => {
    let id = $(this).context.activeElement.dataset.id;
    console.log(id);
    $.ajax(`api/books/${id}`, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });

  //Hide the chat page on page load
  $(".chat-page").hide();

  // Enter a username and when click, show the chat page and hide the login page
  $(".submit").on("click", function (event) {
    const name = $(".username").val();
    $(".login-page").hide();
    $(".chat-page").show();
    userConnected("You have joined");
    socket.emit("new-user", name);

    // Show user connected to chat
    socket.on("user-connected", (name) => {
      userConnected(`${name} connected`);
    });
  });
  // on enter key
  $(".username").keypress(function (e) {
    if (e.which == 13) {
      $(".submit").click();
    }
  });

  // When a user sends a message, display the name of the user and the message
  socket.on("chat-message", (data) => {
    messagedReceived(`${data.name}: ${data.message}`);
  });

  // When a user disconnects, display the name of the user that disconnected
  socket.on("user-disconnected", (name) => {
    userDisconnected(`${name} disconnected`);
  });

  // Send a message to the chat area
  messageForm.addEventListener("submit", (error) => {
    error.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  });

  // Append the message that is sent
  function appendMessage(message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("newMessage");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  // Append the message for the user that disconnected
  function userDisconnected(message) {
    let disconnectMessage = document.createElement("div");
    disconnectMessage.classList.add("user-disconnected", "text-center");
    disconnectMessage.innerText = message;
    messageContainer.append(disconnectMessage);
    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  // Append the message of the message received in the chat area
  function messagedReceived(message) {
    let receivedMessage = document.createElement("div");
    receivedMessage.classList.add("received-message");
    receivedMessage.innerText = message;
    messageContainer.append(receivedMessage);
    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  // Append the message of a user who has connected to the chat
  function userConnected(message) {
    let connectMessage = document.createElement("div");
    connectMessage.classList.add("user-connected", "text-center");
    connectMessage.innerText = message;
    messageContainer.append(connectMessage);
    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }
});
