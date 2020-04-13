var http = require('http');
var url = require("url");
var path = require('path');

// 用于请求的选项
var options = {
   host: 'localhost',
   port: '8070',
   path: '/microservice-provider-user/1'  
};
 


// 创建server
var server = http.createServer(function(req, res) {
  // 获得请求的路径
  var pathname = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type' : 'application/json; charset=utf-8' });
  // 访问http://localhost:8060/，将会返回{"index":"欢迎来到首页"}
  if (pathname === '/') {
    res.end(JSON.stringify({ "index" : "欢迎来到首页" }));
  }
  // 访问http://localhost:8060/health，将会返回{"status":"UP"}
  else if (pathname === '/health.json') {
    res.end(JSON.stringify({ "status" : "UP" }));
  }
  else if(pathname === '/user') {
	  
	  // 处理响应的回调函数
		var callback = function(response){
		   // 不断更新数据
		   var body = '';
		   response.on('data', function(data) {
			  body += data;
		   });
		   
		   response.on('end', function() {
			  // 数据接收完成
			  console.log(body);
		   });
		}
		// 向服务端发送请求
		var req = http.request(options, callback);
		req.end();
	  
  }
  // 其他情况返回404
  else {
    res.end("404");
  }
});
// 创建监听，并打印日志
server.listen(8060, function() {
  console.log('listening on localhost:8060');
});