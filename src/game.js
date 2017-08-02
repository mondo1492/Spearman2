const Stickman = require('./stickman');
const Spear = require('./spear');
const ThrowMeter = require('./throw_meter');
const ThrowMeterTail = require('./throw_meter_tail');

class Game {
  constructor() {
    this.stickmen = [];
    this.enemies = [];
    this.spears = [];
    this.throwMeter = [];
    this.throwMeterTail = [];
    // this.addUserStickman();
    this.addEnemyStickman();
    this.addEnemyAction();
  }

  addEnemyAction() {
    setInterval(()=> {
      this.enemies.forEach( (enemy) => {
        let enemyTheta = (Math.random() * 200) + 100;
        enemy.shootSpear(enemyTheta, 1);
      });
    }, 2000);

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
    return [].concat(this.stickmen, this.enemies, this.spears, this.throwMeter, this.throwMeterTail);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 750, 600);
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

  addEnemyStickman() {
    const stickman2 = new Stickman(this, "enemy");
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
    const spears = this.spears;
    console.log(spears);
    const enemies = this.enemies;
    const stickmen = this.stickmen;
    console.log(enemies);
    if (enemies.length >= 1 && spears.length >= 1) {
      console.log("IN IT!!!!!");
      spears.forEach( (spear) => {
        enemies.forEach((enemy) => {
          if (spear.isCollidedWith(enemy)) {
            console.log("HIT!!!!!");
            this.enemies.shift();
            this.addEnemyStickman();
          }
        });

        if (spear.isCollidedWith(stickmen[0])) {
          console.log("HIT!!!!!");
          this.addEnemyStickman();
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
