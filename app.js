var express= require('express');
var app = express();
var cors = require('cors');
var path = require("path");
var config = require("./data/config.json");
<<<<<<< HEAD
=======
var readline = require("readline");
>>>>>>> Massey

var url;

app.use(cors());

app.use(function(request, response, next){
  console.log(`${request.method} request for ${request.url}`);
  next();
})

app.use(express.static("./public"));

// Linking up config
app.use('/data', express.static(path.join(__dirname, 'data')));

// jquery
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// bootstrap js and css
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

// Posting to Blogger
// app.post("/sendTitle=:title", function(request, response){
// 	var title = request.params.title;
// 	console.log(title);
// });

// app.post("/sendMessage=:message", function(request, response){
// 	var message = request.params.message;
// 	console.log(message);
// });

app.post("/sendTitle=:title/sendMessage=:message", function(request, response){
	var title = request.params.title;
	var message = request.params.message;

});

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var token;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var oauth2Client = new OAuth2(
 config.clientId,
 config.clientSecret,
 "http://localhost:3000"
);

function getAccessToken (oauth2Client, callback) {
 // generate consent page url
 url = oauth2Client.generateAuthUrl({
   access_type: 'online', // will return a refresh token
   scope: 'https://www.googleapis.com/auth/blogger' // can be a space-delimited string or an array of scopes
 });

 console.log('Visit the url: ', url);
 rl.question('Enter the code here:', function (code) {
 	// request access token

   oauth2Client.getToken(code, function (err, tokens) {
   	if (err) {
       return callback(err);
     }
     // set tokens to the client
     // TODO: tokens should be set by OAuth2 client.
     oauth2Client.setCredentials(tokens);
     console.log(tokens);
     callback();
   });
 });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
	console.log(oauth2Client);

	// retrieve user profile
	plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
		if (err) {
			return console.log('An error occured', err);
		}

		console.log(profile.displayName, ':', profile.tagline);
	});
});

app.listen(3000);

console.log(config.apiKey);

console.log("server running on port 3000");
