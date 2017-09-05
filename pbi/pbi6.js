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
      var sql='select id_user,name,email,username,active from tb_user where deleted=0';
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
          sql+=' and '+where.slice(0,where.length-5);
      }

      var order='';
      query.order.forEach(function(item){
        orderBy = query.columns[item.column].data;
				orderType =item.dir;
				order+=orderBy+' '+orderType+', ';
      });
      sql+=' order by '+order.slice(0,order.length-2);
      request = new Request(sql, function(err, rowCount, rows) {
        if (err) {
          throw err;
        } else {
          var data=[];
          rows=rows.slice(query.start,parseInt(query.start)+parseInt(query.length));
          rows.forEach(function(column,index){
            var items={};
            column.forEach(function(item){
              if(item.metadata.colName=='active')
              {
                if(item.value=='1')
                  item.value='Active';
                else
                  item.value="Not Active";
              }
              items[item.metadata.colName]=item.value;
            });
            data.push(items);
          });
          returnData({data:data,rowCount:rowCount});
        }
      });

      connection.execSql(request);
    });
  },
  deleteData:function(returnData,query){
    var Connection = require('tedious').Connection;

    var config = {
      userName: 'bima',
      password: 'g0agajaH',
      server: 'jptrainingsql',
      database: 'TAS_Bima',
    };

    var connection = new Connection(config);
    var Request = require('tedious').Request;
    connection.on('connect', function(err) {
      var sql='update tb_user set deleted=1 where id_user='+query.id;
      
      request = new Request(sql, function(err) {
        if (err)
          returnData({status:false,message:err});
        else
          returnData({status:true,message:"Data deleted successfully!"});
      });

      connection.execSql(request);
    });
  },
  insertData:function(returnData,query){
    var Connection = require('tedious').Connection;

    var config = {
      userName: 'bima',
      password: 'g0agajaH',
      server: 'jptrainingsql',
      database: 'TAS_Bima',
    };

    var connection = new Connection(config);
    var Request = require('tedious').Request;
    connection.on('connect', function(err) {
      var sql="insert into tb_user (name,email,username,active) values ('"+query.name+"','"+query.email+"','"+query.username+"','"+query.active+"')";
      
      request = new Request(sql, function(err) {
        if (err)
          returnData({status:false,message:err});
        else
          returnData({status:true,message:"Data added successfully!"});
      });

      connection.execSql(request);
    });
  },
  countData:function(returnData){
    var Connection = require('tedious').Connection;

    var config = {
      userName: 'bima',
      password: 'g0agajaH',
      server: 'jptrainingsql',
      database: 'TAS_Bima'
    };

    var connection = new Connection(config);
    var Request = require('tedious').Request;
    connection.on('connect', function(err) {
      var sql='select id_user from tb_user';
      request = new Request(sql, function(err, rowCount, rows) {
        if (err) {
          throw err;
        } else {
          returnData(rowCount);
        }
      });

      connection.execSql(request);
    });
  }
}