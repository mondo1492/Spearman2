/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(3);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById('canvas');
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});







// import buildStickamn from './stickman';
//
// document.addEventListener("DOMContentLoaded", function(){
//   let x = 1;
//   setInterval(() => {
//     x+=1;
//     console.log(x);
//     renderGame(x, 0);
//     loadGame();
//   }, 10);
// });
//
//
//
// const loadGame = (x, y) => {
//   buildStickamn(150, 500, .5);
// };
//
// const test = (x, y) => {
//   var canvas = document.getElementById('canvas');
//   var ctx = canvas.getContext('2d');
//   document.addEventListener("click", function(){
//     drawMovingSquare(x);
//     clearTimeout();
//   });
//
//   const drawMovingSquare = () => {
//     ctx.save();
//     ctx.clearRect(0,0,550,400);
//     ctx.fillStyle = "rgba(0,200,0,1)";
//     ctx.fillRect(x, 20, 50, 50);
//     ctx.restore();
//     // x += 1;
//     // var looper = setTimeout(()=> drawMovingSquare(x, y), 10);
//   };
//
//
//
//
//   // setTimeout(()=> test(x, y), 100);
// };
//
// const renderGame = (x, y) => {
//   loadGame();
//   test(x,y);
//   };
//
//
// // class Spearman {
// //   constructor() {
// //
// //   }
// //
// //   shootSpear() {
// //
// //   }
// //
// //   updateGame() {
// //
// //   }
// //
// //   updatePlayer() {
// //
// //   }
// //
// //   renderGame() {
// //
// //   }
// // }
//
// // import buildStickamn from './stickman';
// //
// // document.addEventListener("DOMContentLoaded", function(){
// //   let x = 1;
// //   setTimeout(() => {
// //     x += 1;
// //     console.log(x);
// //     renderGame(x, 0);
// //   }, 10);
// // });
// //
// //
// //
// // const loadGame = (x, y) => {
// //   buildStickamn(150, 500, .5);
// //
// // };
// //
// // const test = (x, y) => {
// //
// //
// //
// //   var canvas = document.getElementById('canvas');
// //   var ctx = canvas.getContext('2d');
// //   ctx.save();
// //   ctx.clearRect(0,0,550,400);
// //   ctx.fillStyle = "rgba(0,200,0,1)";
// //   ctx.fillRect(x, 20, 50, 50);
// //   ctx.restore();
// //
// //   // setTimeout(()=> test(x, y), 100);
// // };
// //
// // const renderGame = (x, y) => {
// //   loadGame();
// //   document.addEventListener("click", function(){
// //     test(x,y);
// //   });
// //
// //
// // };
// //
// // // class Spearman {
// // //   constructor() {
// // //
// // //   }
// // //
// // //   shootSpear() {
// // //
// // //   }
// // //
// // //   updateGame() {
// // //
// // //   }
// // //
// // //   updatePlayer() {
// // //
// // //   }
// // //
// // //   renderGame() {
// // //
// // //   }
// // // }


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Spear = __webpack_require__(4);

class Stickman {
  constructor(game) {

    this.game = game;
  }

  draw(ctx, x, y, scale) {
    x = 150;
    y = 500;
    scale = 0.5;
    var canvas = document.getElementById("canvas");
    // let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = "bisque"; // #ffe4c4
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
    shootSpear() {
      // const spear = ;
      this.game.add(new Spear(this.game));
      
    }
  }




module.exports = Stickman;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Stickman = __webpack_require__(1);
const Spear = __webpack_require__(4);

class Game {
  constructor() {
    this.stickmen = [];
    this.spears = [];
    // this.addUserStickman();
  }

  add(object) {
   if (object instanceof Stickman) {
     this.stickmen.push(object);
   } else if (object instanceof Spear) {
     this.spears.push(object);
   } else {
     throw "unknown type of object";
   }
 }


  allObjects() {
    console.log(this.stickmen);
    console.log(this.spears);
    return [].concat(this.stickmen, this.spears);
  }

  draw(ctx, timeDelta) {
    console.log("hello");
    ctx.clearRect(0, 0, 750, 600);
    // ctx.fillRect(0, 0, 750, 600);
    // console.log("ALL OBJECTS", this.allObjects());
    this.allObjects().forEach((object) => {
      if (object instanceof Spear) {
        object.draw(ctx, timeDelta);
      } else {
        object.draw(ctx);
      }

      console.log("HI");
    });
    if (this.spears.length >= 1) {
      // debugger
    }


  }

  step(delta) {
    // this.moveObjects(delta);
    // this.checkCollisions();
  }


  addUserStickman() {
    const stickman = new Stickman(this);
    console.log(stickman);
    this.add(stickman);
    return stickman;
  }

  remove(object) {
    if (object instanceof Spear) {
      this.spears.splice(this.spears.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }
}

module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.stickman= this.game.addUserStickman();
    console.log(this.stickman);
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    const stickman = this.stickman;

    document.addEventListener('click', () => {
      stickman.shootSpear();
    });
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx, timeDelta);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }


}

module.exports = GameView;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


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


/***/ })
/******/ ]);