const Util = require("./util");

class MovingObject {
  constructor(options, theta, velMultiplier, startPosition, type, spearId) {
    this.pos = [startPosition[0] - 20, startPosition[1] +120];
    // this.pos = [80, 380];
    console.log("VELLLL", velMultiplier);
    this.vel = [40 + (15 * velMultiplier/1000)];
    // this.vel = [120 * (1 + velMultiplier/100)];
    this.radius = 5;
    this.color = options.color;
    this.game = options.game;
    this.spearId = spearId;
    this.type = type;
    this.theta = theta +20;
    console.log("THETTTTAAA", theta);
    this.velocityScale = 1;
    this.pro = {
    				x:80,
    				y:380,
    				r:5,
    				v:10,
    				theta: 65
    				};
  }

  collideWith(otherObject) {
    // default do nothing
  }

  draw(ctx) {
    ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 200, 0, 0.6)";
      ctx.arc(this.pos[0],this.pos[1],this.pro.r,0,Math.PI*2,true);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    ctx.restore();
  }

  move(timeDelta) {
    const velocityScale = (timeDelta / NORMAL_FRAME_TIME_DELTA);
    this.velocityScale += (1/60);

    let v0x = this.vel[0] * Math.cos(this.theta * Math.PI/180);
    let v0y = this.vel[0] * Math.sin(this.theta * Math.PI/180);
    let startX = this.pos[0];
		let startY = this.pos[1];
    let g = 9.8 ;
    this.pos[1] = (startY - (( v0y * this.velocityScale * (1/4)- (1/2 * g * Math.pow(this.velocityScale,2)))));
    this.pos[0] = (startX + (v0x * this.velocityScale * (1/4)));

    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second


    // this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    let canvas = document.getElementById('canvas');
    if (this.pos[1] < -500
        || this.pos[0] > canvas.width
        || this.pos[0] < 0
        || isNaN(this.pos[0]))
        {
      this.remove();
    }
  }
  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;


//
//
// class Spear {
//   constructor(game) {
//     this.game = game;
//     // this.draw = this.draw();
//   }
//
//   draw(ctx, timeDelta) {
//     let pro = {
//     				x:80,
//     				y:380,
//     				r:15,
//     				v:90,
//     				theta: 45
//     				};
//
// 		let canvas = document.getElementById('canvas');
// 		// let ctx = canvas.getContext('2d');
//
// 		let frameCount = 0;
// 		let v0x = pro.v * Math.cos(pro.theta * Math.PI/180);
// 		let v0y = pro.v * Math.sin(pro.theta * Math.PI/180);
// 		let startX = pro.x;
// 		let startY = pro.y;
// 		let g = 9.8;
// 		setInterval(() =>
// 		{
//       console.log("we in here");
//
// 			if(pro.y<canvas.height - pro.r && pro.x < canvas.width - pro.r)
// 			{
// 				pro.y = startY - ( v0y * frameCount - (1/2 * g * Math.pow(frameCount,2)) );
// 				pro.x = startX + v0x * frameCount;
// 			} else {
//         this.remove();
//       }
//
// 			ctx.save();
// 				ctx.beginPath();
// 				ctx.fillStyle = "rgba(0, 200, 0, 0.6)";
// 				ctx.arc(pro.x,pro.y,pro.r,0,Math.PI*2,true);
// 				ctx.fill();
// 				ctx.stroke();
// 				ctx.closePath();
// 			ctx.restore();
// 			frameCount+=.2;
//
// 		}, 1000 /77);
//   }
//   remove() {
//     this.game.remove(this);
//   }
// }
//
// module.exports = Spear;
