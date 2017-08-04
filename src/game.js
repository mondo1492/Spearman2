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
    this.lives = 0;
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
