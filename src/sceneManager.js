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

        this.knight = new Knight(this.game, this.x, this.y);

        this.loadLevel("shopkeeper", false, true);
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

        this.knight = new Knight(this.game, this.level.knightPos.x, this.level.knightPos.y);
        this.game.addEntity(this.knight);
        
        this.game.ctx.fillRect(50, 50, 100, 100);
        if(transition) {
            // console.log(this.level)
            // console.log(this.level.knightPos)
            this.game.addEntity(new TransitionScreen(this.game, levelIndex, dead))
        } else {
            if  (this.level.black) {
                for (let i = 0; i < this.level.tent.length; i++) {
                    ctx.fillRect(50, 50, 100, 100);
                }
            }
            if  (this.level.potion) {
                for (let i = 0; i < this.level.potion.length; i++) {
                    let potion = this.level.potion[i];
                    this.game.addEntity(new Potion(this.game, potion.x, potion.y));
                }
            }
            if  (this.level.tent) {
                for (let i = 0; i < this.level.tent.length; i++) {
                    let tent = this.level.tent[i];
                    this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
                }
            }

            if  (this.level.reinaIdle) {
                for (let i = 0; i < this.level.reinaIdle.length; i++) {
                    let reinaIdle = this.level.reinaIdle[i];
                    this.game.addEntity(new ReinaIdle(this.game, reinaIdle.x, reinaIdle.y));
                }
            }

            if  (this.level.mechagolem) {
                for (let i = 0; i < this.level.mechagolem.length; i++) {
                    let mechagolem = this.level.mechagolem[i];
                    this.game.addEntity(new MechaGolem(this.game, mechagolem.x, mechagolem.y));
                }
            }

            if  (this.level.azucendaIdle) {
                for (let i = 0; i < this.level.azucendaIdle.length; i++) {
                    let azucendaIdle = this.level.azucendaIdle[i];
                    this.game.addEntity(new AzucendaIdle(this.game, azucendaIdle.x, azucendaIdle.y));
                }
            }

            if  (this.level.boxes) {
                for (let i = 0; i < this.level.boxes.length; i++) {
                    let boxes = this.level.boxes[i];
                    this.game.addEntity(new Boxes(this.game, boxes.x, boxes.y, boxes.h));
                }
            }

            if  (this.level.dungeonGround) {
                for (let i = 0; i < this.level.dungeonGround.length; i++) {
                    let ground = this.level.dungeonGround[i];
                    this.game.addEntity(new DungeonGround(this.game, ground.x, ground.y, ground.w, ground.h));
                }
            }

            if  (this.level.dungeonWall) {
                for (let i = 0; i < this.level.dungeonWall.length; i++) {
                    let wall = this.level.dungeonWall[i];
                    this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y, wall.h));
                }
            }

            if  (this.level.dungeonTorch) {
                for (let i = 0; i < this.level.dungeonTorch.length; i++) {
                    let torch = this.level.dungeonTorch[i];
                    this.game.addEntity(new DungeonTorch(this.game, torch.x, torch.y));
                }
            }

            if  (this.level.swordRack) {
                for (let i = 0; i < this.level.swordRack.length; i++) {
                    let swordRack = this.level.swordRack[i];
                    this.game.addEntity(new SwordRack(this.game, swordRack.x, swordRack.y));
                }
            }

            if  (this.level.dungeonWorkbench) {
                for (let i = 0; i < this.level.dungeonWorkbench.length; i++) {
                    let workbench = this.level.dungeonWorkbench[i];
                    this.game.addEntity(new DungeonWorkbench(this.game, workbench.x, workbench.y));
                }
            }

            if  (this.level.shieldRack) {
                for (let i = 0; i < this.level.shieldRack.length; i++) {
                    let shieldRack = this.level.shieldRack[i];
                    this.game.addEntity(new ShieldRack(this.game, shieldRack.x, shieldRack.y));
                }
            }


            if  (this.level.wallAxe) {
                for (let i = 0; i < this.level.wallAxe.length; i++) {
                    let wallAxe = this.level.wallAxe[i];
                    this.game.addEntity(new WallAxe(this.game, wallAxe.x, wallAxe.y));
                }
            }

            if  (this.level.dungeonAnvil) {
                for (let i = 0; i < this.level.dungeonAnvil.length; i++) {
                    let anvil = this.level.dungeonAnvil[i];
                    this.game.addEntity(new DungeonAnvil(this.game, anvil.x, anvil.y));
                }
            }

            if  (this.level.dungeonDoor) {
                for (let i = 0; i < this.level.dungeonDoor.length; i++) {
                    let door = this.level.dungeonDoor[i];
                    this.game.addEntity(new DungeonDoor(this.game, door.x, door.y, door.level));
                }
            }

            if  (this.level.chandelier) {
                for (let i = 0; i < this.level.chandelier.length; i++) {
                    let chandelier = this.level.chandelier[i];
                    this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
                }
            }

            if  (this.level.dungeonBackground) {
                for (let i = 0; i < this.level.dungeonBackground.length; i++) {
                    let background = this.level.dungeonBackground[i];
                    this.game.addEntity(new DungeonBackground(this.game, background.x, background.y, background.w, background.h));
                }
            }

            if  (this.level.dungeonBackground2) {
                for (let i = 0; i < this.level.dungeonBackground2.length; i++) {
                    let background2 = this.level.dungeonBackground2[i];
                    this.game.addEntity(new DungeonBackground2(this.game, background2.x, background2.y, background2.w, background2.h));
                }
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

        let middlepointX = PARAMS.SCREENWIDTH / 2 - KNIGHT_HEIGHT * 2;
        //this.x = this.knight.x - middlepointX;

        let middlepointY = PARAMS.SCREENHEIGHT / 2 - 50;

        if (0 < this.knight.x - middlepointX && this.level.width > this.knight.x - middlepointX) this.x = this.knight.x - middlepointX;
        if (0 < this.knight.y - middlepointY && this.level.height > this.knight.y - middlepointY) this.y = this.knight.y - middlepointY;
    };

    draw(ctx) {
        ctx.fillStyle = "White";
        //ctx.fillText("Health Bar", 200, 80);
        ctx.font = '24px "Open+Sans"';
        const boxX = 500; 
        const boxY = 90; 
        const boxWidth = 300; 
        const boxHeight = 40;
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillText("0", 500, 165);
        ctx.fillText("1000", 750, 165);
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
        //  ctx.fillText("Ember", 590, 80);
        ctx.fillText(this.knight.emberCount, 160, 120);
        const emberImage = ASSET_MANAGER.getAsset("./resources/dungeon.png"); 
        ctx.drawImage(emberImage, 1520, 2328, 8, 16, 100, 60, 40, 80);
        ctx.fillText(this.knight.potionCount, 280, 120);
        ctx.drawImage(emberImage, 1712, 2216, 16, 16, 200, 64, 64, 80 );

    }; 
};