// Show loading notice
var canvas = document.getElementById('videoCanvas');
var ctx = canvas.getContext('2d');
ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);

// Setup the WebSocket connection and start the player
var client = new WebSocket(`ws://${'192.168.31.126'}:${3001}/`);
var player = new jsmpeg(client, {canvas:canvas});
