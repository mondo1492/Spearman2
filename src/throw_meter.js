class ThrowMeter {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.pos = [];
  }

  move() {

  }

  draw(ctx) {
    var canvas = document.getElementById("canvas");
    // let ctx = canvas.getContext("2d");
    let width = document.body.clientWidth;
    console.log("TOTAL WIDTH", width);
    console.log("TOTAL X", this.x);
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(this.x - (10 +(width -750)/2), this.y - 75, 20, 0, Math.PI * 2, true);
      ctx.fill();

      // arms
      // ctx.beginPath();
      // ctx.strokeStyle = "black"; // blue
      // ctx.moveTo(scale * x, scale *(y+30));
      // ctx.lineTo(scale * (x-50), scale * (y+80));
      // ctx.moveTo(scale * x, scale * (y+30));
      // ctx.lineTo(scale * (x+50), scale * (y+80));
      // ctx.stroke();

  }
  isCollidedWith(otherObject) {
  }
}
module.exports = ThrowMeter;
