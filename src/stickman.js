const Spear = require('./spear');

class Stickman {
  constructor(game, type) {

    this.game = game;
    this.type = type;
    if (this.type === "user") {
      this.pos = [150/2, 500/2];
    } else {
      //fix these so guy doesn't go off screen
      const x = Math.random() * 300 + 300;
      const y = (Math.random() * 800 + 300)/2;
      this.pos = [x, y];
    }
    this.radius = 25;
  }

  move() {

  }

  draw(ctx, x, y, scale) {
    x = this.pos[0];
    y = this.pos[1];
    scale = 1;
    var canvas = document.getElementById("canvas");
    // let ctx = canvas.getContext("2d");
      ctx.beginPath();
      if (this.type === "user") {
        ctx.fillStyle = "bisque";
      } else {
        ctx.fillStyle = "red";
      }
       // #ffe4c4
      ctx.arc(x, y, 15, 0, Math.PI * 2, true); // draw circle for head
      // (x,y) center, radius, start angle, end angle, anticlockwise
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "black"; // color
      ctx.lineWidth = 3;
      ctx.arc(x, y+1, 10, 0, Math.PI, false); // draw semicircle for smiling
      ctx.stroke();

      // eyes
      ctx.beginPath();
      ctx.fillStyle = "black"; // color
      ctx.arc((x-5), (y-2.5), 3, 0, Math.PI * 2, true); // draw left eye
      ctx.fill();
      ctx.arc((x+5), scale *(y-2.5), 3, 0, Math.PI * 2, true); // draw right eye
      ctx.fill();

      // body
      ctx.beginPath();
      ctx.moveTo(x, (y+15));
      ctx.lineTo(x, (y+65));
      ctx.strokeStyle = "black";
      ctx.stroke();

      // arms
      ctx.beginPath();
      ctx.strokeStyle = "black"; // blue
      ctx.moveTo(x, (y+15));
      ctx.lineTo((x-25), (y+40));
      ctx.moveTo(x, (y+15));
      ctx.lineTo((x+25), (y+40));
      ctx.stroke();

      // legs
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo(x, (y+65));
      ctx.lineTo((x-25), (y+115));
      ctx.moveTo(x, (y+65));
      ctx.lineTo((x+25), (y+115));
      ctx.stroke();


      //platform
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.moveTo((x + 35), (y+115));
      ctx.lineTo((x-35), (y+115));
      ctx.lineWidth=10;
      ctx.stroke();
    }
    shootSpear(theta, velMultiplier) {
      // const spear = ;
      this.game.add(new Spear(this.game, theta, velMultiplier, this.pos));

    }
    isCollidedWith(otherObject) {
    }
  }



module.exports = Stickman;
