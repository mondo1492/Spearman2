const Util = require("./util");
const Game = require("./game");
const Spearman = require('./spearman');

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
