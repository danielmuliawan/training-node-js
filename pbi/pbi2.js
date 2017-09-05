var https = require("https");

module.exports = {
  requestData:function(returnData,query){
    var options = {
        hostname: query.hostname,
        path: query.path
      };

      var request = https.request(options, function(response) {

        var responseBody = "";
        response.setEncoding("UTF-8");

        response.on("data", function(chunk) {
          responseBody += chunk;
        });

        response.on("end", function() {
          returnData(responseBody);
        });

      });

      request.on("error", function(err) {
        console.log(`problem with request: ${err.message}`);
      });

      request.end();
  }
}