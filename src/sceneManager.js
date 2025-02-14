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

        this.loadLevel("shopkeeper", false, true);
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, title) {

        this.title = title;
        this.level = levels[level];
        level = levels[level];
        this.clearEntities();
        this.x = 0;

        this.knight = new Knight(this.game, this.level.knightPos.x, this.level.knightPos.y);
        this.game.addEntity(this.knight);
        this.game.ctx.fillRect(50, 50, 100, 100);
        if (level.black) {
            for (let i = 0; i < level.tent.length; i++) {
                ctx.fillRect(50, 50, 100, 100);
            }
        }

        if (level.tent) {
            for (let i = 0; i < level.tent.length; i++) {
                let tent = level.tent[i];
                this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
            }
        }

        if (level.reina) {
            for (let i = 0; i < level.reina.length; i++) {
                let reina = level.reina[i];
                this.game.addEntity(new Reina(this.game, reina.x, reina.y));
            }
        }

        if (level.mechagolem) {
            for (let i = 0; i < level.mechagolem.length; i++) {
                let mechagolem = level.mechagolem[i];
                this.game.addEntity(new MechaGolem(this.game, mechagolem.x, mechagolem.y));
            }
        }

        if (level.azucena) {
            for (let i = 0; i < level.azucena.length; i++) {
                let azucena = level.azucena[i];
                this.game.addEntity(new Azucena(this.game, azucena.x, azucena.y));
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
                this.game.addEntity(new DungeonGround(this.game, ground.x, ground.y, ground.w, ground.h));
            }
        }

        if (level.dungeonWall) {
            for (let i = 0; i < level.dungeonWall.length; i++) {
                let wall = level.dungeonWall[i];
                this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y, wall.h));
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
                this.game.addEntity(new DungeonDoor(this.game, door.x, door.y, door.level));
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
        }
    };

    showInteractive(entity, text) {
        this.knight.moveable = false;
        this.interactable = new Interaction(this.game, this, entity, text);1
        let oldEntities = this.game.entities;
        this.game.entities = [];
        this.game.addEntity(this.interactable);
        oldEntities.map((entity) => this.game.addEntity(entity)); 
    }

    removeInteractive() {
        this.knight.moveable = true;
        this.interactable.entity.dialogCompleted = true;
        this.interactable.removeFromWorld = true;
        this.interactable = undefined;
    }

    update() {
        if (this.knight.hp <= 0) {

        }

        let middlepointX = PARAMS.SCREENWIDTH / 2 - KNIGHT_HEIGHT * 2;
        //this.x = this.knight.x - middlepointX;

        let middlepointY = PARAMS.SCREENHEIGHT / 2 - 50;

        if (0 < this.knight.x - middlepointX && this.level.width > this.knight.x - middlepointX) this.x = this.knight.x - middlepointX;
        if (0 < this.knight.y - middlepointY && this.level.height > this.knight.y - middlepointY) this.y = this.knight.y - middlepointY;
    };

    draw(ctx) {
        ctx.fillStyle = "White";
        ctx.font = '24px "Open+Sans"';
        const boxX = 200; 
        const boxY = 90; 
        const boxWidth = 300; 
        const boxHeight = 50;
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillText("0", 200, 180);
        ctx.fillText("1000", 450, 180);
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
        ctx.fillText(this.knight.emberCount, 600, 120);
        const emberImage = ASSET_MANAGER.getAsset("./resources/dungeon.png"); 
        ctx.drawImage(emberImage, 1520, 2328, 8, 16, 550, 60, 40, 80);
    }; 
};