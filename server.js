const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})



http.listen(process.env.PORT || 4000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 4000))
});

io.on('connection', (socket) => {
    console.log('connected...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })

})

