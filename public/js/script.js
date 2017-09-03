var key;
var blogId = "4165291039125780596";
var keyList = [];

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
    })

    // getStuff();


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

      // console.log(DataFromBlog);


    },
    error: function() {
      console.log("Something went wrong");
    }
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
  });
};

 gapi.load("client", start);