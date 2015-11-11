var Firework = function () {
  this.bx; // current point, initialized as begin point
	this.by;

	this.ex; // end point
	this.ey;

	this.color;
	this.r; // radius
	this.alive; 
	this.blasting;

	this.spd; // move distance per frame
	this.spdX; // x move distance per frame
	this.spdY;

	this.flame;
}
Firework.prototype.init = function (obj) {
	this.bx = Math.random() * obj.width * 0.5 + obj.width * 0.25; // [0.25*width, 0.75*width]
	this.by = obj.height - 20;

	this.ex = Math.random() * (obj.width - 200) + 100; // end point
	this.ey = Math.random()*(obj.height - 500) + 100;

	this.color = obj.color;
	this.r = 3;
	this.alive = true;
	this.blasting = false;

	this.spd = 15;

	var spdObj = computeSpd(this.bx, this.by, this.ex, this.ey, this.spd);
	this.spdX = spdObj.x;
	this.spdY = spdObj.y;
};
Firework.prototype.draw = function () {
	if (this.alive) {
		// 上升过程

		// this.spd = deltaTime*0.5;
		// var spdObj = computeSpd(this.bx, this.by, this.ex, this.ey, this.spd);
		// this.spdX = spdObj.x;
		// this.spdY = spdObj.y;

		this.bx += this.spdX;
		this.by += this.spdY;
		if (this.by < this.ey) {
			this.alive = false;
			this.blasting = true;
			this.flame = new Flame();
			this.flame.init({x:this.ex, y: this.ey});
		}
		// draw
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.bx, this.by, this.r, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
	if (this.blasting) {
		// 绽放过程
		this.flame.draw();
		if (this.flame.alpha == 0) {
			this.blasting = false;
		}
	}
};

function computeSpd (bx, by, ex, ey, spd) {
	var deltaX = ex - bx;
	var deltaY = ey - by;
	var angle = Math.atan2(deltaY, deltaX);

	var x = spd * Math.cos(angle);
	var y = spd * Math.sin(angle);

	return {x: x, y: y};
}