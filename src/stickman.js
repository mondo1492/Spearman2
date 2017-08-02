const Spear = require('./spear');

class Stickman {
  constructor(game, type) {

    this.game = game;
    this.type = type;
    if (this.type === "user") {
      this.pos = [150, 500];
    } else {
      this.pos = [850, 400];
    }

  }

  move() {

  }

  draw(ctx, x, y, scale) {
    x = this.pos[0];
    y = this.pos[1];
    scale = 0.5;
    var canvas = document.getElementById("canvas");
    // let ctx = canvas.getContext("2d");
      ctx.beginPath();
      if (this.type === "user") {
        ctx.fillStyle = "bisque";
      } else {
        ctx.fillStyle = "red";
      }
       // #ffe4c4
      ctx.arc(scale * x, scale * y, scale * 30, 0, Math.PI * 2, true); // draw circle for head
      // (x,y) center, radius, start angle, end angle, anticlockwise
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "black"; // color
      ctx.lineWidth = 3;
      ctx.arc(scale * x, scale * y, scale * 20, 0, Math.PI, false); // draw semicircle for smiling
      ctx.stroke();

      // eyes
      ctx.beginPath();
      ctx.fillStyle = "black"; // color
      ctx.arc(scale * (x-10), scale * (y-5), scale * 3, 0, Math.PI * 2, true); // draw left eye
      ctx.fill();
      ctx.arc(scale * (x+10), scale *(y-5), scale * 3, 0, Math.PI * 2, true); // draw right eye
      ctx.fill();

      // body
      ctx.beginPath();
      ctx.moveTo(scale * x, scale * (y+30));
      ctx.lineTo(scale * x, scale * (y+130));
      ctx.strokeStyle = "black";
      ctx.stroke();

      // arms
      ctx.beginPath();
      ctx.strokeStyle = "black"; // blue
      ctx.moveTo(scale * x, scale *(y+30));
      ctx.lineTo(scale * (x-50), scale * (y+80));
      ctx.moveTo(scale * x, scale * (y+30));
      ctx.lineTo(scale * (x+50), scale * (y+80));
      ctx.stroke();

      // legs
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(scale * x, scale * (y+130));
      ctx.lineTo(scale * (x-50), scale * (y+230));
      ctx.moveTo(scale * x, scale * (y+130));
      ctx.lineTo(scale * (x+50), scale * (y+230));
      ctx.stroke();


      //platform
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(scale * (x + 70), scale * (y+230));
      ctx.lineTo(scale * (x-70), scale * (y+230));
      ctx.lineWidth=10;
      ctx.stroke();
    }
    shootSpear(theta) {
      // const spear = ;
      this.game.add(new Spear(this.game, theta));

    }
    isCollidedWith(otherObject) {
    }
  }



module.exports = Stickman;
