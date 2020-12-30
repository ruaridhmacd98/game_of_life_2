var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('hi', (msg) =>{
  	console.log(msg.say);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});


http.listen(8080, () => {
  console.log('listening on *:8080');
});
