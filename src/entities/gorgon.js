const GORGON_X_OFFSET = 110;
const GORGON_WIDTH = 90;

const GORGON_DEFAULTS = {
    maxHp: 1000, 
    Hp: 1000,
    dead: false,
}

class Gorgon {
    constructor(game, self) {
        this.game = game;
        this.self = self;
        this.x = self.x;
        this.y = self.y;
        this.dead = this.self.dead ? this.self.dead : GORGON_DEFAULTS.dead;
        this.aggro = false;
        this.target = null;
        this.facingLeft = true;
        this.attackNumber = Math.floor(Math.random() * 2);
        this.inCutscene = false;
        this.attackRange = 100;
        this.maxHp = GORGON_DEFAULTS.maxHp; 
        this.hp = this.self.hp ? this.self.hp : GORGON_DEFAULTS.maxHp;
        this.height = 100;
        this.bheight = 10;
        this.range = 800;
        this.speed = 400;
        this.damage = 100;

        this.gorgonHit = new Audio("./resources/SoundEffects/gorgonhit.mp3")
        this.gorgonDeath = new Audio("./resources/SoundEffects/gorgondeath.mp3")
        this.healthBar = new HealthBar(this);
        this.updateBB();

        this.animations = {
            // LeftAttack1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack1.png"), 2048, 0, 128, 128, 16, 0.08, true, false),
            LeftAttack2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack2.png"), 896, 0, 128, 128, 7, 0.08, true, false),
            LeftAttack3: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack3.png"), 1280, 0, 128, 128, 10, 0.08, true, false),
            LeftDead: new Animator(ASSET_MANAGER.getAsset(GORGON + "Dead.png"), 384, 0, 128, 128, 3, 0.2, true, false),
            LeftHurt: new Animator(ASSET_MANAGER.getAsset(GORGON + "Hurt.png"), 384, 0, 128, 128, 3, 0.1, true, false),
            LeftIdle1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle1.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            LeftIdle2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle2.png"), 640, 0, 128, 128, 5, 0.15, true, true),
            LeftRun: new Animator(ASSET_MANAGER.getAsset(GORGON + "Run.png"), 896, 0, 128, 128, 7, 0.1, true, true),
            LeftSpecial: new Animator(ASSET_MANAGER.getAsset(GORGON + "Special.png"), 640, 0, 128, 128, 5, 0.15, true, false),
            LeftWalk: new Animator(ASSET_MANAGER.getAsset(GORGON + "Walk.png"), 1664, 0, 128, 128, 13, 0.08, true, true),
            // RightAttack1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack1.png"), 0, 0, 128, 128, 16, 0.08, false, false),
            RightAttack2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack2.png"), 0, 0, 128, 128, 7, 0.08, false, false),
            RightAttack3: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack3.png"), 0, 0, 128, 128, 10, 0.08, false, false),
            RightDead: new Animator(ASSET_MANAGER.getAsset(GORGON + "Dead.png"), 0, 0, 128, 128, 3, 0.2, false, false),
            RightHurt: new Animator(ASSET_MANAGER.getAsset(GORGON + "Hurt.png"), 0, 0, 128, 128, 3, 0.15, false, false),
            RightIdle1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle1.png"), 0, 0, 128, 128, 7, 0.15, false, true),
            RightIdle2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle2.png"), 0, 0, 128, 128, 5, 0.15, false, true),
            RightRun: new Animator(ASSET_MANAGER.getAsset(GORGON + "Run.png"), 0, 0, 128, 128, 7, 0.1, false, true),
            RightSpecial: new Animator(ASSET_MANAGER.getAsset(GORGON + "Special.png"), 0, 0, 128, 128, 5, 0.15, false, false),
            RightWalk: new Animator(ASSET_MANAGER.getAsset(GORGON + "Walk.png"), 0, 0, 128, 128, 13, 0.08, false, true),
        }

        this.currentState = Math.random() < 0.5 ? 'LeftIdle1' : 'LeftIdle2';
    };

    save() {
        this.self.x = this.x;
        this.self.y = this.y;
        this.self.hp = this.hp;
        this.self.dead = this.dead;
    }

    takeDamage(amount) {

        this.hp -= amount;

        this.gorgonHit.play();
        this.gorgonHit.volume = 0.2;

        if (this.hp <= 0) {
            this.die();
            this.gorgonDeath.play();
            this.gorgonDeath.volume = 0.2;
        }
    }

    die() {
        if (this.hp <= 0) {
            if (this.target) {
                this.target.emberCount += 300;
            }
            if (this.facingLeft) {
                this.setState('LeftDead');
            } else {
                this.setState('RightDead');
            }
             this.dead = true;
        }

        setTimeout(() => {
            this.removeFromWorld = true;
        }, 1000);
    }

    setState(state) {
        for (let key in this.animations) {
            if (this.currentState === key) {

            } else if (this.animations.hasOwnProperty(key)) {
                // Reset each Animator instance
                this.animations[key].reset();
            }
        }
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error(`State '${state}' not found.`);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        if (this.aggro) {
            if (this.facing == LEFT) {
                this.BB = new BoundingBox(this.x - this.game.camera.x + 90, this.y + 105 - this.game.camera.y, GORGON_WIDTH, 150);
            } else {
                this.BB = new BoundingBox(this.x - this.game.camera.x + 90, this.y + 105 - this.game.camera.y, GORGON_WIDTH, 150);
            }
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x + GORGON_WIDTH / 2 - this.range / 2  + 96, this.y + 105 - this.game.camera.y, this.range, 150);
        }
    }

    update() {
        this.updateBB();
        if (this.inCutscene) {
            return;
        }
        if (this.dead) {
            return;
        }

        let gorgon = this;
        this.game.entities.forEach(function (entity) {
            if (entity.currentState === 'LeftWalk' || entity.currentState === 'RightWalk') {
                if (entity instanceof Knight && entity.x - gorgon.x > 300) {
                    gorgon.facingLeft = false;
                    gorgon.setState('RightRun')
                } else if (entity instanceof Knight && gorgon.x - entity.x > 300) {
                    gorgon.facingLeft = true;
                    gorgon.setState('LeftRun')
                }
            }
            if (entity.BB && gorgon.BB.collide(entity.BB)) {
                if (entity instanceof Knight && !gorgon.aggro) {
                    gorgon.target = entity;
                    gorgon.aggro = true;
                    if (gorgon.facingLeft) {
                        gorgon.setState('LeftWalk');
                    } else {
                        gorgon.setState('RightWalk')
                    }
                } else if (entity instanceof Knight && gorgon.aggro) {
                    if (gorgon.facingLeft) {
                        if (gorgon.attackNumber === 0) {
                            gorgon.setState('LeftAttack2');
                        } else {
                            gorgon.setState('LeftAttack3');
                        }
                    } else {
                        if (gorgon.attackNumber === 0) {
                            gorgon.setState('RightAttack2');
                        } else {
                            gorgon.setState('RightAttack3');
                        }
                    }
                    if (entity.currentState === 'LeftRoll' || entity.currentState === 'RightRoll') {

                    } else {
                        if (gorgon.animations[gorgon.currentState].getDone()) {
                            entity.takeDamage(gorgon.damage);
                            gorgon.currentState = entity.x > gorgon.x ? 'LeftIdle1' : 'LeftIdle2';
                        }
                    }
                }
            } else if (entity instanceof Knight) {
                if (gorgon.animations[gorgon.currentState].getDone() || gorgon.currentState === 'LeftWalk'
                    || gorgon.currentState === 'RightWalk') {
                    gorgon.attackNumber = Math.floor(Math.random() * 2);
                    if (entity.x > gorgon.x) {
                        // Knight is to the right
                        if (gorgon.aggro) {
                            gorgon.facingLeft = false;
                            gorgon.setState('RightWalk');
                        }
                    } else if (entity.x < gorgon.x) {
                        // Knight is to the left
                        if (gorgon.aggro) {
                            gorgon.facingLeft = true;
                            gorgon.setState('LeftWalk');
                        }
                    }
                }
            }
        });

        if (this.currentState === 'RightWalk') {
            this.x += this.speed * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= this.speed * this.game.clockTick;
        }
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        this.BB.draw(ctx);
        if (this.healthBar) this.healthBar.draw(ctx);
    }
}