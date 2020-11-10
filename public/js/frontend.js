$(document).ready(function () {
  



  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
  var socket = io(); // For Production
  // var socket = io('http://localhost:8080/') // For Testing LocalHost Server
  const messageContainer = document.getElementById("message-container")

  const messageForm = document.getElementById("send-container");
  const messageInput = document.getElementById("message-input");

  $("#bookSearch").on("click", function (event) {
    $("#searchRes").show();
    $(".btn-danger").show()
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
        searchedBook = $("<div>").addClass("card book-searched")

        title = $("<h5>").text(element.volumeInfo.title).addClass("display")
        authors = $("<p>").text(element.volumeInfo.authors[0]).addClass("display")

        coverPic = $("<img>").attr("src", element.volumeInfo.imageLinks.smallThumbnail)
        coverPic.attr("class", "coverPic card-img-top")
        searchedBook.append(coverPic)
        cardBody = $("<div>").addClass("overlay")
        searchedBook.append(cardBody)
        cardBody.append(title)
        cardBody.append(authors)

        $("#searchRes").append(searchedBook)

        $(searchedBook).on("click", (event) => {
          let newClickedBook = {
            book_title: event.currentTarget.children[1].children[0].innerText,
            author_name: event.currentTarget.children[1].children[1].innerText,
            book_cover: event.currentTarget.children[0].src,
            read_status: false
          }
          console.log(newClickedBook)
          $.ajax("api/books", {
            type: "POST",
            data: newClickedBook
          }).then(function () {
            // location.reload();
          })
        })
      });
    });

    $("#searchRes").empty();
  })

  $("#searchRes").hide();
  $(".btn-danger").hide()

  $(".btn-danger").on("click", function () {
    $("#searchRes").hide();
    $(".btn-danger").hide();
  })

  $(".read-me").on("click", (event2) => {
    console.log("click")
    let id = $(this).context.activeElement.dataset.id
    let newReadState = {
      read_status: true
    };

    $.ajax(`api/books/${id}`, {
      type: "PUT",
      data: newReadState
    }).then(function () {
    })
    location.reload()
  })

  $(".delete-book").on("click", (event3) => {
    let id = $(this).context.activeElement.dataset.id
    console.log(id)
    $.ajax(`api/books/${id}`, {
      type: "DELETE"
    }).then(function () {
      location.reload()
    })
  })

  $(".chat-page").hide();


  $(".submit").on("click", function (event) {
    const name = $(".username").val();
    $(".login-page").hide();
    $(".chat-page").show();
    userConnected("You have joined");
    socket.emit("new-user", name);

    socket.on("user-connected", name => {
      userConnected(`${name} connected`);
    });
  });
  $(".username").keypress(function (e) {
    if (e.which == 13) {
      $(".submit").click()
    }
  })

  socket.on("chat-message", data => {
    messagedReceived(`${data.name}: ${data.message}`);
  });

  socket.on("user-disconnected", name => {
    userDisconnected(`${name} disconnected`);
  });

  messageForm.addEventListener("submit", error => {
    error.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", message);
    messageInput.value = "";
  });

  function appendMessage(message) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("newMessage");

    messageElement.innerText = message;

    messageContainer.append(messageElement);

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  function userDisconnected(message) {
    let disconnectMessage = document.createElement("div");
    disconnectMessage.classList.add("user-disconnected", "text-center")

    disconnectMessage.innerText = message

    messageContainer.append(disconnectMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  function messagedReceived(message) {
    let receivedMessage = document.createElement("div");
    receivedMessage.classList.add("received-message")

    receivedMessage.innerText = message

    messageContainer.append(receivedMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  function userConnected(message) {
    let connectMessage = document.createElement("div");
    connectMessage.classList.add("user-connected", "text-center")

    connectMessage.innerText = message

    messageContainer.append(connectMessage)

    var objDiv = document.getElementById("message-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }



})