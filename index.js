var express = require('express');
var app = express();
var url = require('url');

app.set('port', (process.env.PORT || 5454));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getInputs', function(request, response) {
  getPackage(request, response);
});

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/package.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getPackage(request, response){
  var requestUrl = url.parse(request.url, true);

  console.log("Query parameters: " + JSON.stringify(requestUrl.query));

  var type = requestUrl.query.type;
  var weight = Number(requestUrl.query.weight);

  calculateRate(response, type, weight);
}

function calculateRate(response, type, weight){

  var result = 0;

  if (type == "letterS") {
    if(weight <= 1){
      result = "0.49";
    }else if(weight <= 2){
      result = "0.70";
    }else if(weight <= 3){
      result = "0.91";
    }else{
      result = "1.12";
    }
  }

  else if (type == "letterM") {
    if(weight <= 1){
      result = "0.46";
    }else if(weight <= 2){
      result = "0.67";
    }else if(weight <= 3){
      result = "0.88";
    }else{
      result = "1.09";
    }
  }

  else if (type == "largeEnv") {
    if(weight <= 1){
      result = "0.98";
    }else if(weight <= 2){
      result = "1.19";
    }else if(weight <= 3){
      result = "1.40";
    }else if(weight <= 4){
      result = "1.61";
    }else if(weight <= 5){
      result = "1.82";
    }else if(weight <= 6){
      result = "2.03";
    }else if(weight <= 7){
      result = "2.24";
    }else if(weight <= 8){
      result = "2.45";
    }else if(weight <= 9){
      result = "2.66";
    }else if(weight <= 10){
      result = "2.87";
    }else if(weight <= 11){
      result = "3.08";
    }else if(weight <= 12){
      result = "3.29";
    }else{
      result = "3.50";
    }
  }

  else if (type == "parcel"){
    if(weight <= 4){
      result = "2.67";
    }else if(weight <= 5){
      result = "2.85";
    }else if(weight <= 6){
      result = "3.03";
    }else if(weight <= 7){
      result = "3.21";
    }else if(weight <= 8){
      result = "3.39";
    }else if(weight <= 9){
      result = "3.57";
    }else if(weight <= 10){
      result = "3.75";
    }else if(weight <= 11){
      result = "3.93";
    }else if(weight <= 12){
      result = "4.11";
    }else{
      result = "4.49";
    }
  }

  else if (type == "postcard"){
    result = "0.34";
  }

  else {
    result = "$!@#@#%$#^%$@#$#!@";
  }

  if(type == "letterS"){
    type = "Letter (stamped)";
  }else if(type == "letterM"){
    type = "Letter (metered)";
  }else if(type == "largeEnv"){
    type = "Large Envelope";
  }else if(type == "parcel"){
    type = "Parcel";
  }else if(type == "postcard"){
    type = "Postcard";
  }else{
    type = "$!@#@#%$#^%$@#$#!@";
  }

  var params = {type: type, weight: weight, result: result};

  response.render('pages/result', params);
}

























//
