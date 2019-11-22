import app from './app';

// Create a Server
var server = app.listen(3333, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
