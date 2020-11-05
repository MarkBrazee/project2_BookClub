const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://google-books.p.rapidapi.com/volumes?key=AIzaSyAOsteuaW5ifVvA_RkLXh0mYs6GLAD6ykc",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "60118cac21msh5c72d309a34c8fcp166019jsnf08b029ca5e1",
		"x-rapidapi-host": "google-books.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});