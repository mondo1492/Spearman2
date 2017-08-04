class ThrowMeterTail {
  constructor(game, x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.pos = [];
  }

  move() {

  }

  draw(ctx) {
    var canvas = document.getElementById("canvas");
    // let ctx = canvas.getContext("2d");
    let width = document.body.clientWidth;
      ctx.beginPath();
      ctx.strokeStyle = "black"; // blue
      let adjust = (10 +(width -750)/2);
      ctx.moveTo(this.x - adjust, this.y - 75);
      ctx.lineTo((this.x2 - adjust), (this.y2-75));
      // ctx.moveTo(this.x2, (this.y2+30));
      // ctx.lineTo((this.x2+50), (this.y2+80));
      ctx.stroke();

  }
  isCollidedWith(otherObject) {
  }
}
module.exports = ThrowMeterTail;
