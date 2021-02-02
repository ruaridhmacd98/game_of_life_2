var app = require('express')();
var cors = require('cors');
var http = require('http').createServer(app);
const io = require('socket.io')(http, {
	  cors: {
		      origin: '*',
		    }
});

app.use(cors())

app.options('*', cors())

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
