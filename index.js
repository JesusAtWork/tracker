var jf = require("johnny-five");
var express = require("express");
var app = express();


var server = app.listen(3000);

console.log("This server is running on port 3000")

var ledState;

board = new jf.Board();

board.on("ready", function() {
	if (ledState == true) {
		var LedRed = jf.Led(13);	
	}
});	


app.use(express.static("client"));

var socket = require("socket.io");
var io = socket(server);

io.sockets.on("connection",function(socket) {
	address =  socket.handshake.address
	var ip = address.substr(7)

	console.log("User: "+ip);

	socket.on("data",function(data) {
		console.log("X: "+data.x);
		console.log("Y: "+data.y);
		console.log("Width: "+data.width);
		console.log("Height: "+data.height);
		console.log("-------------------")
		ledState = true;
	})
});