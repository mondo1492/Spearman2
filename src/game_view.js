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
