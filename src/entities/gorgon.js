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
        this.attackNumber = Math.floor(Math.random() * 3);
        this.inCutscene = false;
        this.attackRange = 100;
        this.maxHp = GORGON_DEFAULTS.maxHp; 
        this.hp = this.self.hp ? this.self.hp : GORGON_DEFAULTS.maxHp;
        this.height = 100;
        this.bheight = 10;
        this.healthBar = new HealthBar(this);
        this.updateBB();

        this.animations = {
            LeftAttack1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack1.png"), 2048, 0, 128, 128, 16, 0.15, true, false),
            LeftAttack2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack2.png"), 896, 0, 128, 128, 7, 0.15, true, false),
            LeftAttack3: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack3.png"), 1280, 0, 128, 128, 10, 0.15, true, false),
            LeftDead: new Animator(ASSET_MANAGER.getAsset(GORGON + "Dead.png"), 384, 0, 128, 128, 3, 0.2, true, false),
            LeftHurt: new Animator(ASSET_MANAGER.getAsset(GORGON + "Hurt.png"), 384, 0, 128, 128, 3, 0.1, true, false),
            LeftIdle1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle1.png"), 896, 0, 128, 128, 7, 0.15, true, true),
            LeftIdle2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle2.png"), 640, 0, 128, 128, 5, 0.15, true, true),
            LeftRun: new Animator(ASSET_MANAGER.getAsset(GORGON + "Run.png"), 896, 0, 128, 128, 7, 0.1, true, true),
            LeftSpecial: new Animator(ASSET_MANAGER.getAsset(GORGON + "Special.png"), 640, 0, 128, 128, 5, 0.15, true, false),
            LeftWalk: new Animator(ASSET_MANAGER.getAsset(GORGON + "Walk.png"), 1664, 0, 128, 128, 13, 0.15, true, true),
            RightAttack1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack1.png"), 0, 0, 128, 128, 16, 0.15, false, false),
            RightAttack2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack2.png"), 0, 0, 128, 128, 7, 0.15, false, false),
            RightAttack3: new Animator(ASSET_MANAGER.getAsset(GORGON + "Attack3.png"), 0, 0, 128, 128, 10, 0.15, false, false),
            RightDead: new Animator(ASSET_MANAGER.getAsset(GORGON + "Dead.png"), 0, 0, 128, 128, 3, 0.2, false, false),
            RightHurt: new Animator(ASSET_MANAGER.getAsset(GORGON + "Hurt.png"), 0, 0, 128, 128, 3, 0.15, false, false),
            RightIdle1: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle1.png"), 0, 0, 128, 128, 7, 0.15, false, true),
            RightIdle2: new Animator(ASSET_MANAGER.getAsset(GORGON + "Idle2.png"), 0, 0, 128, 128, 5, 0.15, false, true),
            RightRun: new Animator(ASSET_MANAGER.getAsset(GORGON + "Run.png"), 0, 0, 128, 128, 7, 0.1, false, true),
            RightSpecial: new Animator(ASSET_MANAGER.getAsset(GORGON + "Special.png"), 0, 0, 128, 128, 5, 0.15, false, false),
            RightWalk: new Animator(ASSET_MANAGER.getAsset(GORGON + "Walk.png"), 0, 0, 128, 128, 13, 0.15, false, true),
        }

        this.currentState = Math.random() < 0.5 ? 'LeftIdle1' : 'LeftIdle2';
    };

    save() {
        this.self.x = this.x;
        this.self.y = this.y;
        this.self.hp = this.hp;
        this.self.dead = this.dead;
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
            this.BB = new BoundingBox(this.x - this.game.camera.x + 128, this.y + 128, 100, 128);
        } else {
            this.BB = new BoundingBox(this.x - this.game.camera.x - 128, this.y + 128, 500, 128);
        }
    }

    update() {
        this.updateBB();
        if (this.inCutscene) {
            return;
        }
        if (this.dead) {
            this.target.emberCount += 300;
            return;
        }
        if (this.hp <= 0) {
            if (this.facingLeft) {
                this.setState('LeftDead');
            } else {
                this.setState('RightDead');
            }
             this.dead = true;
        }

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Knight && entity.x - that.x > 1000) {
                that.aggro = false;
                that.facingLeft = false;
                that.setState('RightIdle1')
            } else if (entity instanceof Knight && that.x - entity.x > 1000) {
                that.aggro = false;
                that.facingLeft = true;
                that.setState('LeftIdle1')
            }
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Knight && !that.aggro) {
                    that.target = entity;
                    that.aggro = true;
                    if (that.facingLeft) {
                        that.setState('LeftRun');
                    } else {
                        that.setState('RightWalk')
                    }
                } else if (entity instanceof Knight && that.aggro) {
                    if (entity.currentState === 'RightAttack1') {
                        that.setState('LeftHurt')
                        that.hp -= entity.damage;
                        that.x += 50;
                        return;
                    } else if (entity.currentState === 'LeftAttack1') {
                        that.setState('RightHurt')
                        that.hp -= entity.damage;
                        that.x -= 50;
                        return;
                    } else if (entity.currentState === 'LeftRoll' || entity.currentState === 'RightRoll') {

                    } else {
                        if (that.facingLeft) {
                            entity.setState('RightDeath');
                        } else {
                            entity.setState('LeftDeath');
                        }
                        entity.dead = true;
                    }
                    if (that.facingLeft) {
                        if (that.attackNumber === 0) {
                            that.setState('LeftAttack1');
                        } else if (that.attackNumber === 1) {
                            that.setState('LeftAttack2');
                        } else {
                            that.setState('LeftAttack3');
                        }
                    } else {
                        if (that.attackNumber === 0) {
                            that.setState('RightAttack1');
                        } else if (that.attackNumber === 1) {
                            that.setState('RightAttack2');
                        } else {
                            that.setState('RightAttack3');
                        }
                    }
                }
            } else if (entity instanceof Knight) {
                if (that.animations[that.currentState].getDone()) {
                    that.attackNumber = Math.floor(Math.random() * 3);
                    if (entity.x > that.x) {
                        // Knight is to the right
                        if (that.aggro) {
                            that.facingLeft = false;
                            that.setState('RightWalk');
                        }
                    } else if (entity.x < that.x) {
                        // Knight is to the left
                        if (that.aggro) {
                            that.facingLeft = true;
                            that.setState('LeftWalk');
                        }
                    }
                }
            }
        });

        if (this.currentState === 'RightRun') {
            this.x += 500 * this.game.clockTick;
        } else if (this.currentState === 'LeftRun') {
            this.x -= 500 * this.game.clockTick;
        } else if (this.currentState === 'RightWalk') {
            this.x += 150 * this.game.clockTick;
        }else if (this.currentState === 'LeftWalk') {
            this.x -= 150 * this.game.clockTick;
        }
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        this.BB.draw(ctx);
    }
}