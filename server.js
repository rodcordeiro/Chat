const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'public')));

app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',(req, res)=>{
  res.render('index.html', {port:10})
})


let messages = [];
let users = [];

io.on('connection', socket => {
  console.log(`${socket.id}`)

  socket.emit('previowsMessages',messages);

  socket.on("sendMessage",data=>{
    messages.push(data);
    socket.broadcast.emit("receivedMessage",data);
  })

})

server.listen(port);
