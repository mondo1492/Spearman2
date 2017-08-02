
class Spear {
  constructor(game) {
    this.game = game;
    this.pro = {
    				x:80,
    				y:380,
    				r:15,
    				v:90,
    				theta: 45
    				};
    // this.draw = this.draw();
  }

  draw(ctx, timeDelta) {

		let canvas = document.getElementById('canvas');
		// let ctx = canvas.getContext('2d');

		let frameCount = 0;

		let startX = pro.x;
		let startY = pro.y;
		let g = 9.8;
		setInterval(() =>
		{
      console.log("we in here");

			if(pro.y<canvas.height - pro.r && pro.x < canvas.width - pro.r)
			{
				pro.y = startY - ( v0y * frameCount - (1/2 * g * Math.pow(frameCount,2)) );
				pro.x = startX + v0x * frameCount;
			} else {
        this.remove();
      }


			frameCount+=.2;

		}, 1000 /77);
  }
  remove() {
    this.game.remove(this);
    let v0x = this.pro.v * Math.cos(this.pro.theta * Math.PI/180);
		let v0y = this.pro.v * Math.sin(this.pro.theta * Math.PI/180);
  }

  loop(){
    let frameCount = 0;
  }

  draw(ctx) {
    ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "rgba(0, 200, 0, 0.6)";
      ctx.arc(this.pro.x,this.pro.y,this.pro.r,0,Math.PI*2,true);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    ctx.restore();
  }
}

module.exports = Spear;



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
