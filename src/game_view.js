const Util = require("./util");

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.stickman= this.game.addUserStickman();
    console.log(this.stickman);
    this.bindClickHandlers();
    this.pos = [0,0];
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
      stickman.shootSpear(theta, velMultipier);
      document.onmousemove = null;
      this.game.removeMeter();
      //remove tail and throwmeter here
    });
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }


}

module.exports = GameView;
