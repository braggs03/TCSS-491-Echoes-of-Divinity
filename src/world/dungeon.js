const VOID_HEIGHT = 5000;

const DUNEGON_GROUND_WIDTH = 31;
const DUNEGON_GROUND_HEIGHT = 8;

class DungeonGround {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * w * this.scale, DUNEGON_GROUND_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * this.w * this.scale, DUNEGON_GROUND_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(this.spritesheet, 200, 1432, DUNEGON_GROUND_WIDTH, DUNEGON_GROUND_HEIGHT, this.x * DUNEGON_GROUND_WIDTH * this.scale + k * DUNEGON_GROUND_WIDTH * this.scale - this.game.camera.x, this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * this.scale, DUNEGON_GROUND_HEIGHT * this.scale);
            }
        }
        this.BB.draw(ctx);
    };
};

const DUNEGON_WALL_WIDTH = 8;
const DUNEGON_WALL_HEIGHT = 31;

class DungeonWall {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_WALL_WIDTH * this.scale - this.game.camera.x,  this.y - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.h * this.scale);

    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_WALL_WIDTH * this.scale - this.game.camera.x,  this.y - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            ctx.drawImage(this.spritesheet, 232, 1400, DUNEGON_WALL_WIDTH, DUNEGON_BACKGROUND_HEIGHT, this.x * DUNEGON_WALL_WIDTH * this.scale - this.game.camera.x, this.y + l * DUNEGON_WALL_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL_WIDTH * this.scale, DUNEGON_WALL_HEIGHT * this.scale);
        }
        this.BB.draw(ctx);
    };
};

const DUNEGON_BACKGROUND_WIDTH = 31;
const DUNEGON_BACKGROUND_HEIGHT = 31;

class DungeonBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 808, 968, DUNEGON_BACKGROUND_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x + i * DUNEGON_BACKGROUND_WIDTH * this.scale) - this.game.camera.x, this.y + k * DUNEGON_BACKGROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND_WIDTH * this.scale, DUNEGON_BACKGROUND_HEIGHT * this.scale);
            }
        }
        // if (PARAMS.DEBUG) {
        //     ctx.strokeStyle = 'Red';
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        // }
    };
};

const DUNEGON_DOOR_WIDTH = 47;
const DUNEGON_DOOR_HEIGHT = 39;

class DungeonDoor {
    constructor(game, x, y, level, end) {
        Object.assign(this, { game, x, y, level, end });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5.5;
        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, DUNEGON_DOOR_WIDTH * 2.2, DUNEGON_DOOR_HEIGHT * 4.3);
        this.fReleased = false;
        this.end = end;
    };

    update() {

        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, DUNEGON_DOOR_WIDTH * 2.2, DUNEGON_DOOR_HEIGHT * 4.3);

        const that = this;
        if (this.game.keys["f"]) {
            this.game.entities.forEach((entity) => {
                if (this.fReleased && entity.BB && that.BB.collide(entity.BB) && entity instanceof Knight) {
                    this.game.camera.doormove = true;
                    that.game.camera.loadLevel(that.level, true, false, false, this.end);
                }
            });
        } else {
            this.fReleased = true;
        }
    };


    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1840, 1904, DUNEGON_DOOR_WIDTH, DUNEGON_DOOR_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNEGON_DOOR_WIDTH * this.scale, DUNEGON_DOOR_HEIGHT * this.scale);
        this.BB.draw(ctx);
    };
};

const DUNEGON_TORCH_WIDTH = 20;
const DUNEGON_TORCH_HEIGHT = 39;

class DungeonTorch {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.animator = this.torch();
        this.scale = 5.5;
    };

    update() {
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 4);
    }

    torch() {
        return new Animator(ASSET_MANAGER.getAsset(TORCH), 0, 0, 21, 27, 4, 0.1, false, true);
    }
};


const DUNEGON_BACKGROUND2_WIDTH = 896;
const DUNEGON_BACKGROUND2_HEIGHT = 450;

class DungeonBackground2 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON_BACKGROUND_IMAGE);
        this.animator = this.background();
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                this.animator.drawFrame(this.game.clockTick, ctx, this.x + i * DUNEGON_BACKGROUND2_WIDTH * this.scale - this.game.camera.x, this.y * DUNEGON_BACKGROUND2_HEIGHT * this.scale - this.game.camera.y - 3500 , 5);
                // ctx.drawImage(this.spritesheet, 0, 0, DUNEGON_BACKGROUND2_WIDTH, DUNEGON_BACKGROUND2_HEIGHT, (this.x + i * DUNEGON_BACKGROUND2_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_BACKGROUND2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND2_WIDTH * this.scale, DUNEGON_BACKGROUND2_HEIGHT * this.scale);
            }
        }
        // this.animator.drawFrame(this.game.clockTick, ctx, this.x + i * DUNEGON_BACKGROUND2_WIDTH * this.scale - this.game.camera.x, this.y * DUNEGON_BACKGROUND2_HEIGHT * this.scale - this.game.camera.y, 5);
    };

    background() {
        return new Animator(ASSET_MANAGER.getAsset(DUNGEON_BACKGROUND_IMAGE), 0, 0, 896, 840, 4, 6, false, true);
    }
};

const DUNGEON_SPIKE_WIDTH = 56;
const DUNGEON_SPIKE_HEIGHT = 56;
class DungeonSpike {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.damage = 50;
        this.scale = 3;
        this.BB = new BoundingBox(
            this.x - this.game.camera.x,
            this.y - this.game.camera.y + (DUNGEON_SPIKE_HEIGHT * this.scale * 3/4), // Position at bottom quarter
            DUNGEON_SPIKE_WIDTH * this.scale,
            DUNGEON_SPIKE_HEIGHT * this.scale / 4 // Quarter height
        );
    };

    update() {
        this.BB = new BoundingBox(
            this.x - this.game.camera.x,
            this.y - this.game.camera.y + (DUNGEON_SPIKE_HEIGHT * this.scale * 3/4),
            DUNGEON_SPIKE_WIDTH * this.scale,
            DUNGEON_SPIKE_HEIGHT * this.scale / 4
        );
    };

    draw(ctx) {
        ctx.drawImage(
            this.spritesheet,
            912, 703,
            DUNGEON_SPIKE_WIDTH,
            DUNGEON_SPIKE_HEIGHT,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            DUNGEON_SPIKE_WIDTH * this.scale,
            DUNGEON_SPIKE_HEIGHT * this.scale
        );
        this.BB.draw(ctx);
    };
};

const BONFIRE_WIDTH = 56;
const BONFIRE_HEIGHT = 56;

class Bonfire {
    constructor(game, self) {
        Object.assign(this, { game, self });
        this.x = this.self.x;
        this.y = this.self.y;
        this.discovered = this.self.discovered ? this.self.discovered : false;
        this.isCurrent = this.self.isCurrent ? this.self.isCurrent : false; 
        this.level = this.self.level;
        this.sound = new Audio("./resources/SoundEffects/emberLight.ogg");
        this.sound.loop = true;
        this.sound.volume = 0.2;
        if (this.game.camera.knight) {
            this.knight = this.game.camera.knight;
        }
        this.animator1 = this.bonfireAnimationLit();
        this.animator2 = this.bonfireAnimationUnlit();
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
        this.BB = new BoundingBox(this.x - this.game.camera.x,  this.y - this.game.camera.y, BONFIRE_WIDTH * this.scale, BONFIRE_HEIGHT * this.scale);
        this.fReleased = false;
    };

    save() {
        this.self.discovered = this.discovered;
        this.self.isCurrent = this.isCurrent;
    }

    update() {
        if (this.discovered) {
            if (!this.game.entities.includes(this)) {
                this.sound.pause();
            } else {
                if (this.sound.paused) {
                    this.sound.play();
                }
                this.sound.volume = Math.max (0, 0.2 - Math.abs(this.x - this.knight.x) / 5000);
            }
        }

        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, BONFIRE_HEIGHT * 2.2, BONFIRE_HEIGHT * 4.3);

        if (!this.discovered && this.game.keys["f"] && !this.keypressed) {
            this.game.entities.forEach((entity) => {
                if (entity.BB && this.BB.collide(entity.BB) && entity instanceof Knight) {
                    this.activateCheckpoint();
                    if (this.sound.paused) {
                        this.sound.play();
                    }
                    this.keypressed = true;
                }
            });
        } else {
            this.fReleased = true;
        }

        if (this.game.keys["f"] && !this.keypressed) {
            this.game.entities.forEach((entity) => {
                if (entity.BB && this.BB.collide(entity.BB) && entity instanceof Knight) {
                    this.game.camera.openCheckpointMenu(this);
                    this.keypressed = true;
                }
            });
        }

        if (!this.game.keys["f"]) {
            this.keypressed = false;
        }
    }

    bonfireAnimationLit() {
        return new Animator(ASSET_MANAGER.getAsset(DUNGEON), 2236, 775, 64, 56, 6, 0.1, false, true);
    }

    bonfireAnimationUnlit() {
        this.sound.pause();
        return new Animator(ASSET_MANAGER.getAsset(DUNGEON), 2620, 775, 64, 56, 1, 0.1, false, true);
    }


    activateCheckpoint() {
        this.discovered = true;
        this.isCurrent = true;
        this.game.camera.currentCheckpoint = this;

        //This is for the checkpoint to be passed into Scenemanager/loadLevel
        if (!this.game.camera.discoveredCheckpoints.some(cp => cp.level === this.level)) {
            this.game.camera.discoveredCheckpoints.push(this);
        }

        //This is for the checkpoint data to be passed into checkpointmenu
        if (!this.game.camera.discoveredCheckpointsLevel.some(cp => cp.x === this.x && cp.y === this.y && cp.level === this.level)) {
            this.game.camera.discoveredCheckpointsLevel.push({
                x: this.x,
                y: this.y,
                level: this.level
            });
        }

        // console.log("checkpointlevel",this.game.camera.discoveredCheckpointsLevel)

        console.log(`Checkpoint activated at (${this.x}, ${this.y}) in level: ${this.level}`)
    }


    draw(ctx) {
        if(this.discovered){
            this.animator1.drawFrame(this.game.clockTick, ctx, this.x + 50 - this.game.camera.x, this.y + 40 - this.game.camera.y, this.scale);
        } else {
            this.animator2.drawFrame(this.game.clockTick, ctx, this.x + 50 - this.game.camera.x, this.y + 40 - this.game.camera.y, this.scale);
        }
        // ctx.drawImage(this.spritesheet, 2240, 776, BONFIRE_WIDTH, BONFIRE_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, BONFIRE_WIDTH * this.scale, BONFIRE_HEIGHT * this.scale);
        this.BB.draw(ctx);
    };
};

const MENU_BACKGROUND_WIDTH = 640;
const MENU_BACKGROUND_HEIGHT = 320;

class menuBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(MENU_BACKGROUND);
        this.scale = 2.24;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, MENU_BACKGROUND_WIDTH, MENU_BACKGROUND_HEIGHT, (this.x + i * MENU_BACKGROUND_WIDTH * this.scale), this.y * MENU_BACKGROUND_HEIGHT * this.scale, MENU_BACKGROUND_WIDTH * this.scale, MENU_BACKGROUND_HEIGHT * this.scale);
            }
        }
    };
}

const TUTORIAL_BACKGROUND_WIDTH = 640;
const TUTORIAL_BACKGROUND_HEIGHT = 320;

class tutorialBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset('./resources/NightSky.png');
        this.scale = 2.24;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, TUTORIAL_BACKGROUND_WIDTH, TUTORIAL_BACKGROUND_HEIGHT, (this.x + i * TUTORIAL_BACKGROUND_WIDTH * this.scale), this.y * TUTORIAL_BACKGROUND_HEIGHT * this.scale, TUTORIAL_BACKGROUND_WIDTH * this.scale, TUTORIAL_BACKGROUND_HEIGHT * this.scale);
            }
        }
    };
}

const TOWN_BACKGROUND_WIDTH = 640;
const TOWN_BACKGROUND_HEIGHT = 320;

class townBackground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset('./resources/town.png');
        this.scale = 2.24;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, TOWN_BACKGROUND_WIDTH, TOWN_BACKGROUND_HEIGHT, (this.x + i * TOWN_BACKGROUND_WIDTH * this.scale), this.y * TOWN_BACKGROUND_HEIGHT * this.scale, TOWN_BACKGROUND_WIDTH * this.scale, TOWN_BACKGROUND_HEIGHT * this.scale);
            }
        }
    };
}

const DUNEGON_GROUND2_WIDTH = 31;
const DUNEGON_GROUND2_HEIGHT = 8;

class DungeonGround2 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND2_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND2_WIDTH * w * this.scale, DUNEGON_GROUND2_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_GROUND2_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_GROUND2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND2_WIDTH * this.w * this.scale, DUNEGON_GROUND2_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(this.spritesheet, 2304, 640, DUNEGON_GROUND2_WIDTH, DUNEGON_GROUND2_HEIGHT, this.x * DUNEGON_GROUND2_WIDTH * this.scale + (k * DUNEGON_GROUND2_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_GROUND2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND2_WIDTH * this.scale, DUNEGON_GROUND2_HEIGHT * this.scale);
            }
        }
        this.BB.draw(ctx);
    };
};

const DUNEGON_WALL2_WIDTH = 8;
const DUNEGON_WALL2_HEIGHT = 31;

class DungeonWall2 {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_WALL2_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL2_WIDTH * this.scale, DUNEGON_WALL2_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_WALL2_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL2_WIDTH * this.scale, DUNEGON_WALL2_HEIGHT * this.h * this.scale);
    };
    
    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            ctx.drawImage(this.spritesheet, 329, 1400, DUNEGON_WALL2_WIDTH, DUNEGON_WALL2_HEIGHT, (this.x * DUNEGON_WALL2_WIDTH * this.scale) - this.game.camera.x, this.y + l * DUNEGON_WALL2_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL2_WIDTH * this.scale, DUNEGON_WALL2_HEIGHT * this.scale);
        }
        this.BB.draw(ctx);
    };
};



const DUNEGON_BACKGROUND3_WIDTH = 896;
const DUNEGON_BACKGROUND3_HEIGHT = 144;

class DungeonBackground3 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON_BACKGROUND);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, DUNEGON_BACKGROUND3_WIDTH, DUNEGON_BACKGROUND3_HEIGHT, (this.x + i * DUNEGON_BACKGROUND3_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_BACKGROUND3_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND3_WIDTH * this.scale, DUNEGON_BACKGROUND3_HEIGHT * this.scale);
            }
        }
    };
};

const DUNGEON_WATERFALL_WIDTH = 32;
const DUNGEON_WATERFALL_HEIGHT = 104;
class DungeonWaterfall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.animator = this.waterfall();
        this.scale = 3;
    };

    update() {
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 4);
    }

    waterfall() {
        return new Animator(ASSET_MANAGER.getAsset(WATERFALL), 0, 0, 32, 104, 9, 0.1, false, true);
    }
};

const DUNGEON_STATUE_WIDTH = 70;
const DUNGEON_STATUE_HEIGHT = 70;
class DungeonStatue {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 6.8;
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1328, 1936, DUNGEON_STATUE_WIDTH, DUNGEON_STATUE_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_STATUE_WIDTH * this.scale, DUNGEON_STATUE_HEIGHT * this.scale);
    }
};

const EMBER_DROP_WIDTH = 67;
const EMBER_DROP_HEIGHT = 67;

class EmberDrop {
    constructor(game, x, y, emberCount, levelIndex) {
        Object.assign(this, { game, x, y, emberCount, levelIndex });
        this.animator = this.emberDrop();
        this.scale = 5.5;
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, EMBER_DROP_WIDTH, EMBER_DROP_HEIGHT);
    };

    update() {
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, EMBER_DROP_WIDTH, EMBER_DROP_HEIGHT);
        if (this.game.camera.knight.BB.collide(this.BB) && this.game.keys["f"]) {
            this.game.camera.knight.emberCount += this.emberCount;
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 4);
        this.BB.draw(ctx);
    };

    emberDrop() {
        return new Animator(
            ASSET_MANAGER.getAsset(EMBER), 
            0, 96,        // Starting x, y position in spritesheet
            16, 16,       // Width and height of each frame
            5,            // Number of frames
            0.2,          // Frame duration
            0,            // Padding
            true          // Loop
        );
    };
};

const MOVING_PLATFORMS_WIDTH = 31;
const MOVING_PLATFORMS_HEIGHT = 8;

class MovingPlatform {
    constructor(game, x, y, w, h, endX, endY, isVertical) {
        Object.assign(this, { game, x, y, w, h, endX, endY, isVertical});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 4;

        this.x = x * MOVING_PLATFORMS_WIDTH * this.scale;
        this.y = y * MOVING_PLATFORMS_HEIGHT * this.scale;
        this.startX = x * MOVING_PLATFORMS_WIDTH * this.scale;
        this.startY = y * MOVING_PLATFORMS_HEIGHT * this.scale;
        this.endX = endX * MOVING_PLATFORMS_WIDTH * this.scale;
        this.endY = endY * MOVING_PLATFORMS_HEIGHT * this.scale;
        this.direction = 1; // 1 for forward, -1 for reverse

        this.velocityX; // Initialize horizontal velocity
        this.velocityY; // Initialize vertical velocity
        
        this.BB = new BoundingBox(this.x * MOVING_PLATFORMS_WIDTH * this.scale - this.game.camera.x,  this.y * MOVING_PLATFORMS_HEIGHT * this.scale - this.game.camera.y, MOVING_PLATFORMS_WIDTH * w * this.scale, MOVING_PLATFORMS_HEIGHT * h * this.scale);
    };

    update() {
        if (this.isVertical) { //Vertical
            this.speed = 400;
            this.y += this.speed * this.direction * this.game.clockTick;
            this.velocityY = this.speed * this.direction * this.game.clockTick;
            if ((this.direction === 1 && this.y >= this.startY) || (this.direction === -1 && this.y <= this.endY)) {
                this.direction *= -1;
            }
        } else { //Horizxontal
            this.speed = 400;
            this.x += this.speed * this.direction * this.game.clockTick;
            this.velocityX = this.speed * this.direction * this.game.clockTick;

            if ((this.direction === 1 && this.x >= this.endX) || (this.direction === -1 && this.x <= this.startX)) {
                this.direction *= -1;
            }
        }

        this.BB = new BoundingBox(this.x - this.game.camera.x,  this.y - this.game.camera.y, MOVING_PLATFORMS_WIDTH * this.w * this.scale, MOVING_PLATFORMS_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(this.spritesheet, 127, 1216, MOVING_PLATFORMS_WIDTH, MOVING_PLATFORMS_HEIGHT, this.x + k * MOVING_PLATFORMS_WIDTH * this.scale - this.game.camera.x, this.y - this.game.camera.y, MOVING_PLATFORMS_WIDTH * this.scale, MOVING_PLATFORMS_HEIGHT * this.scale);
            }
        }
        this.BB.draw(ctx);
    };

}

const DUNEGON_BACKGROUND4_WIDTH = 896;
const DUNEGON_BACKGROUND4_HEIGHT = 144;

class DungeonBackground4 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON_BACKGROUNDL4);
        this.scale = 5;
    };

    update() {
    };

    draw(ctx) {
        for (let k = 0; k < this.h; k++) {
            for (let i = 0; i < this.w; i++) {
                ctx.drawImage(this.spritesheet, 0, 0, DUNEGON_BACKGROUND4_WIDTH, DUNEGON_BACKGROUND4_HEIGHT, (this.x + i * DUNEGON_BACKGROUND4_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_BACKGROUND4_HEIGHT * this.scale - this.game.camera.y, DUNEGON_BACKGROUND4_WIDTH * this.scale, DUNEGON_BACKGROUND4_HEIGHT * this.scale);
            }
        }
    };
};

const DUNEGON_GROUND4_WIDTH = 32;
const DUNEGON_GROUND4_HEIGHT = 8;

class DungeonGround4 {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(
            this.x * DUNEGON_GROUND4_WIDTH * this.scale - this.game.camera.x,  
            this.y * DUNEGON_GROUND4_HEIGHT * this.scale - this.game.camera.y, 
            DUNEGON_GROUND4_WIDTH * w * this.scale, 
            DUNEGON_GROUND4_HEIGHT * h * this.scale
        );
    };

    update() {
        this.BB = new BoundingBox(
            this.x * DUNEGON_GROUND4_WIDTH * this.scale - this.game.camera.x,  
            this.y * DUNEGON_GROUND4_HEIGHT * this.scale - this.game.camera.y, 
            DUNEGON_GROUND4_WIDTH * this.w * this.scale, 
            DUNEGON_GROUND4_HEIGHT * this.h * this.scale
        );
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(
                    this.spritesheet, 
                    104, 1432,  // Sprite coordinates from your earlier description
                    DUNEGON_GROUND4_WIDTH, 
                    DUNEGON_GROUND4_HEIGHT, 
                    this.x * DUNEGON_GROUND4_WIDTH * this.scale + (k * DUNEGON_GROUND4_WIDTH * this.scale) - this.game.camera.x, 
                    this.y * DUNEGON_GROUND4_HEIGHT * this.scale - this.game.camera.y, 
                    DUNEGON_GROUND4_WIDTH * this.scale, 
                    DUNEGON_GROUND4_HEIGHT * this.scale
                );
            }
        }
        this.BB.draw(ctx);
    };
};

const DUNGEON_PILLAR_WIDTH = 90;
const DUNGEON_PILLAR_HEIGHT = 75;
class DungeonPillar {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 8;
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1238, 2359, DUNGEON_PILLAR_WIDTH, DUNGEON_PILLAR_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_PILLAR_WIDTH * this.scale, DUNGEON_PILLAR_HEIGHT * this.scale);
    }
};
const DUNGEON_EAGLE_WIDTH = 44;
const DUNGEON_EAGLE_HEIGHT = 32;
class DungeonEagle {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 4.5;
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 998, 2481, DUNGEON_EAGLE_WIDTH, DUNGEON_EAGLE_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_EAGLE_WIDTH * this.scale, DUNGEON_EAGLE_HEIGHT * this.scale);
    }
};
const DUNGEON_EAGLE2_WIDTH = 44;
const DUNGEON_EAGLE2_HEIGHT = 32;
class DungeonEagle2 {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 5;
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1056, 2483, DUNGEON_EAGLE2_WIDTH, DUNGEON_EAGLE2_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_EAGLE2_WIDTH * this.scale, DUNGEON_EAGLE2_HEIGHT * this.scale);
    }
};
const DUNGEON_WIZARD_WIDTH = 28;
const DUNGEON_WIZARD_HEIGHT = 48;
class DungeonWizard {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.scale = 5;
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1135, 2464, DUNGEON_WIZARD_WIDTH, DUNGEON_WIZARD_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_WIZARD_WIDTH * this.scale, DUNGEON_WIZARD_HEIGHT * this.scale);
    }
};
const DUNGEON_DOOR2_WIDTH = 44;
const DUNGEON_DOOR2_HEIGHT = 42;

class DungeonDoor2 {
    constructor(game, x, y, level, end) {
        Object.assign(this, { game, x, y, level, end });

        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5.5;
        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, DUNGEON_DOOR2_WIDTH * 2.2, DUNGEON_DOOR2_HEIGHT * 4.3);
        this.fReleased = false;
        this.end = end;
    };

    update() {

        this.BB = new BoundingBox(this.x + 81 - this.game.camera.x,  this.y + 50 - this.game.camera.y, DUNGEON_DOOR2_WIDTH * 2.2, DUNGEON_DOOR2_HEIGHT * 4.3);

        const that = this;
        if (this.game.keys["f"]) {
            this.game.entities.forEach((entity) => {
                if (this.fReleased && entity.BB && that.BB.collide(entity.BB) && entity instanceof Knight) {
                    that.game.camera.loadLevel(that.level, true, false, false, this.end);
                }
            });
        } else {
            this.fReleased = true;
        }
    };


    draw(ctx) {
        ctx.drawImage(this.spritesheet, 1078, 2310, DUNGEON_DOOR2_WIDTH, DUNGEON_DOOR2_HEIGHT, this.x - this.game.camera.x, this.y - this.game.camera.y, DUNGEON_DOOR2_WIDTH * this.scale, DUNGEON_DOOR2_HEIGHT * this.scale);
        this.BB.draw(ctx);
    };
};

const DUNEGON_LANTERN_WIDTH = 20;
const DUNEGON_LANTERN_HEIGHT = 39;

class DungeonLantern {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.animator = this.lantern();
        this.scale = 5.5;
    };

    update() {
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 4);
    }

    lantern() {
        return new Animator(ASSET_MANAGER.getAsset(LANTERN), 0, 0, 10, 28, 3, 0.1, false, true);
    }
};
class FireBomb2 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.target = null;
        this.removeFromWorld = false;
        this.damageDone = false;
        this.bombTimer = 0;
        this.bombInterval = 2; 

        this.BB = new BoundingBox(
            this.x - this.game.camera.x + 30, 
            this.y - this.game.camera.y + 50, 
            270, 
            200
        );
        this.animator = new Animator(
            ASSET_MANAGER.getAsset("./resources/Magic/Fire-bomb.png"), 
            0, 0, 64, 64, 14, 0.075, false, false
        );


    }

    update() {
       
        this.BB = new BoundingBox(
            this.x - this.game.camera.x + 30, 
            this.y - this.game.camera.y + 50, 
            270, 
            200
        );

        this.bombTimer += this.game.clockTick;

        if (this.animator.getDone()) {
            if (this.bombTimer >= this.bombInterval) {
                this.animator.reset();
                this.damageDone = false;
                this.bombTimer = 0;
            }
        }

        if (!this.target) {
            this.target = this.game.entities.find(entity =>
                entity instanceof Knight && !entity.dead
            );
        }

        
        if (this.animator.currentFrame() > 8) {
            if (this.target && this.target.BB) {

                if (this.BB.collide(this.target.BB)) {
                    if (!this.damageDone) {
                        
                        this.target.takeDamage(100);
                        this.damageDone = true;
                    }
                } else {
                    
                }
            }
        }
    }

    draw(ctx) {
        
        if (!this.animator.getDone() || this.bombTimer < this.bombInterval) {
            this.animator.drawFrame(
                this.game.clockTick, 
                ctx, 
                this.x - this.game.camera.x, 
                this.y - this.game.camera.y, 
                5
            );
            this.BB.draw(ctx);
        }
    }
}
const DUNGEON_BRIDGE_WIDTH = 50;
const DUNGEON_BRIDGE_HEIGHT = 34;
class DungeonBridge {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 3;
        this.BB = new BoundingBox(
            this.x - this.game.camera.x,
            this.y - this.game.camera.y + (DUNGEON_BRIDGE_HEIGHT * this.scale * 3/4), // Position at bottom quarter
            DUNGEON_BRIDGE_WIDTH * this.scale,
            DUNGEON_BRIDGE_HEIGHT * this.scale / 4 // Quarter height
        );
    };

    update() {
        this.BB = new BoundingBox(
            this.x - this.game.camera.x,
            this.y - this.game.camera.y + (DUNGEON_BRIDGE_HEIGHT * this.scale * 3/4),
            DUNGEON_BRIDGE_WIDTH * this.scale,
            DUNGEON_BRIDGE_HEIGHT * this.scale / 4
        );
    };

    draw(ctx) {
        ctx.drawImage(
            this.spritesheet,
            655, 1215,
            DUNGEON_BRIDGE_WIDTH,
            DUNGEON_BRIDGE_HEIGHT,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            DUNGEON_BRIDGE_WIDTH * this.scale,
            DUNGEON_BRIDGE_HEIGHT * this.scale
        );
        this.BB.draw(ctx);
    };
};

const DUNEGON_WALL1_WIDTH = 8;
const DUNEGON_WALL1_HEIGHT = 31;

class DungeonWall1 {
    constructor(game, x, y, h) {
        Object.assign(this, { game, x, y, h });
        this.spritesheet = ASSET_MANAGER.getAsset(DUNGEON);
        this.scale = 5;
        this.BB = new BoundingBox(this.x * DUNEGON_WALL1_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL1_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL1_WIDTH * this.scale, DUNEGON_WALL1_HEIGHT * h * this.scale);
    };

    update() {
        this.BB = new BoundingBox(this.x * DUNEGON_WALL1_WIDTH * this.scale - this.game.camera.x,  this.y * DUNEGON_WALL1_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL1_WIDTH * this.scale, DUNEGON_WALL1_HEIGHT * this.h * this.scale);
    };

    draw(ctx) {
        for (let l = 0; l < this.h; l++) {
            ctx.drawImage(this.spritesheet, 136, 1400, DUNEGON_WALL1_WIDTH, DUNEGON_BACKGROUND_HEIGHT, (this.x * DUNEGON_WALL1_WIDTH * this.scale) - this.game.camera.x, this.y + l * DUNEGON_WALL1_HEIGHT * this.scale - this.game.camera.y, DUNEGON_WALL1_WIDTH * this.scale, DUNEGON_WALL1_HEIGHT * this.scale);
        }
        this.BB.draw(ctx);
    };
};

const LOSTSWORD_WIDTH = 32;
const LOSTSWORD_HEIGHT = 32;

class LostSword {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.animator = this.lostsword();
        this.scale = 3;
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, LOSTSWORD_WIDTH, LOSTSWORD_HEIGHT);
    };

    update() {
        this.BB = new BoundingBox(this.x - this.game.camera.x , this.y - this.game.camera.y, LOSTSWORD_WIDTH * this.scale, LOSTSWORD_HEIGHT * this.scale);
        if (this.game.camera.knight.BB.collide(this.BB)) {
            this.game.camera.knight.hasWaveAttack = true;
            this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        this.BB.draw(ctx);
    };

    lostsword() {
        return new Animator(
            ASSET_MANAGER.getAsset("./resources/knight/lostsword.png"), 
            0, 0,        // Starting x, y position in spritesheet
            32, 32,       // Width and height of each frame
            8,            // Number of frames
            0.2,          // Frame duration
            0,            // Padding
            true          // Loop
        );
    }
}
