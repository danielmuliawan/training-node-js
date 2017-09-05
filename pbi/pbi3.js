module.exports = {
  getData:function(returnData,query){
    var Connection = require('tedious').Connection;

    var config = {
      userName: 'bima',
      password: 'g0agajaH',
      server: 'jptrainingsql',
      database: 'TAS_Bima',
      options: {rowCollectionOnRequestCompletion:true}
    };

    var connection = new Connection(config);
    var Request = require('tedious').Request;
    connection.on('connect', function(err) {
      var sql='select id_user,name,email,username,active from tb_user';
      if(query.filter=='true')
      {
        var search=false;
        var where='';
        Object.keys(query.form_filter).forEach(function(kolom) {
            if(query.form_filter[kolom])
            {
              where+=kolom+" like '%"+query.form_filter[kolom]+"%' and ";
              search=true;
            }
        });
        if(search==true)
          sql+=' where '+where.slice(0,where.length-5);
      }
      request = new Request(sql, function(err, rowCount, rows) {
        if (err) {
          throw err;
        } else {
          var data=[];
          rows.forEach(function(column,index){
            var items=[];
            column.forEach(function(item){
              if(item.metadata.colName=='active')
              {
                if(item.value=='1')
                  item.value='Active';
                else
                  item.value="Not Active";
              }             
              items.push(item.value);
            });
            data.push(items);
          });
          returnData({"data":data});
        }
      });

      connection.execSql(request);
    });
  }
}