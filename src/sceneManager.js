class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.embers = 0;

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;

        this.loadLevel(shopkeeper, 0, 440, false, true);
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(levelIndex, transition, title, dead) {
        this.dead = false;
        this.title = title;        
        this.level = levels[levelIndex];
        // level = levels[level];
        this.clearEntities();
        this.x = 0;

        this.knight = new Knight(this.game, x, y);
        this.game.addEntity(this.knight);

        if (level.tent) {
            for (let i = 0; i < level.tent.length; i++) {
                let tent = level.tent[i];
                this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
            }
        }

        if (level.dungeonGround) {
            for (let i = 0; i < level.dungeonGround.length; i++) {
                let ground = level.dungeonGround[i];
                this.game.addEntity(new DungeonGround(this.game, ground.x, ground.y, ground.w));
            }
        }

        if (level.reinaIdle) {
            for (let i = 0; i < level.reinaIdle.length; i++) {
                let reinaIdle = level.reinaIdle[i];
                this.game.addEntity(new ReinaIdle(this.game, reinaIdle.x, reinaIdle.y));
            }
        }

        if (level.mechagolem) {
            for (let i = 0; i < level.mechagolem.length; i++) {
                let mechagolem = level.mechagolem[i];
                this.game.addEntity(new MechaGolem(this.game, mechagolem.x, mechagolem.y));
            }
        }

        if (level.azucendaIdle) {
            for (let i = 0; i < level.azucendaIdle.length; i++) {
                let azucendaIdle = level.azucendaIdle[i];
                this.game.addEntity(new AzucendaIdle(this.game, azucendaIdle.x, azucendaIdle.y));
            }
        }

        if (level.boxes) {
            for (let i = 0; i < level.boxes.length; i++) {
                let boxes = level.boxes[i];
                this.game.addEntity(new Boxes(this.game, boxes.x, boxes.y, boxes.h));
            }
        }

        if (level.dungeonGround) {
            for (let i = 0; i < level.dungeonGround.length; i++) {
                let ground = level.dungeonGround[i];
                for (let k = 0; k < ground.w; k++) {
                    this.game.addEntity(new DungeonGround(this.game, ground.x + k, ground.y));
                }
            }
        }

        if (level.dungeonWall) {
            for (let i = 0; i < level.dungeonWall.length; i++) {
                let wall = level.dungeonWall[i];
                for (let k = 0; k < wall.h; k++) {
                    this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y + k));
                }
            }
        }

        if (level.dungeonTorch) {
            for (let i = 0; i < level.dungeonTorch.length; i++) {
                let torch = level.dungeonTorch[i];
                this.game.addEntity(new DungeonTorch(this.game, torch.x, torch.y));
            }
        }

        if (level.swordRack) {
            for (let i = 0; i < level.swordRack.length; i++) {
                let swordRack = level.swordRack[i];
                this.game.addEntity(new SwordRack(this.game, swordRack.x, swordRack.y));
            }
        }

        if (level.dungeonWorkbench) {
            for (let i = 0; i < level.dungeonWorkbench.length; i++) {
                let workbench = level.dungeonWorkbench[i];
                this.game.addEntity(new DungeonWorkbench(this.game, workbench.x, workbench.y));
            }
        }

        if (level.shieldRack) {
            for (let i = 0; i < level.shieldRack.length; i++) {
                let shieldRack = level.shieldRack[i];
                this.game.addEntity(new ShieldRack(this.game, shieldRack.x, shieldRack.y));
            }
        }


        if (level.wallAxe) {
            for (let i = 0; i < level.wallAxe.length; i++) {
                let wallAxe = level.wallAxe[i];
                this.game.addEntity(new WallAxe(this.game, wallAxe.x, wallAxe.y));
            }
        }

        if (level.dungeonAnvil) {
            for (let i = 0; i < level.dungeonAnvil.length; i++) {
                let anvil = level.dungeonAnvil[i];
                this.game.addEntity(new DungeonAnvil(this.game, anvil.x, anvil.y));
            }
        }

        if (level.dungeonDoor) {
            for (let i = 0; i < level.dungeonDoor.length; i++) {
                let door = level.dungeonDoor[i];
                this.game.addEntity(new DungeonDoor
                    (this.game, door.x, door.y, door.h));
            }
        }

        if (level.chandelier) {
            for (let i = 0; i < level.chandelier.length; i++) {
                let chandelier = level.chandelier[i];
                this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
            }
        }

        if (level.dungeonBackground) {
            for (let i = 0; i < level.dungeonBackground.length; i++) {
                let background = level.dungeonBackground[i];
                this.game.addEntity(new DungeonBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }

        if (level.dungeonBackground2) {
            for (let i = 0; i < level.dungeonBackground2.length; i++) {
                let background2 = level.dungeonBackground2[i];
                this.game.addEntity(new DungeonBackground2(this.game, background2.x, background2.y, background2.w, background2.h));
            }
            if (this.level.dungeonGround2) {
                for (let i = 0; i < this.level.dungeonGround2.length; i++) {
                    let ground2 = this.level.dungeonGround2[i];
                    this.game.addEntity(new DungeonGround2(this.game, ground2.x, ground2.y, ground2.w, ground2.h));
                }
            }

            if (this.level.dungeonWall2) {
                for (let i = 0; i < this.level.dungeonWall2.length; i++) {
                    let wall2 = this.level.dungeonWall2[i];
                    this.game.addEntity(new DungeonWall2(this.game, wall2.x, wall2.y, wall2.h));
                }
            }

            if (this.level.dungeonDoor2) {
                for (let i = 0; i < this.level.dungeonDoor2.length; i++) {
                    let door2 = this.level.dungeonDoor2[i];
                    this.game.addEntity(new DungeonDoor2(this.game, door2.x, door2.y, door2.level));
                }
            }
            if (this.level.dungeonWaterfall) {
                for(let i = 0; i < this.level.dungeonWaterfall.length; i++) {
                    let waterfall = this.level.dungeonWaterfall[i];
                    this.game.addEntity(new DungeonWaterfall(this.game, waterfall.x, waterfall.y));
                }
            }

            if (this.level.dungeonBackground3) {
                for (let i = 0; i < this.level.dungeonBackground3.length; i++) {
                    let background3 = this.level.dungeonBackground3[i];
                    this.game.addEntity(new DungeonBackground3(this.game, background3.x, background3.y, background3.w, background3.h));
                }
            }

           

        }
        
    };

    update() {

        let middlepoint = PARAMS.SCREENWIDTH / 2 - 50;
        this.x = this.knight.x - middlepoint;
        //if (this.x < this.knight.x - midpoint) this.x = this.knight.x - midpoint;

        if (this.level == shopkeeper && this.knight.x > 0 && this.knight.x < 100 && this.game.keys["f"]) {
            this.loadLevel(one, 85, 440, false, false);
            this.game.update();
        }
    };

    draw(ctx) {
        // Save the current context state
        ctx.save();
        
        // Reset any potential transformations

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.font = '24px "Open+Sans"';
        ctx.fillStyle = "White";
        ctx.fillText("Health Bar", 200, 80);
        const boxX = 200; 
        const boxY = 90; 
        const boxWidth = 300; 
        const boxHeight = 40;
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillText("0", 200, 165);
        ctx.fillText("1000", 450, 165);
        const health = this.knight.hp;
        const fillWidth = boxWidth * health/1000;
        ctx.fillStyle = "Green";
        ctx.fillRect(boxX, boxY, fillWidth, boxHeight);
        if (fillWidth < boxWidth) {
            ctx.fillStyle = "Black";
            ctx.fillRect(boxX + fillWidth, boxY, boxWidth - fillWidth, boxHeight);
        }
        ctx.fillStyle = "White";
        ctx.font = '36px "Open+Sans"';
        ctx.fillText("Ember", 590, 80);
        ctx.fillText(this.knight.emberCount, 600, 120);
        const emberImage = ASSET_MANAGER.getAsset("./resources/dungeon.png"); 
        ctx.drawImage(emberImage, 1520, 2328, 8, 16, 550, 60, 40, 80);
    }; 
};