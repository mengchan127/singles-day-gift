var Flame = function () {
	this.ox; // 烟花爆破位置
	this.oy;
	this.bx = [];
	this.by = [];
	this.len = [];
	this.color = [];

	this.alpha;
	this.flag;
	this.timer;
};
Flame.prototype.num = 50;
Flame.prototype.init = function (obj) {
	this.ox = obj.x;
	this.oy = obj.y;
	this.alpha = 0.3;
	for (var i = 0; i < this.num; i++) {
		this.bx[i] = Math.random() * 150 - 75 + obj.x;
		this.by[i] = Math.random() * 150 - 75 + obj.y;
		this.len[i] = Math.random() * 20 + 15;
		this.color[i] = 'rgba(253,248,153,' + this.alpha + ')';
	}
	this.flag = false;
	this.timer = 0;
}
Flame.prototype.draw = function () {
	if (!this.flag) {
		this.alpha += deltaTime * 0.001;
		if (this.alpha > 1) {
			this.alpha = 1;
			this.timer += deltaTime;
			this.flag = this.timer > 1000 ? true : false;
		}
	}
	else {
		this.alpha -= deltaTime * 0.003;
	}
	this.alpha = this.alpha < 0 ? 0 : this.alpha;

	for (var i = 0; i < this.num; i++) {
		this.color[i] = 'rgba(255,199,3,' + this.alpha + ')';
		var end = endPos(this.ox, this.oy, this.bx[i], this.by[i], this.len[i]);
		ctx.strokeStyle = this.color[i];
		ctx.beginPath();
		ctx.moveTo(this.bx[i], this.by[i]);
		ctx.lineTo(end.ex, end.ey);
		ctx.closePath();
		ctx.stroke();
	}
}


function endPos (ox, oy, bx, by, len) {
	var deltay = by - oy;
	var deltax = bx - ox;
	var angle = Math.atan2(deltay, deltax);
	var ex = len * Math.cos(angle) + bx;
	var ey = len * Math.sin(angle) + by;

	return {ex: ex, ey:ey};
}