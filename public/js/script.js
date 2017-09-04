var key,
    blogId = "4165291039125780596",
    keyList = []
    discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"],
    scopes = "profile";

$.ajax({
  url: "data/config.json",
  dataType: "json",
  beforeSend: function(xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("application/json");
    }

  },
    success: function(DataFromJson) {

    keyList.push({
      apiKey: DataFromJson.apiKey,
      clientId: DataFromJson.clientId,
      clientSecret: DataFromJson.clientSecret
    });

    key = keyList[0].apiKey;

    getAllBlog();

  },
  error: function() {
    console.log("Something Went Wrong");

  }

});

function getAllBlog() {
  $.ajax({
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"?key=" + key,
    dataType: "jsonp",
    success: function(DataFromBlog) {

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

        $('.posts').append("<div class='post'><h1 class='h1title'>"+DataFromBlog.items[i].title+"</h1><p class='author'>"+DataFromBlog.items[i].author.displayName+"</p><p class='date'>"+new Date(DataFromBlog.items[i].published)+"</p><p class='content'>"+DataFromBlog.items[i].content+"</p></div>")

      }



    },
    error: function() {
      console.log("Something went wrong");
    }
  });

}

// function createPost(){
//   $.ajax({
//     url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts/",
//     Authorization:
//     dataType: "jsonp",
//     success: function(DataFromBlog) {
//
//       console.log(DataFromBlog);
//
//
//     },
//     error: function() {
//       console.log("Something went wrong");
//     }
//   });
//
//
//
// }


// Getting Authentication for Google Blogger
function handleClientLoad(){
  gapi.load("clientauth2", initClient);
}

function initClient(){
  gapi.client.init({
    apiKey: keyList.apiKey,
    discoveryDocs: discoveryDocs,
    clientId: keyList.clientId,
    scope: scopes
  }).then(function(){
    
  })
}