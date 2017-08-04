const Game = require("./game");
const GameView = require("./game_view");



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
