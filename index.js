var express = require('express');
var app = express();
app.use('/js', express.static(__dirname + '/js'));
app.use('/inc', express.static(__dirname + '/inc'));
app.use('/soundfont', express.static(__dirname + '/soundfont'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// note conversions
keyToNote = {}; // C8  == 108
noteToKey = {}; // 108 ==  C8
(function () {
	var A0 = 0x15; // first note
	var C8 = 0x6C; // last note
	var number2key = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
	for (var n = A0; n <= C8; n++) {
		var octave = (n - 12) / 12 >> 0;
		var name = number2key[n % 12] + octave;
		keyToNote[name] = n;
		noteToKey[n] = name;
	}
})();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = [];
var testMessage = [
{
	"note": keyToNote.E5,
	"delay": 470,
	"timeout": 500,
	"velocity": 127
},
{
	"note": keyToNote.G5,
	"delay": 350,
	"timeout": 380,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 120,
	"timeout": 150,
	"velocity": 127
},
{
	"note": keyToNote.A5,
	"delay" : 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.D5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 470,
	"timeout": 500,
	"velocity": 127
},
{
	"note": keyToNote.B5,
	"delay": 350,
	"timeout": 380,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 120,
	"timeout": 150,
	"velocity": 127
},
{
	"note": keyToNote.C6,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.B5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.G5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.B5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E6,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 120,
	"timeout": 150,
	"velocity": 127
},
{
	"note": keyToNote.D5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.D5,
	"delay": 120,
	"timeout": 150,
	"velocity": 127
},
{
	"note": keyToNote.B4,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.Gb5,
	"delay": 240,
	"timeout": 270,
	"velocity": 127
},
{
	"note": keyToNote.D5,
	"delay": 120,
	"timeout": 150,
	"velocity": 127
},
{
	"note": keyToNote.E5,
	"delay": 470,
	"timeout": 500,
	"velocity": 127
}
];

var testMessage2 = [
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.D4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.D4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.D4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 500,
	"timeout": 1000,
	"velocity": 127
},
//2eme partie
{
	"note": keyToNote.D4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.F4,
	"delay": 250,
	"timeout": 300,
	"velocity": 127
},
{
	"note": keyToNote.A4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.G4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.F4,
	"delay": 250,
	"timeout": 300,
	"velocity": 127
},
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.D4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.B3,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 250,
	"timeout": 350,
	"velocity": 127
},
{
	"note": keyToNote.D4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.E4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.C4,
	"delay": 500,
	"timeout": 600,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 500,
	"timeout": 1000,
	"velocity": 127
},
{
	"note": keyToNote.A3,
	"delay": 500,
	"timeout": 500,
	"velocity": 127
},
];


var currentlyPlaying = false;

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});


app.get('/maestro', function(req, res){
	res.sendfile(__dirname + '/public/maestro.html');
});

io.on('connection', function(socket){
	// append a client to the queue
	clients.push(socket.id);
	console.log(clients.length);
	socket.on('chat message', function(msg){
		if (msg != "") {
			//io.emit('chat message', msg);
			// test to receive only the messages that the client send himself
			//io.sockets.connected[socket.id].emit('chat message', msg);
		}
	});
	socket.on('play', function(tempo) {
		if (currentlyPlaying) { return; }
		currentlyPlaying = true;
		var tmpMessages = testMessage2.slice(0); // copying by value
		var tmpClients = clients.slice(0);
		// now should remove the maestro from the list somehow to not let it play zik
		tmpClients = tmpClients.filter(
				function(c) {
					if (c == socket.id) {
						return false;
					}
					else {
						return true;
					}
				},
				tmpClients
		);
		var clientIndex = 0;
		if (tmpClients.length == 0) {
			return;
		}
		function burstMessages() {
			if (tmpMessages.length == 0) {
				clearInterval(i);
				currentlyPlaying = false;
				return;
			}
			var newMsg = tmpMessages.shift();
			clientIndex %= tmpClients.length;
			io.sockets.connected[
				tmpClients[clientIndex]
			].emit(
				'chat message', 
				newMsg
			);
			clientIndex++;
			clearInterval(i);
			i = setInterval( function() {
				burstMessages();
			}, newMsg.timeout/tempo);
		}
		var i = setInterval( function() {
			burstMessages();
		}, 1000);
	});
	socket.on('disconnect', function() {
		// remove the current client from the queue
		clients = clients.filter(
				function(c) {
					if (c == socket.id) {
						return false;
					}
					else {
						return true;
					}
				},
				clients
		);
		console.log(clients.length);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
