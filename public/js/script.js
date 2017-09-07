var APIKey;
$.ajax({
	url: "config/config.json",
	dataType:"json",
	success:function(data){
		APIKey = data.APIKey;
    blogId = data.project_id;
    clientId = data.ClientID;
    clientSecret = data.ClientSecret;
		getStuff();
	}
});


function getStuff() {
  $.ajax({
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"?key=" + APIKey,
    dataType: "jsonp",
    success: function(DataFromBlog) {

      console.log(DataFromBlog);

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
    url: "https://www.googleapis.com/blogger/v3/blogs/"+blogId+"/posts?key=" + APIKey,
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

$("#postForm").submit(function(event){

	event.preventDefault();
	console.log("form sent");
	var title = $("#title").val();
	var content = $("#content").val();
	var url = "http://localhost:3000/createGoogleBloggerPost";
	if(title.length == 0){
		alert("please enter a title");
		return;
	}
	if(content.length == 0){
		alert("please enter some content");
		return;
	}
	$.ajax({
		url: url,
		type: "post",
		data: { title: title, content : content},
		dataType:"json",
        success: function(result) {
   			console.log(result);
        	window.location = result;
        },
        error:function(error){
        	console.log(error);
        }
	})
});
