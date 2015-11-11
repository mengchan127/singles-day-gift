window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

var can = document.getElementById('can');
var ctx = can.getContext('2d');
ctx.lineWidth = 3;

var canW = can.width;
var canH = can.height;

var deltaTime;
var lastTime;

var fireworks = [];

function init () {
	lastTime = Date.now();
	deltaTime = 0;

	for (var i = 0; i < 3; i++) {
		fireworks[i] = new Firework();
		fireworks[i].init({width: canW, height:canH, color: 'yellow'});
	}
	setTimeout(bornFire, 3000);
}
function gameloop () {
	window.requestAnimFrame(gameloop);

	var now = Date.now();
	deltaTime = now - lastTime;
	deltaTime = deltaTime > 40 ? 40 : deltaTime;
	lastTime = now;

	ctx.clearRect(0, 0, canW, canH);
	// draw
	for (var i = 0; i < fireworks.length; i++) {
		fireworks[i].draw();
	}
}

function bornFire() {
	var tmp = new Firework();
	tmp.init({width: canW, height:canH, color: 'yellow'});
	fireworks.push(tmp);

	setTimeout(bornFire, 2000);
}

!function() {
	init();
	gameloop();
}();

