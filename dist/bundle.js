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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Stickman = __webpack_require__(4);
const Spear = __webpack_require__(1);
const ThrowMeter = __webpack_require__(6);
const ThrowMeterTail = __webpack_require__(7);

class Game {
  constructor() {
    this.stickmen = [];
    this.enemies = [];
    this.spears = [];
    this.throwMeter = [];
    this.throwMeterTail = [];
    this.lives = 3;
    this.score = 0;
    this.intervals = [];
    this.all = [];
    // this.addUserStickman();
    this.addEnemyStickman();
    this.addEnemyAction();
  }

  addEnemyAction() {
    let spearId = 0;
    let shootTime = 1500;
    console.log("STILL ADDING ENEMYS");
    this.intervals[0] = setInterval(()=> {
      this.enemies.forEach( (enemy) => {
        let enemyTheta = (Math.random() * 200) + 100;
        enemy.shootSpear(enemyTheta, 1, "enemy", spearId);
        spearId ++;

      });
    }, shootTime);

    let enemyId = 0;
    let enemySpawnTime = 1500;
    this.intervals[1] = setInterval(()=> {
      this.addEnemyStickman(enemyId);
      console.log("STILL ADDING SPEars");
      enemyId ++;
    }, enemySpawnTime);

  }

  add(object) {
    console.log();
   if (object instanceof Stickman && object.type === "enemy") {
     this.enemies.push(object);
   } else if (object instanceof Stickman ) {
     this.stickmen.push(object);
   } else if (object instanceof Spear) {
     this.spears.push(object);
   } else if (object instanceof ThrowMeter) {
     this.throwMeter.push(object);
   } else if (object instanceof ThrowMeterTail) {
     this.throwMeterTail = [object];
   }
   else {
     throw "unknown type of object";
   }
 }


  allObjects() {
    let add = [].concat(this.stickmen, this.enemies, this.spears, this.throwMeter, this.throwMeterTail);
    this.all = add;
    return this.all;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 750, 600);
    ctx.font = "30px Arial";
    ctx.fillText(`Lives: ${this.lives}`,10,50);
    ctx.fillText(`Score: ${this.score}`,600,50);
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  moveObjects(delta) {
    console.log(this.allObjects());
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }


  addUserStickman() {
    const stickman = new Stickman(this, "user");
    console.log(stickman);
    this.add(stickman);
    return stickman;
  }

  addEnemyStickman(enemyId) {
    const stickman2 = new Stickman(this, "enemy", enemyId);
    console.log(stickman2);
    this.add(stickman2);
    return stickman2;
  }

  addThrowMeter(x,y) {
    const throwmeter = new ThrowMeter(this, x, y);
    this.add(throwmeter);
    return throwmeter;
  }

  addThrowMeterTail(x, y, x2, y2) {
    const throwmetertail = new ThrowMeterTail(this, x, y, x2, y2);
    this.add(throwmetertail);
    return throwmetertail;
  }

  remove(object) {
    console.log("here");
    console.log(object);
    if (object instanceof Spear) {
      this.spears.splice(this.spears.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }

  removeMeter() {
    this.throwMeter = [];
    this.throwMeterTail = [];
  }

  checkCollisions() {
    const spearsUser = this.spears.filter((spear) => spear.type === "user");
    const spearsEnemy = this.spears.filter((spear) => spear.type === "enemy");
    const enemies = this.enemies;
    const stickmen = this.stickmen;
    console.log(enemies);
    if (enemies.length >= 1) {
      console.log("IN IT!!!!!");
      spearsUser.forEach( (spear) => {
        enemies.forEach((enemy) => {
          if (spear.isCollidedWith(enemy)) {
            console.log("HIT!!!!!");
            this.score += 10;
            let enemyIdx = this.enemies.findIndex((enemy2)=> enemy2.enemyId === enemy.enemyId);
            console.log("IDX", enemyIdx);
            let spearIdx = this.spears.findIndex((spear2)=> spear2.spearId === spear.spearId);
            this.spears.splice(spearIdx, 1);

            this.enemies.splice(enemyIdx,1);
          }
        });
      });

      spearsEnemy.forEach( (spear) => {
        if (spear.isCollidedWith(stickmen[0])) {
          let spearIdx = this.spears.findIndex((spear2)=> spear2.spearId === spear.spearId);
          this.spears.splice(spearIdx, 1);
          this.lives --;
          console.log("HITTTTTTTTT");
          // console.log("HIT!!!!!");
          // this.addEnemyStickman();
        }
      });


        // const collision = enemies[0].collidedWith(spears[0]);
        // if (collision) return;
      }
    }


    // const relevantCollisions = this.spears.concat(this.enemies);
    // const allObjects = this.allObjects();
    // for (let i = 0; i < relevantCollisions.length; i++) {
    //   for (let j = 0; j < relevantCollisions.length; j++) {
    //     const obj1 = relevantCollisions[i];
    //     const obj2 = relevantCollisions[j];
    //
    //     if (obj1.isCollidedWith(obj2)) {
    //       console.log("HIT!!!!!");
    //       // debugger
    //       const collision = obj1.collideWith(obj2);
    //       if (collision) return;
    //     }
    //   }
    // }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(5);

class Spear extends MovingObject {
  constructor(options, theta, velMultiplier, startPosition, type, spearId) {
    super(options, theta, velMultiplier, startPosition, type, spearId);
    console.log("OPTIONS", options);
    this.type = type;
    this.game = options;
    this.theta = theta;
    this.position = startPosition;
    this.velMultiplier = velMultiplier;
    console.log("THETTTTAAA", theta);
  }

  remove() {
    this.game.remove(this);
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  }
};

module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(8);



class Spearman {
  constructor() {
    this.currentGame = null;
    this.startGame();
  }

  startGame() {
    let self = this;
    document.addEventListener("DOMContentLoaded", function(){
      const canvasEl = document.getElementById('canvas');
      // canvasEl.width = Game.DIM_X;
      // canvasEl.height = Game.DIM_Y;
      console.log("HELLO");
      const ctx = canvasEl.getContext("2d");
      const game = new Game();
      self.currentGame = new GameView(game, ctx);
      self.currentGame.start();
    });
    // this.pauseGame();
    // let pauseButton = document.getElementById("pause-button");
    // pauseButton.addEventListener('click', (event) => {
    //   if (this.currentGame.paused === false) {
    //     this.currentGame.paused = true;
    //   } else {
    //     this.currentGame.paused = false;
    //   }
    //   this.currentGame.pause();
    //   console.log("WHHOOOOAH");
    // });
  }
  //
  // pauseGame() {
  //   let pauseButton = document.getElementById("pause-button");
  //   pauseButton.addEventListener('click', (event) => {
  //
  //     if (this.currentGame.paused === false) {
  //       this.currentGame.paused = true;
  //     } else {
  //       this.currentGame.paused = false;
  //     }
  //     this.currentGame.pause();
  //     console.log("this.currentGame", this.currentGame);
  //   });
  // }
}

new Spearman();
module.exports = Spearman;







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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Spear = __webpack_require__(1);

class Stickman {
  constructor(game, type, enemyId) {
    this.enemyId = enemyId;
    this.game = game;
    this.type = type;
    if (this.type === "user") {
      this.pos = [150/2, 500/2];
    } else {
      //fix these so guy doesn't go off screen
      const x = Math.random() * 425 + 275;
      const y = Math.random() * 435 + 45;
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
    shootSpear(theta, velMultiplier, type, spearId) {
      // const spear = ;
      this.game.add(new Spear(this.game, theta, velMultiplier, this.pos, type, spearId));

    }
    isCollidedWith(otherObject) {
    }
  }



module.exports = Stickman;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(this.x - 10, this.y - 65, 20, 0, Math.PI * 2, true);
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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);
const Game = __webpack_require__(0);
const Spearman = __webpack_require__(3);

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.stickman= this.game.addUserStickman();
    console.log(this.stickman);
    this.bindClickHandlers();
    this.pos = [0,0];
    this.paused = false;
    this.currentGame = null;
  }

  bindClickHandlers() {
    const stickman = this.stickman;

    document.addEventListener('mousedown', (event) => {
      // stickman.shootSpear();
      this.pos[0] = event.clientX;
      this.pos[1] = event.clientY;
      this.game.addThrowMeter(this.pos[0], this.pos[1]);

      document.onmousemove = (event2) => {
        let x2 = event2.clientX;
        let y2 = event2.clientY;
        this.game.addThrowMeterTail(this.pos[0], this.pos[1], x2, y2);
      };
    });

    document.addEventListener('mouseup', (event) => {

      let x = event.clientX;
      let y = event.clientY;
      let dx =  x - this.pos[0];
      let dy =  this.pos[1] - y;
      let theta = Math.atan(dy/dx);
      theta *= (180/Math.PI);
      console.log("YOOOOO", theta);
      const velMultipier = Util.dist([this.pos[0], this.pos[1]], [x,y]);
      console.log(velMultipier);
      stickman.shootSpear(theta, velMultipier, "user");
      document.onmousemove = null;
      this.game.removeMeter();
      //remove tail and throwmeter here
    });
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  pause() {
    if (this.paused === true) {
      cancelAnimationFrame(this.animationFrame);
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  animate(time) {
    if (this.game.lives >= 0) {
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      this.animationFrame = requestAnimationFrame(this.animate.bind(this));

    } else {
      this.ctx.clearRect(0, 0, 750, 600);
      this.ctx.font = "100px Arial";
      this.ctx.fillText("GAME OVER",60,200);
      this.game.stickmen = [];
      this.game.enemies = [];
      this.game.spears = [];
      this.game.throwMeter = [];
      this.game.throwMeterTail = [];
      this.game.all = [];
      this.game.lives = -1;
      this.game.score = 0;
      this.game.intervals.forEach((interval) => {
        clearInterval(interval);
      });
      cancelAnimationFrame(this.animationFrame);
      let resetButton = document.getElementById("reset-button");
      resetButton.style.display = "flex";
      resetButton.addEventListener('click', (event) => {

        // let game = new Game();
        // this.start(game);
        // this.start();

        const canvasEl = document.getElementById('canvas');
        // canvasEl.width = Game.DIM_X;
        // canvasEl.height = Game.DIM_Y;
        console.log("HELLO");
        const ctx = canvasEl.getContext("2d");
        const game = new Game();
        this.currentGame = new GameView(game, ctx);
        this.currentGame.start();
        resetButton.style.display = "none";
      });

      // document.removeEventListener('click', (event)=> {
      // });

    }

  // document.onmousedown = null;

  }


}

module.exports = GameView;


/***/ })
/******/ ]);