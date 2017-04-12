const http = require('http');
const PORT = 8080;

const requestHandler = function(request, response){
  if(request.url == "/"){
    response.end(`Requested url = ${request.url} and requested method = ${request.method}`); 
  }else if( request.url == "/urls"){
    response.end("www.lighthouselabs.ca\nwww.google.com");
  }else{
    response.statusCode = 404;
    response.end("Unknown request");
  }
}

const server = http.createServer(requestHandler);
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});