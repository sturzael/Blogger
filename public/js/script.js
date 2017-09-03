var key;
var blogId = "4165291039125780596";

$.ajax({
  url: "data/config.json",
  dataType: "json",
  beforeSend: function(xhr) {
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("application/json");
    }

  },
    success: function(DataFromJson) {

    key = DataFromJson.key;
    console.log(key);

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


    },
    error: function() {
      console.log("Something went wrong");
    }
  });

}


function createPost(){
  $.ajax({
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts/",
    dataType: "jsonp",
    success: function(DataFromBlog) {

      console.log(DataFromBlog);


    },
    error: function() {
      console.log("Something went wrong");
    }
  });



}
