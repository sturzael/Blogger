var key,
    blogId,
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
    success: function(DataFromJson){

      keyList.push({
        apiKey: DataFromJson.apiKey,
        blogId:DataFromJson.blogId,
        clientId: DataFromJson.clientId,
        clientSecret: DataFromJson.clientSecret
      });

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