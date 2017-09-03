var express= require('express');
var app = express();
var cors = require('cors');
var path = require("path");





app.use(cors());

app.use(function(request, response, next){
  console.log(`${request.method} request for ${request.url}`);
  next();
})

app.use(express.static("./public"));
// Linking up config 
app.use('/data', express.static(path.join(__dirname, 'data')));



app.listen(3000);

console.log("server running on port 3000");
