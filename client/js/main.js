var socket = io.connect("192.168.8.105:3000");

window.onload = function() {
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var tracker = new tracking.ColorTracker(['cyan']);
    tracker.setMinDimension(5);

	tracking.track('#video', tracker, { camera: true });

	tracker.on('track', function(event) {
		event.data.forEach(function(rect) {
			if (rect.color === 'custom') {
       			rect.color = tracker.customColor;
    		}
			var data = {
				x:rect.x,
				y:rect.y,
				width:rect.width,
				height:rect.height
			}
			socket.emit("data",data)
		});
	});
};