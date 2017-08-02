const Stickman = require('./stickman');
const Spear = require('./spear');

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
