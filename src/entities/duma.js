class Duma {
    constructor(game, x, y) {
        this.game = game;
        this.target = null;
        this.x = x
        this.y = y
        this.updateBB();
        this.maxHp = 4000;
        this.hp = 4000;
        this.height = 100;
        this.bheight = 0;
        this.healthBar = new HealthBar(this);
        this.inCutscene = true;
        this.specialAttackRun = false;
        this.specialAttack2Run = false;
        this.specialAttackX = false;
        this.specialAttackY = false;
        this.goUp = false;
        this.goDown = false;
        this.goRight = false;
        this.goLeft = false;
        this.facingLeft = true;
        this.attackChargeAvailable = true;
        this.attackChargeRun = false;
        this.attackChargeInProgress = false;
        this.phaseOne = true;
        this.specialAttackAvailable = true;
        this.counter = 800;
        this.counterOne = 2000;
        this.counterTwo = 3000;
        this.dead = false;
        this.pushBack = false;
        this.removeFromWorld = false;

        this.wingsSound = new Audio("./resources/SoundEffects/wingsflapping.ogg");
        this.wingsSound.loop = true;
        this.wingsSound.playbackRate = 2;
        this.wingsSound.volume = 0.2;

        this.fireSound = new Audio("./resources/SoundEffects/fireAttack.ogg");
        this.fireSound.loop = true;
        this.fireSound.playbackRate = 1.0;
        this.fireSound.volume = 0.2;

        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 0, 0, 240, 192, 11, 0.1, true, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 0, 0, 192, 176, 8, 0.1, true, false),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 0, 0, 160, 144, 6, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack.png"), 2640, 0, 240, 192, 11, 0.1, false, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(DUMA + "Attack2.png"), 1536, 0, 192, 176, 8, 0.1, false, false),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(DUMA + "Idle.png"), 960, 0, 160, 144, 6, 0.1, true, true),
        }
        this.currentState = 'LeftIdle'
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
        if (this.currentState === 'LeftIdle') {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 175, 250);
        } else if (this.currentState === 'LeftAttack1') {
            if (this.animations[this.currentState].currentFrame() < 7) { // Wind-up phase
                this.BB = new BoundingBox(this.x + 300 - this.game.camera.x, this.y + 240, 175, 250);
                this.bodyBB = this.BB;
            } else {
                this.BB = new BoundingBox(this.x + 50 - this.game.camera.x, this.y + 325, 300, 200);
                this.bodyBB = new BoundingBox(this.x + 300 - this.game.camera.x, this.y + 240, 175, 250);
            }
        } else if (this.currentState === 'RightAttack1') {
            if (this.animations[this.currentState].currentFrame() < 7) { // Wind-up phase
                this.BB = new BoundingBox(this.x + 200 - this.game.camera.x, this.y + 240, 175, 250);
                this.bodyBB = this.BB;
            } else {
                this.BB = new BoundingBox(this.x + 370 - this.game.camera.x, this.y + 325, 300, 200);
                this.bodyBB = new BoundingBox(this.x + 200 - this.game.camera.x, this.y + 240, 175, 250);
            }
        } else if (this.currentState === 'RightIdle') {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 200 - this.game.camera.x, this.y + 140, 175, 250);
        } else {
            this.bodyBB = null;
            this.BB = new BoundingBox(this.x + 100 - this.game.camera.x, this.y + 140, 175, 250);
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
        console.log(`Duma takes ${amount} damage, remaining health: ${this.hp}`);
    }

    update() {
        if (this.currentState === 'LeftIdle' || this.currentState === 'RightIdle') {
            if (this.wingsSound.paused) {
                this.wingsSound.play();
            }
        } else {
            this.wingsSound.pause();
        }
        this.updateBB();

        if (this.bodyBB) {
            this.fireSound.play();
        } else {
            if (!this.fireSound.paused) {
                this.fireSound.paused;
                this.fireSound.currentTime = 0;
            }
        }

        if (this.animations[this.currentState].getDone()) {
            if (this.currentState === 'LeftAttack1') {
                this.x += 200;
                this.y += 120;
                this.loopCount = 0;
                this.setState('LeftIdle')
            } else if (this.currentState === 'LeftAttack2') {
                this.x += 70;
                this.y += 120;
                this.setState('LeftIdle')
            } else if (this.currentState === 'RightAttack2') {
                this.x += 70;
                this.y += 120;
                this.setState('RightIdle')
            } else if (this.currentState === 'RightAttack1') {
                console.log(true)
                this.x += 20;
                this.y += 120;
                this.loopCount = 0;
                this.setState('RightIdle')
            }
        }

        if (this.currentState === 'LeftAttack1' || this.currentState === 'RightAttack1') {
            let animation = this.animations[this.currentState];

            if (!this.loopCount) this.loopCount = 0; // Initialize loop count

            let frame8Time = animation.frameDuration * 8;
            let frame10Time = animation.frameDuration * 10;
            if (animation.elapsedTime >= frame10Time && this.loopCount < 7) {
                if (animation.currentFrame() === 10) {
                    this.loopCount++; // Increment loop count when frame 10 is reached
                }
                animation.elapsedTime = frame8Time;
            } else if (this.loopCount >= 7 && animation.currentFrame() < 11) {
                animation.elapsedTime += animation.frameDuration;
            }
        }

        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }
        if (this.target.hp <= 0) {
            this.fireSound.volume = 0;
        }


        if (this.goUp) {
            if (this.facingLeft) {
                if (this.x > 470) {
                    this.x -= 200 * this.game.clockTick;
                } else {
                    this.specialAttackX = true;
                }
            } else {
                if (this.x < 370) {
                    this.x += 200 * this.game.clockTick;
                } else {
                    this.specialAttackX = true;
                }
            }
            if (this.y > 75) {
                this.y -= 200 * this.game.clockTick;
            } else {
                this.specialAttackY = true;
            }
        }

        if (this.specialAttackX && this.specialAttackY) {
            this.goUp = false;
        }

        if (this.goDown) {
            if (this.y < 275) {
                this.y += 200 * this.game.clockTick;
                return;
            } else {
                this.goDown = false;
                this.specialAttackRun= false;
                this.specialAttack2Run = false;
            }
        }

        if (this.inCutscene) {
            return;
        }

        if (this.hp <= 0) {
            this.inCutscene = true;
            this.goLeft = false;
            this.goRight = false;
            this.goDown = false;
            this.specialAttack2Run = false;
            this.specialAttackRun = false;
            this.attackChargeRun = false;
            this.goUp = true;
            this.dead = true;
            this.game.camera.bossthreeCutsceneDone = false;
            this.game.camera.cutscene.push({startX: -300, cutsceneNum: 15})
            return;
        }

        if (this.hp <= 3000 && this.attackChargeAvailable && !this.specialAttackRun && !this.specialAttack2Run && !this.goLeft && !this.goRight && !this.pushBack && (this.currentState !== 'LeftAttack2' || this.currentState !== 'RightAttack2')) {
            if (this.facingLeft) {
                this.x -= 70;
                this.y -= 120;
                this.setState('LeftAttack2');
            } else {
                this.x -= 70;
                this.y -= 120;
                this.setState('RightAttack2');
            }
            this.pushBack = true;
        }

        if (!this.specialAttackRun && !this.specialAttack2Run && (this.currentState === 'LeftAttack2' || this.currentState === 'RightAttack2')) {
            if (this.animations[this.currentState].currentFrame() === 6) {
                if (this.facingLeft) {
                    this.target.velocityX = -2500;
                } else {
                    this.target.velocityX = 2500;
                }
            }
            return;
        }

        if (this.hp <= 3000 && this.attackChargeAvailable && !this.specialAttackRun && !this.specialAttack2Run && !this.goLeft && !this.goRight && this.pushBack && (this.currentState !== 'LeftAttack2' || this.currentState !== 'RightAttack2')) {
            this.pushBack = false
            this.attackChargeRun = true;
            if (this.facingLeft) {
                this.goLeft = true;
                this.x -= 200;
                this.y -= 120;
                this.setState('LeftAttack1')
            } else {
                this.goRight = true;
                this.x -= 20;
                this.y -= 120;
                this.setState('RightAttack1')
            }
            this.attackChargeAvailable = false;
            this.counterOne = 0;
        }

        if (this.hp < 1500 && this.specialAttackAvailable  && !this.attackChargeRun && !this.goLeft && !this.goRight && !this.goDown) {
            this.specialAttackAvailable = false;
            this.counterTwo = 0;
            this.offsetDone = false
            this.specialAttackRun = true
        }

        if (this.goLeft) {
            this.facingLeft = true;
            if (this.currentState === 'LeftAttack1') {
                this.leftSide = 0;
            } else {
                this.leftSide = 120;
            }
            if (this.x > this.leftSide) {
                if (this.currentState === 'LeftAttack1') {
                    if (this.animations[this.currentState].currentFrame() > 4) {
                        if (this.attackChargeRun || this.attackChargeInProgress) {
                            this.x -= 500 * this.game.clockTick;
                        } else {
                            this.x -= 300 * this.game.clockTick;
                        }
                    }
                } else {
                    if (this.attackChargeRun || this.attackChargeInProgress) {
                        this.x -= 500 * this.game.clockTick;
                    } else {
                        this.x -= 300 * this.game.clockTick;
                    }
                }
            } else {
                if (this.currentState === 'LeftAttack1') {
                    this.x += 200;
                    this.y += 120;
                    this.loopCount = 0;
                    this.setState('LeftIdle')
                }
                if (this.currentState === 'LeftIdle') {
                    if (this.attackChargeRun) {
                        this.attackChargeRun = false;
                        this.attackChargeInProgress = true;
                        this.goLeft = false;
                        this.goRight = true;
                        this.x -= 20;
                        this.y -= 120;
                        this.setState('RightAttack1')
                    } else {
                        this.attackChargeInProgress = false;
                        this.x -= 60;
                        this.facingLeft = false;
                        this.setState('RightIdle')
                        this.goLeft = false;
                    }
                }
            }
        }

        if (this.goRight) {
            this.facingLeft = false;
            this.RightSide = 700;
            if (this.x < this.RightSide) {
                if (this.currentState === 'RightAttack1') {
                    if (this.animations[this.currentState].currentFrame() > 4) {
                        if (this.attackChargeRun || this.attackChargeInProgress) {
                            this.x += 500 * this.game.clockTick;
                        } else {
                            this.x += 300 * this.game.clockTick;
                        }
                    }
                } else {
                    if (this.attackChargeRun || this.attackChargeInProgress) {
                        this.x += 500 * this.game.clockTick;
                    } else {
                        this.x += 300 * this.game.clockTick;
                    }
                }
            } else {
                if (this.currentState === 'RightAttack1') {
                    this.x += 20;
                    this.y += 120;
                    this.loopCount = 0;
                    this.setState('RightIdle')
                }
                if (this.currentState === 'RightIdle') {
                    if (this.attackChargeRun) {
                        this.attackChargeRun = false
                        this.attackChargeInProgress = true;
                        this.goRight = false;
                        this.goLeft = true;
                        this.x -= 200;
                        this.y -= 120;
                        this.setState('LeftAttack1')
                    } else {
                        this.attackChargeInProgress = false;
                        this.x += 60;
                        this.setState('LeftIdle')
                        this.facingLeft = true;
                        this.goRight = false;
                    }
                }
            }
        }

        if (!this.specialAttackAvailable) {
            if (this.counterTwo < 3000) {
                this.counterTwo += 200 * this.game.clockTick;
            } else {
                this.specialAttackAvailable = true;
            }
        }

        if (!this.attackChargeAvailable) {
            if (this.counterOne < 2000) {
                this.counterOne += 200 * this.game.clockTick;
            } else {
                this.attackChargeAvailable = true;
            }
        }

        if (this.phaseOne && !this.attackChargeRun && !this.specialAttackRun && !this.specialAttack2Run) {
            if (this.counter >= 800) {
                this.counter = 0;
                if (this.currentState === 'LeftIdle') {
                    this.goLeft = true;
                    this.x -= 200;
                    this.y -= 120;
                    this.setState('LeftAttack1')
                }
                if (this.currentState === 'RightIdle') {
                    this.goRight = true;
                    this.x -= 20;
                    this.y -= 120;
                    this.setState('RightAttack1')
                }
            }
            this.counter += 200 * this.game.clockTick;
        }

        if (this.specialAttackRun) {
            if (this.facingLeft) {
                if (this.x > 470) {
                    this.x -= 200 * this.game.clockTick;
                } else {
                    this.specialAttackX = true;
                }
            } else {
                if (this.x < 370) {
                    this.x += 200 * this.game.clockTick;
                } else {
                    this.specialAttackX = true;
                }
            }
            if (this.y > 0) {
                this.y -= 200 * this.game.clockTick;
            } else {
                this.specialAttackY = true;
            }
            if (this.specialAttackX && this.specialAttackY) {
                if (!this.offsetDone ) {
                    if (this.facingLeft) {
                        this.x -= 70;
                        this.y -= 120;
                    } else {
                        this.x -= 70;
                        this.y -= 120;
                    }
                    this.offsetDone = true;
                }
                if (this.facingLeft) {
                    this.setState('LeftAttack2');
                } else {
                    this.setState('RightAttack2')
                }
                if (this.animations[this.currentState].currentFrame() > 4) {
                    this.specialAttackX = false;
                    this.specialAttackY = false;
                    this.offsetDone = false
                    this.specialAttack();
                    if (!(this.hp <= 1000)) {
                        this.goDown = true;
                    }
                }
            }
        }

        if (this.currentState === 'LeftAttack2' || this.currentState === 'RightAttack2') {
            if (this.hp <= 1000 && !this.specialAttack2Run) {
                this.specialAttackX = false;
                this.specialAttackY = false;
                this.specialAttack();
                this.specialAttackRun= false;
                this.specialAttack2Run = true;
                setTimeout(() => {
                    if (this.facingLeft) {
                        this.x -= 70;
                        this.y -= 120;
                        this.setState('LeftAttack2')
                    } else {
                        this.x -= 70;
                        this.y -= 120;
                        this.setState('RightAttack2')
                    }
                }, 2000);
                setTimeout(() => {
                    this.specialAttack2()
                }, 2800);
                setTimeout(() => {
                    this.goDown = true;
                }, 3000);
            }
        }

        if ((this.currentState === 'LeftAttack1' || this.currentState === 'RightAttack1')  && this.animations[this.currentState].currentFrame() > 7) {
            if (this.target.BB && this.BB.collide(this.target.BB)) {
                this.target.takeDamage(50);
            }
        }
    }

    specialAttack() {
        this.fireBomb = new FireBomb(this.game, 0, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 300, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 600, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
        this.fireBomb = new FireBomb(this.game, 900, 425)
        this.game.entities.splice(1, 0, this.fireBomb);
    }

    specialAttack2() {
        this.lightning = new Lightning(this.game, -30, -270, true)
        this.game.entities.splice(this.game.entities.length - 1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 200, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 400, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 600, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 810, 40, true)
        this.game.entities.splice(1, 0, this.lightning);
        this.lightning = new Lightning(this.game, 1000, -270, true)
        this.game.entities.splice(this.game.entities.length - 1, 0, this.lightning);
    }

    draw(ctx) {
        this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 3);
        this.BB.draw(ctx);
        if (this.bodyBB) { this.bodyBB.draw(ctx); }
        if (this.healthBar) { this.healthBar.draw(ctx); }
    };
}