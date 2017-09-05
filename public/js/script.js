<<<<<<< HEAD
var key;
var blogId = "4165291039125780596";
var keyList = [];
=======
var key,
    blogId,
    keyList = []
    discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"],
    scopes = "profile";
>>>>>>> Massey

$.ajax({
  url: "data/config.json",
  dataType: "json",
  beforeSend: function(xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("application/json");
    }

  },
    success: function(DataFromJson){

<<<<<<< HEAD
    keyList.push({
      apiKey: DataFromJson.apiKey,
      clientId: DataFromJson.clientId,
      clientSecret: DataFromJson.clientSecret
    })

    // getStuff();
=======
      keyList.push({
        apiKey: DataFromJson.apiKey,
        blogId:DataFromJson.blogId,
        clientId: DataFromJson.clientId,
        clientSecret: DataFromJson.clientSecret
      });
>>>>>>> Massey

      key = keyList[0].apiKey;
      blogId = keyList[0].blogId;

      getStuff();
  },
  error: function() {
    console.log("Something Went Wrong");

  }

});

function getStuff() {
  $.ajax({
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"?key=" + key,
    dataType: "jsonp",
    success: function(DataFromBlog) {
<<<<<<< HEAD

      // console.log(DataFromBlog);
=======
      console.log(DataFromBlog);
      $('.blogName').append(DataFromBlog.name);
      $('.blogUrl').append(DataFromBlog.url)

      getPosts()
    },
    error: function() {
      console.log("Something went wrong");
    }
  });

}

function getPosts(){

  $.ajax({
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts?key=" + key,
    dataType: "jsonp",
    success: function(DataFromBlog) {

      console.log(DataFromBlog);
      for (var i = 0; i < DataFromBlog.items.length; i++) {
>>>>>>> Massey

        $('.posts').append("<div class='post'><h1 class='h1title'>"+DataFromBlog.items[i].title+"</h1><p class='author'>"+DataFromBlog.items[i].author.displayName+"</p><p class='date'>"+new Date(DataFromBlog.items[i].published)+"</p><p class='content'>"+DataFromBlog.items[i].content+"</p></div>")

<<<<<<< HEAD
=======
      }

>>>>>>> Massey
    },
    error: function() {
      console.log("Something went wrong");
    }
<<<<<<< HEAD
  });

}

function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': keyList[0].apiKey,
    // clientId and scope are optional if auth is not required.
    'clientId': keyList[0].clientId,
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    })
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
=======
>>>>>>> Massey
  });
};

<<<<<<< HEAD
 gapi.load("client", start);
=======
}

<<<<<<< HEAD
// function createPost(){
//   $.ajax({
//     url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts/",
//     Authorization: "",
//     dataType: "jsonp",
//     success: function(DataFromBlog) {

//       console.log(DataFromBlog);


//     },
//     error: function() {
//       console.log("Something went wrong");
//     }
//   });



// }

// Getting Authentication for Google Blogger
// https://www.googleapis.com/auth/blogger
// var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
// var authorizeButton = document.getElementById('authorize-button');
// var signoutButton = document.getElementById('signout-button');

// // handleClientLoad();

// function handleClientLoad(){
//   // Loading the Google Client JavaScript Authentication Library
//   gapi.load('client:auth2', initClient);
// }

// function initClient(){
//   // Using the config keys to access the api
//   gapi.client.init({
//       apiKey: keyList[0].apiKey,
//       discoveryDocs: discoveryDocs,
//       clientId: keyList[0].clientId,
//       scope: scopes
//   }).then(function (){
//     // Checking whether user is signed in
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//     // Handling the existing sign-in state, in case user is already signed in.
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

//     // Click function for sign in/sign out buttons
//     authorizeButton.onclick = handleAuthClick;
//     signoutButton.onclick = handleSignoutClick;
//   });
// }

// function updateSigninStatus(isSignedIn){
//   // If user is signed in, show/hide authentication sign buttons
//   if (isSignedIn) {
//     // Hide sign in, show sign out.
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'block';
//     makeApiCall();
//   } else {
//     // Hide sign out, show sign in.
//     authorizeButton.style.display = 'block';
//     signoutButton.style.display = 'none';
//   }
// }

// // This is where authentication is called
// function handleAuthClick(event){
//   gapi.auth2.getAuthInstance().signIn();
// }

// // This is the sign out function
// function handleSignoutClick(event){
//   gapi.auth2.getAuthInstance().signOut();
// }

// // Load the API and make an API call.  Display the results on the screen.
// function makeApiCall(){
//   gapi.client.people.people.get({
//     'resourceName': 'people/me',
//     'requestMask.includeField': 'person.names'
//   }).then(function(resp) {
//     var p = document.createElement('p');
//     var name = resp.result.names[0].givenName;
//     p.appendChild(document.createTextNode('Hello, '+name+'!'));
//     document.getElementById('content').appendChild(p);
//     console.log(resp);
//   });
// }

// $("#postBlog").submit(function(event){

//   // Preventing Form Submission
//   event.preventDefault();

//   // Setting variables to retrieve information
//   var title = $("#postTitle").val();
//   var message = $("#postMessage").val();
//   var url = "http://localhost:3000";

//   url += "/sendTitle=" + title + "/sendMessage=" + message;

//   $.ajax({
//     url: url,
//     type: "post",
//     dataType: "json",
//     success:function(PostData){
//       console.log("Message: " + PostData + " was sent.");
//     }, error:function(){
//       console.log("url undefined");
//     }
//   });
// });

// function start() {
//   // 2. Initialize the JavaScript client library.
//   gapi.client.init({
//     'apiKey': keyList[0].apiKey,
//     // clientId and scope are optional if auth is not required.
//     'clientId': keyList[0].clientId,
//     'scope': 'profile',
//   }).then(function() {
//     // 3. Initialize and make the API request.
//     return gapi.client.request({
//       'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
//     })
//   }).then(function(response) {
//     console.log(response.result);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// };

//  gapi.load("client", start);
>>>>>>> Massey
=======
$("#postBlog").submit(function(event){
    event.preventDefault();

    var title = $("#postTitle").val();
    var message = $("#postMessage").val();
    var url = "http://localhost:3000";

    // Validation
    if( (title.length === 0) || (message.length === 0) ){
        alert("Please fill in both fields");
        return;
    } else {
        url += "/sendTitle=" + title + "/sendMessage=" + message;
    }

    $.ajax({
        url: url,
        dataType:"json",
        method:"post",
        success:function(DataPost){
            console.log(DataPost);
        }, error:function(){
            console.log("Error, server not responding.");
        }
    })

    console.log(title, message);
});
>>>>>>> Massey
