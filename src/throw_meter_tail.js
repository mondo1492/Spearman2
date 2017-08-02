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
      ctx.beginPath();
      ctx.strokeStyle = "black"; // blue
      ctx.moveTo(this.x - 10, this.y - 65);
      ctx.lineTo((this.x2-10), (this.y2-65));
      // ctx.moveTo(this.x2, (this.y2+30));
      // ctx.lineTo((this.x2+50), (this.y2+80));
      ctx.stroke();

  }
  isCollidedWith(otherObject) {
  }
}
module.exports = ThrowMeterTail;
