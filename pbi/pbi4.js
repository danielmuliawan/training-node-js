module.exports = {
  processData:function(returnData,req){
      var qs = require("querystring");
      var body='';
      req.on("data", function(chunk) {
        body += chunk;
      });

      req.on('end', function () {
          query=qs.parse(body);
          returnData(query);
      });
  }
}