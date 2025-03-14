class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.inCutscene = false;
        this.cutsceneCounter = 0;
        this.music = null;

        this.menuSelectIndex = -10;
        this.creditsLineIndex = 0;
        this.menuButtonTimer = 0.15;
        this.menuButtonCooldown = 0.15;
        this.escReleased = true;
        this.tutorialCutsceneDone = false;
        this.shopkeeperCutsceneDone = false;
        this.oneCutsceneDone = false;
        this.twoCutsceneDone = false;
        this.threeCutsceneDone = false;
        this.fourCutsceneDone = false;
        this.fiveCutsceneDone = false;
        this.bossoneCutsceneDone = false;
        this.bosstwoCutsceneDone = false;
        this.bossthreeCutsceneDone = false;
        this.emberAnimation = new Animator(
            ASSET_MANAGER.getAsset(EMBER),
            0, 96,        // Starting x, y position in spritesheet
            16, 16,       // Width and height of each frame
            5,            // Number of frames
            0.2,          // Frame duration
            0,            // Padding
            true          // Loop
        );
        this.currentCheckpoint = null;
        this.knight = new Knight(this.game, this.x, this.y);
        this.deadcheckpoint = false;
        this.doormove = false;
        this.discoveredCheckpoints = ["Rest"];
        this.discoveredCheckpointsLevel = [];

        this.lucanDead = false;
        this.celesDead = false;
        this.loadLevel('startScreen', false, true, false, false);
    };

    saveEntities() {
        this.game.entities.forEach((entity) => {
            if (typeof entity.save === 'function') {
                entity.save();
            }
        });
    };

    clearEntities() {
        this.game.entities.forEach((entity) => {
            entity.removeFromWorld = true;
        });
        this.cutsceneManager = null;
        this.cutscene = null;
    };

    respawnKnight(knight) {
        this.deadcheckpoint = true;
        this.knight.reset();
        if (this.music) {
            this.music.pause();
        }
        if (this.currentCheckpoint) {
            const levelIndex = this.currentCheckpoint.level;
            if (levels[levelIndex]) {
                this.loadLevel(levelIndex, true, false, true, false);
                console.log(`Respawn @ checkpoint (${knight.x}, ${knight.y}) @ level ${levelIndex}`);
            } else {
                console.error(`Checkpoint "${levelIndex}" not found.`);
            }
        } else {
            this.loadLevel("shopkeeper", true, false, true, false);
            console.log("Respawning @ default shopkeeper level.");
        }
    }

    loadLevel(levelIndex, transition, title, dead, end) {
        if (this.oneCutsceneDone) {
            if (!this.knight.hasWaveAttack) {
                this.oneCutsceneDone = false;
            }
        }
        this.fire = this.game.entities.find(entity => entity instanceof Bonfire);
        if (this.fire) {
            if (!this.fire.sound.paused) {
                this.fire.sound.volume = 0;
            }
        }
        this.alreadyDone = false
        this.checkpoint = false;
        this.title = title;
        this.level = levels[levelIndex];
        this.levelIndex = levelIndex;
        this.saveEntities();
        this.clearEntities();
        this.game.textOverlay = null;
        this.x = 0;
        this.cutsceneCounter = 0;
        this.cutsceneStartTime = Date.now();


        if (!this.title) {
            if (this.currentCheckpoint && this.currentCheckpoint.level === levelIndex && this.deadcheckpoint && !this.doormove) {
                this.knight.x = this.currentCheckpoint.x;
                this.knight.y = this.currentCheckpoint.y;
                if (levelIndex === "two") {
                    // Force camera to position at the bonfire
                    this.x = Math.max(0, Math.min(this.level.width, this.knight.x - (PARAMS.SCREENWIDTH / 2)));
                }
                console.log(`Loading level ${levelIndex} @ checkpoint (${this.currentCheckpoint.x}, ${this.currentCheckpoint.y})`);
            } else if (end) {
                this.knight.x = this.level.endPosition.x;
                this.knight.y = this.level.endPosition.y;
                this.x = this.level.width;
                console.log(`Loading level ${levelIndex} @ default end spawn (${this.level.endPosition.x}, ${this.level.endPosition.y})`);
            } else {
                this.knight.x = this.level.startPosition.x;
                this.knight.y = this.level.startPosition.y;
                console.log(`Loading level ${levelIndex} @ default start spawn (${this.level.startPosition.x}, ${this.level.startPosition.y})`);
            }
            this.game.addEntity(this.knight);
            this.game.ctx.fillRect(50, 50, 100, 100);
        } else {
            this.knight.x = undefined;
            this.knight.y = undefined;
            this.x = 0;
            this.y = 0;
        }

        if (transition && this.level !== levels.tutorial) {
            if (this.music) {
                this.music.pause();
            }
            this.game.addEntity(new TransitionScreen(this.game, levelIndex, dead, end))
            return;
        }
        this.doormove = false;

        if((this.level === levels.one || this.level === levels.two || this.level === levels.three
            || this.level === levels.four) && this.music !== new Audio(BACKGROUND_MUSIC)) {
            this.music = new Audio(BACKGROUND_MUSIC);
            this.music.loop = true;
        }

        if (this.level === levels.five) {
            if (this.music) {
                this.music = null;
            }
        }

        if (this.level === levels.bossOne && this.bossoneCutsceneDone) {
            this.music = new Audio(LUCAN_MUSIC);
            this.music.loop = true;
        }

        if (this.level === levels.bossTwo && this.bosstwoCutsceneDone) {
            this.music = new Audio(CELES_MUSIC);
            this.music.loop = true;
        }

        if (this.level === levels.emptyScreen) {
            this.music = new Audio(CREDITS_MUSIC);
        }

        if (this.music) {
            this.music.preload = 'auto';
            if (this.level === levels.emptyScreen) {
                this.music.volume = 0.3
            } else {
                this.music.volume = 0.1;
            }
            this.music.play();
        }


        if (this.level.text) {
            if (this.level !== levels.mainMenu) {
                this.level.text.forEach((text) => {
                    text.opacity = 0; // Set initial opacity to 0 (invisible)
                });
            }
            this.game.textOverlay = this.level.text;
            this.game.textOverlay.background = "transparent";
        }

        if(this.level.title) {
            for (let i = 0; i < this.level.title.length; i++) {
                let title = this.level.title[i];
                this.game.addEntity(new gameTitle(this.game, title.x, title.y));
            }
        }

        if (this.level.menuBackground) {
            for (let i = 0; i < this.level.menuBackground.length; i++) {
                let background = this.level.menuBackground[i];
                this.game.addEntity(new menuBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }

        if  (this.level.potion) {
            for (let i = 0; i < this.level.potion.length; i++) {
                let potion = this.level.potion[i];
                if (!potion.bought) {
                    this.game.addEntity(new Potion(this.game, potion));
                }
            }
        }

        if (this.level.tent) {
            for (let i = 0; i < this.level.tent.length; i++) {
                let tent = this.level.tent[i];
                this.game.addEntity(new ShopkeeperTent(this.game, tent.x, tent.y));
            }
        }

        if (this.level.azucena) {
            for (let i = 0; i < this.level.azucena.length; i++) {
                let azucena = this.level.azucena[i];
                this.game.addEntity(new Azucena(this.game, azucena.x, azucena.y, azucena.text));
            }
            if ((this.level === levels.bossOne && this.bossoneCutsceneDone) || (this.level === levels.bossTwo && this.bosstwoCutsceneDone)) {
                this.azucena = this.game.entities.find((entities) => entities instanceof Azucena)
                this.azucena.x = -300;
            }
        }

        if (this.level.reina) {
            for (let i = 0; i < this.level.reina.length; i++) {
                let reina = this.level.reina[i];
                this.game.addEntity(new Reina(this.game, reina.x, reina.y, reina.text));
            }
            if (this.level === levels.bossOne && this.bossoneCutsceneDone) {
                this.reina = this.game.entities.find((entities) => entities instanceof Reina)
                this.reina.x = -300;
            }
        }

        if (this.level.skeleton) {
            for (let i = 0; i < this.level.skeleton.length; i++) {
                let skeleton = this.level.skeleton[i];
                this.game.addEntity(new SkeletonWarrior(this.game, skeleton));
            }
        }

        if (this.level.gorgon) {
            for (let i = 0; i < this.level.gorgon.length; i++) {
                let gorgon = this.level.gorgon[i];
                this.game.addEntity(new Gorgon(this.game, gorgon));
            }
        }

        if (this.level.mechagolem) {
            for (let i = 0; i < this.level.mechagolem.length; i++) {
                let mechagolem = this.level.mechagolem[i];
                if (!mechagolem.dead) {
                    this.game.addEntity(new MechaGolem(this.game, mechagolem));
                }
            }
        }

        if (this.level.lucan) {
            for (let i = 0; i < this.level.lucan.length; i++) {
                let lucan = this.level.lucan[i];
                if (!this.lucanDead) {
                    this.game.addEntity(new NightbornWarrior(this.game, lucan.x, lucan.y));
                }
            }
        }

        if (this.level.celes) {
            for (let i = 0; i < this.level.celes.length; i++) {
                let celes = this.level.celes[i];
                if (!this.celesDead) {
                    this.game.addEntity(new Celes(this.game, celes.x, celes.y));
                }
            }
        }

        if (this.level.duma) {
            for (let i = 0; i < this.level.duma.length; i++) {
                let duma = this.level.duma[i];
                this.game.addEntity(new Duma(this.game, duma.x, duma.y));
            }
        }
        if (this.level.werewolf) {
            for (let i = 0; i < this.level.werewolf.length; i++) {
                let werewolf = this.level.werewolf[i];
                this.game.addEntity(new Werewolf(this.game, werewolf.x, werewolf.y));
            }
        }
        if (this.level.boxes) {
            for (let i = 0; i < this.level.boxes.length; i++) {
                let boxes = this.level.boxes[i];
                this.game.addEntity(new Boxes(this.game, boxes.x, boxes.y, boxes.h));
            }
        }

        if (this.level.dungeonGround) {
            for (let i = 0; i < this.level.dungeonGround.length; i++) {
                let ground = this.level.dungeonGround[i];
                this.game.addEntity(new DungeonGround(this.game, ground.x, ground.y, ground.w, ground.h));
            }
        }

        if (this.level.movingPlatform) {
            for (let i = 0; i < this.level.movingPlatform.length; i++) {
                let ground = this.level.movingPlatform[i];
                this.game.addEntity(new MovingPlatform(this.game, ground.x, ground.y, ground.w, ground.h, ground.endX, ground.endY, ground.isVertical));
            }
        }

        if (this.level.lostSword) {
            for (let i = 0; i < this.level.lostSword.length; i++) {
                let sword = this.level.lostSword[i];
                this.game.addEntity(new LostSword(this.game, sword.x, sword.y));
            }
        }

        if (this.level.dungeonWall) {
            for (let i = 0; i < this.level.dungeonWall.length; i++) {
                let wall = this.level.dungeonWall[i];
                this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y, wall.h));
            }
        }
        if (this.level.dungeonWall1) {
            for (let i = 0; i < this.level.dungeonWall1.length; i++) {
                let wall1 = this.level.dungeonWall1[i];
                this.game.addEntity(new DungeonWall1(this.game, wall1.x, wall1.y, wall1.h));
            }
        }

        if (this.level.dungeonTorch) {
            for (let i = 0; i < this.level.dungeonTorch.length; i++) {
                let torch = this.level.dungeonTorch[i];
                this.game.addEntity(new DungeonTorch(this.game, torch.x, torch.y));
            }
        }

        if (this.level.swordRack) {
            for (let i = 0; i < this.level.swordRack.length; i++) {
                let swordRack = this.level.swordRack[i];
                this.game.addEntity(new SwordRack(this.game, swordRack.x, swordRack.y));
            }
        }

        if (this.level.dungeonWorkbench) {
            for (let i = 0; i < this.level.dungeonWorkbench.length; i++) {
                let workbench = this.level.dungeonWorkbench[i];
                this.game.addEntity(new DungeonWorkbench(this.game, workbench.x, workbench.y));
            }
        }

        if (this.level.sharpening_wheel) {
            for (let i = 0; i < this.level.sharpening_wheel.length; i++) {
                let sharpening_wheel = this.level.sharpening_wheel[i];
                this.game.addEntity(new SharpeningWheel(this.game, sharpening_wheel.x, sharpening_wheel.y));
            }
        }

        if (this.level.knightStatue) {
            for (let i = 0; i < this.level.knightStatue.length; i++) {
                let knightStatue = this.level.knightStatue[i];
                this.game.addEntity(new DungeonStatue(this.game, knightStatue.x, knightStatue.y));
            }
        }


        if (this.level.shieldRack) {
            for (let i = 0; i < this.level.shieldRack.length; i++) {
                let shieldRack = this.level.shieldRack[i];
                this.game.addEntity(new ShieldRack(this.game, shieldRack.x, shieldRack.y));
            }
        }

        if (this.level.wallAxe) {
            for (let i = 0; i < this.level.wallAxe.length; i++) {
                let wallAxe = this.level.wallAxe[i];
                this.game.addEntity(new WallAxe(this.game, wallAxe.x, wallAxe.y));
            }
        }

        if (this.level.dungeonAnvil) {
            for (let i = 0; i < this.level.dungeonAnvil.length; i++) {
                let anvil = this.level.dungeonAnvil[i];
                this.game.addEntity(new DungeonAnvil(this.game, anvil.x, anvil.y));
            }
        }

        if (this.level.dungeonDoor) {
            for (let i = 0; i < this.level.dungeonDoor.length; i++) {
                let door = this.level.dungeonDoor[i];
                this.game.addEntity(new DungeonDoor(this.game, door.x, door.y, door.level, door.end));
            }
        }
        if (this.level.dungeonDoor2) {
            for (let i = 0; i < this.level.dungeonDoor2.length; i++) {
                let door2 = this.level.dungeonDoor2[i];
                this.game.addEntity(new DungeonDoor2(this.game, door2.x, door2.y, door2.level, door2.end));
            }
        }

        if (this.level.chandelier) {
            for (let i = 0; i < this.level.chandelier.length; i++) {
                let chandelier = this.level.chandelier[i];
                this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
            }
        }

        if  (this.level.bonFire) {
            for (let i = 0; i < this.level.bonFire.length; i++) {
                let bonfire = this.level.bonFire[i];
                this.game.addEntity(new Bonfire(this.game, bonfire));
            }
        }

        if  (this.level.lightning) {
            for (let i = 0; i < this.level.lightning.length; i++) {
                let lightning = this.level.lightning[i];
                this.game.addEntity(new Lightning(this.game, lightning.x, lightning.y, false));
            }
        }

        if  (this.level.firebomb) {
            for (let i = 0; i < this.level.firebomb.length; i++) {
                let fire = this.level.firebomb[i];
                this.game.addEntity(new FireBomb(this.game, fire.x, fire.y));
            }
        }
        if  (this.level.firebomb2) {
            for (let i = 0; i < this.level.firebomb2.length; i++) {
                let fire2 = this.level.firebomb2[i];
                this.game.addEntity(new FireBomb2(this.game, fire2.x, fire2.y));
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
        if (this.level.wallspike) {
            for(let i = 0; i < this.level.wallspike.length; i++) {
                let spike = this.level.wallspike[i];
                this.game.addEntity(new DungeonSpike(this.game, spike.x, spike.y));
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
        if (this.level.dungeonLantern) {
            for (let i = 0; i < this.level.dungeonLantern.length; i++) {
                let lantern = this.level.dungeonLantern[i];
                this.game.addEntity(new DungeonLantern(this.game, lantern.x, lantern.y));
            }
        }
        if (this.level.pillar) {
            for(let i = 0; i < this.level.pillar.length; i++) {
                let pillar = this.level.pillar[i];
                this.game.addEntity(new DungeonPillar(this.game, pillar.x, pillar.y));
            }
        }
        if (this.level.eagle) {
            for(let i = 0; i < this.level.eagle.length; i++) {
                let eagle = this.level.eagle[i];
                this.game.addEntity(new DungeonEagle(this.game, eagle.x, eagle.y));
            }
        }
        if (this.level.eagle2) {
            for(let i = 0; i < this.level.eagle2.length; i++) {
                let eagle2 = this.level.eagle2[i];
                this.game.addEntity(new DungeonEagle2(this.game, eagle2.x, eagle2.y));
            }
        }
        if (this.level.wizard) {
            for(let i = 0; i < this.level.wizard.length; i++) {
                let wizard = this.level.wizard[i];
                this.game.addEntity(new DungeonWizard(this.game, wizard.x, wizard.y));
            }
        }
        if (this.level.bridge) {
            for(let i = 0; i < this.level.bridge.length; i++) {
                let bridge = this.level.bridge[i];
                this.game.addEntity(new DungeonBridge(this.game, bridge.x, bridge.y));
            }
        }

        if (this.level.dungeonGround4) {
            for (let i = 0; i < this.level.dungeonGround4.length; i++) {
                let ground4 = this.level.dungeonGround4[i];
                this.game.addEntity(new DungeonGround4(this.game, ground4.x, ground4.y, ground4.w, ground4.h));
            }
        }

        if (this.level.dungeonBackground4) {
            for (let i = 0; i < this.level.dungeonBackground4.length; i++) {
                let background4 = this.level.dungeonBackground4[i];
                this.game.addEntity(new DungeonBackground4(this.game, background4.x, background4.y, background4.w, background4.h));
            }
        }

        if (this.level.townBackground) {
            for (let i = 0; i < this.level.townBackground.length; i++) {
                let background = this.level.townBackground[i];
                this.game.addEntity(new townBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }

        if (this.level.nightBackground) {
            for (let i = 0; i < this.level.nightBackground.length; i++) {
                let background = this.level.nightBackground[i];
                this.game.addEntity(new tutorialBackground(this.game, background.x, background.y, background.w, background.h));
            }
        }


        if (this.level.cutscene) {
            this.cutsceneManager = new CutsceneManager(this.game);
            this.cutscene = this.level.cutscene;
        }

        if (this.level === levels.tutorial && this.tutorialCutsceneDone
            || this.level === levels.shopkeeper && this.shopkeeperCutsceneDone
            || this.level === levels.one && this.oneCutsceneDone
            || this.level === levels.two && this.twoCutsceneDone
            || this.level === levels.three && this.threeCutsceneDone
            || this.level === levels.four && this.fourCutsceneDone
            || this.level === levels.five && this.fiveCutsceneDone
            || this.level === levels.bossOne && this.bossoneCutsceneDone
            || this.level === levels.bossTwo && this.bosstwoCutsceneDone
            || this.level === levels.bossThree && this.bossthreeCutsceneDone) {
            this.cutsceneCounter = this.cutscene.length;
            if (this.level === levels.bossOne) {
                if (this.bossoneCutsceneDone && !this.lucanDead && !this.alreadyDone) {
                    this.alreadyDone = true;
                    this.bossoneCutsceneDone = false;
                    this.game.camera.cutscene.push({startX: -300, cutsceneNum: 6})
                }
            }
            if (this.level === levels.bossTwo) {
                if (this.bosstwoCutsceneDone && !this.celesDead  && !this.alreadyDone) {
                    this.alreadyDone = true;
                    this.bosstwoCutsceneDone = false;
                    this.game.camera.cutscene.push({startX: -300, cutsceneNum: 6})
                }
            }
            if (this.level === levels.bossThree) {
                if (this.bossthreeCutsceneDone && !this.alreadyDone) {
                    this.alreadyDone = true;
                    this.bossthreeCutsceneDone = false;
                    this.game.camera.cutscene.push({startX: -300, cutsceneNum: 6})
                }
            }
        }

        this.loadEmberDrop();

        this.knight.removeFromWorld = false;
    };
    showShopMenu() {
        this.knight.moveable = false;
        this.shopMenu = new ShopMenu(this.game, this);
        let oldEntities = this.game.entities;
        this.game.entities = [];
        this.game.addEntity(this.shopMenu);
        oldEntities.map((entity) => this.game.addEntity(entity));

        console.log("Opened shop menu");
    }
    closeShopMenu() {
        if (this.shopMenu) {
            this.knight.moveable = true;
            this.shopMenu.removeFromWorld = true;
            this.shopMenu = null;

            // Reset key states
            this.game.keys["Enter"] = false;
            this.game.keys["Escape"] = false;
            this.escReleased = true;

            console.log("Shop menu closed with key states reset");
        }
    }

    loadEmberDrop() {
        if (this.emberDrop && this.levelIndex == this.emberDrop.levelIndex) {
            this.game.entities.splice(0, 0, this.emberDrop);
        }
    }

    showInteractive(entity, text) {
        this.knight.moveable = false;
        this.interactable = new Interaction(this.game, this, entity, text);
        let oldEntities = this.game.entities;
        this.game.entities = [];
        this.game.addEntity(this.interactable);
        oldEntities.map((entity) => this.game.addEntity(entity));
    }

    removeInteractive() {
        this.knight.moveable = true;
        this.interactable.entity.dialogCompleted = true;
        this.interactable.removeFromWorld = true;
        const interactable = this.interactable;
        setTimeout(() => {
            interactable.entity.dialogCompleted = false;
        }, 3000);
        this.interactable = undefined;
    }

    openCheckpointMenu(entity) {
        if (this.teleportMenu) return;
        this.knight.moveable = false;
        this.game.keys["f"] = false;
        this.teleportMenu = new CheckpointMenu(this.game, entity);
        let oldEntities = this.game.entities;
        this.game.entities = [];
        this.game.addEntity(this.teleportMenu);
        oldEntities.map((entity) => this.game.addEntity(entity));
        console.log("opened checkpoint menu");
    }

    closeCheckpointMenu() {
        this.knight.moveable = true;
        this.teleportMenu.removeFromWorld = true;
        this.teleportMenu = undefined;
        console.log("closed checkpoint menu");
    }

    teleportToCheckpoint(knight) {
        this.deadcheckpoint = true;
        resetLevels();
        if (this.currentCheckpoint) {
            const levelIndex = this.currentCheckpoint.level;
            if (levels[levelIndex]) {
                this.loadLevel(levelIndex, true, false, false, false);
                console.log(`Respawn @ checkpoint (${knight.x}, ${knight.y}) @ level ${levelIndex}`);
            } else {
                console.error(`Checkpoint "${levelIndex}" not found.`);
            }
        }

    }
    showControlsMenu() {
        // Don't show if already showing another menu or in cutscene
        if (this.inCutscene || this.interactable || this.shopMenu || this.teleportMenu || this.controlsMenu) {
            return;
        }

        this.knight.moveable = false;
        this.controlsMenu = new GameControlsMenu(this.game, this);
        this.game.keys["Escape"] = false;

        // Add the controls menu to entities
        let oldEntities = this.game.entities;
        this.game.entities = [];
        this.game.addEntity(this.controlsMenu);
        oldEntities.map((entity) => this.game.addEntity(entity));

        console.log("opened controls menu");
    }
    closeControlsMenu() {
        if (this.controlsMenu) {
            this.knight.moveable = true;
            this.controlsMenu.removeFromWorld = true;
            this.controlsMenu = null;
        }
    }


    update() {
        if (this.levelIndex === "three") {
            if (this.knight.y <= -3839) {
                this.level.width = 1900;
            } else {
                this.level.width = originalLevels[this.levelIndex].width;
            }
        }

        if (this.levelIndex === "four") {
            if (this.knight.x <= 6000 || this.knight.x >= 11000) {
                this.level.minHeight = 0;
            } else {
                this.level.minHeight = originalLevels[this.levelIndex].minHeight;
            }
        }

        if (!this.game.keys["f"]) {
            this.fReleased = true;
        }

        if (this.level === levels.emptyScreen) {
            if (this.music.currentTime >= 35) {
                this.inCutscene = false;
                this.loadLevel('AzucenaAfterStory', false, true, false, false);
            }
        }

        const reina = this.game.entities.find((entity) => entity instanceof Reina);
        if (this.fReleased && !this.shopMenu && this.level === levels["shopkeeper"] && reina && reina.BB.collide(this.knight.BB) && this.game.keys["f"]) {
            this.fReleased = false;
            this.game.keys["f"] = false;
            this.game.camera.showShopMenu();
        }

        if (this.game.keys["Escape"] && this.escReleased) {
            console.log("Escape pressed - escReleased:", this.escReleased,
                "Control menu:", !!this.controlsMenu,
                "Shop menu:", !!this.shopMenu);

            this.escReleased = false;

            // Only open menu with Escape, don't close with it
            if (!this.controlsMenu && !this.inCutscene && !this.interactable && !this.shopMenu && !this.teleportMenu) {
                this.showControlsMenu();
            }
        } else if (!this.game.keys["Escape"]) {
            this.escReleased = true;
        }

        // if (this.game.keys["Escape"] && !this.inCutscene && !this.interactable && 
        //     !this.shopMenu && !this.teleportMenu && !this.controlsMenu && this.escReleased) {
        //     this.escReleased = false;
        //     this.showControlsMenu();
        // }
        // if (!this.game.keys["Escape"]) {
        //     this.escReleased = true;
        // }
        if (this.music) {
            if (PARAMS.MUSICOFF) {
                if (this.music) {
                    this.music.volume = 0;
                }
            } else {
                if (this.level === levels.shopkeeper || this.level === levels.startScreen || this.level.five) {
                    this.music.volume = 0;
                } else if (!this.knight.inCutscene) {
                    if (this.level === levels.bossOne && this.lucanDead ||
                        this.level === levels.bossTwo && this.celesDead) {
                        this.music.volume = 0;
                    } else {
                        this.music.volume = 0.1
                    }
                }
            }
        }
        if (this.cutsceneManager) {
            if (this.level === levels.tutorial) {
                this.skeletons = this.game.entities.find(entity => entity instanceof SkeletonWarrior);
                if (!this.skeletons && !this.alreadyDone) {
                    this.tutorialCutsceneDone = false;
                    this.alreadyDone = true;
                    this.game.camera.cutscene.push({startX: -300, cutsceneNum: 1})
                }
            }
                if (this.cutsceneCounter !== this.cutscene.length) {
                    if (!this.inCutscene && this.knight.x >= this.cutscene[this.cutsceneCounter].startX) {
                        this.inCutscene = true;
                        this.scene = this.cutsceneManager.cutsceneArray[this.cutscene[this.cutsceneCounter].cutsceneNum];
                        this.cutsceneCounter++;
                        this.scene.run();
                        return;
                    }
                } else {
                    if (this.level === levels.tutorial) {
                        this.tutorialCutsceneDone = true
                    }
                    if (this.level === levels.shopkeeper) {
                        this.shopkeeperCutsceneDone = true
                    }
                    if (this.level === levels.one) {
                        this.oneCutsceneDone = true;
                    }
                    if (this.level === levels.two) {
                        this.twoCutsceneDone = true
                    }
                    if (this.level === levels.three) {
                        this.threeCutsceneDone = true
                    }
                    if (this.level === levels.four) {
                        this.fourCutsceneDone = true
                    }
                    if (this.level === levels.five) {
                        this.fiveCutsceneDone = true
                    }
                    if (this.level === levels.bossOne) {
                        this.bossoneCutsceneDone = true
                    }
                    if (this.level === levels.bossTwo) {
                        this.bosstwoCutsceneDone = true
                    }
                    if (this.level === levels.bossThree) {
                        this.bossthreeCutsceneDone = true
                    }
                }
            }
        if (this.title) {
            if (this.level === levels.startScreen && (this.game.keys[' '] || this.game.keys['Enter'])) {
                this.music = new Audio(MAIN_MUSIC);
                this.music.loop = true;
                this.music.preload = 'auto';
                this.music.volume = 0.1;
                if (this.game.keys[' ']) {
                    this.loadLevel('storyRecap', false, true, false, false);
                } else if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('mainMenu', false, true, false, false);
                }

                // Ensure the audio is fully loaded before allowing playback
                this.music.addEventListener('canplaythrough', () => {
                    this.music.play();
                });
            }
            if (this.level === levels.storyRecap) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('mainMenu', false, true, false, false);
                }
            }
            if (this.level === levels.emptyScreen) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('AzucenaAfterStory', false, true, false, false);
                }
            }
            if (this.level === levels.AzucenaAfterStory) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('ReinaAfterStory', false, true, false, false);
                }
            }
            if (this.level === levels.ReinaAfterStory) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('ChosenAfterStory', false, true, false, false);
                }
            }
            if (this.level === levels.ChosenAfterStory) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('Credits', false, true, false, false);
                }
            }
            if (this.level === levels.Credits) {
                if (this.game.keys['Enter']) {
                    this.game.keys["Enter"] = false;
                    this.loadLevel('ThankYou', false, true, false, false);
                }
            }
            if (this.game.textOverlay) {
                const currentTime = Date.now();

                // Calculate time since the cutscene started
                const elapsedTime = currentTime - this.cutsceneStartTime;

                // Duration to fade in each text
                let fadeDuration = this.level.fadeTime;  // Duration for each text to fade in.

                // Determine which text should be active based on the elapsed time
                let textIndex = Math.floor(elapsedTime / fadeDuration);  // Which text should be fading in

                // Ensure we don't go beyond the number of text elements
                textIndex = Math.min(textIndex, this.game.textOverlay.length);

                // Update the opacity for each text
                for (let i = 0; i < textIndex; i++) {
                    // Texts that should have fully faded in
                    this.game.textOverlay[i].opacity = 1;
                }

                // Fade the current text (only one text is fading at a time)
                if (textIndex < this.game.textOverlay.length) {
                    const currentText = this.game.textOverlay[textIndex];
                    const timeIntoFade = elapsedTime - (textIndex * fadeDuration);

                    // Fade in this text over its duration
                    currentText.opacity = Math.min(timeIntoFade / fadeDuration, 1);
                }
                if (this.level === levels.storyRecap && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    setTimeout(() => {
                        this.loadLevel("mainMenu", false, true, false, false);  // Load the next level
                    }, 500);
                }
                if (this.level === levels.AzucenaAfterStory && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    setTimeout(() => {
                        this.loadLevel("ReinaAfterStory", false, true, false, false);  // Load the next level
                    }, 500);
                }
                if (this.level === levels.ReinaAfterStory && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    setTimeout(() => {
                        this.loadLevel("ChosenAfterStory", false, true, false, false);  // Load the next level
                    }, 500);
                }
                if (this.level === levels.ChosenAfterStory && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    setTimeout(() => {
                        this.loadLevel("Credits", false, true, false, false);  // Load the next level
                    }, 500);
                }
                if (this.level === levels.Credits && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    setTimeout(() => {
                        this.loadLevel("ThankYou", false, true, false, false);  // Load the next level
                    }, 6000);
                }
                if (this.level === levels.ThankYou && textIndex === this.game.textOverlay.length && elapsedTime >= (this.game.textOverlay.length * fadeDuration)) {
                    this.tutorialCutsceneDone = false;
                    this.shopkeeperCutsceneDone = false;
                    this.oneCutsceneDone = false;
                    this.twoCutsceneDone = false;
                    this.threeCutsceneDone = false;
                    this.fourCutsceneDone = false;
                    this.fiveCutsceneDone = false;
                    this.bossoneCutsceneDone = false;
                    this.bosstwoCutsceneDone = false;
                    this.bossthreeCutsceneDone = false;
                    setTimeout(() => {
                        this.music.pause()
                        this.music.volume = 0;
                        this.music = null;
                        this.loadLevel("startScreen", false, true, false, false);  // Load the next level
                    }, 6000);
                }
            }

            if (this.level === levels.mainMenu && this.game.keys[' ']) {
                this.loadLevel("tutorial", true, false, false, false);
            }
        }

        let middlepointX = PARAMS.SCREENWIDTH / 2 - KNIGHT_X_OFFSET - KNIGHT_WIDTH / 2;
        //this.x = this.knight.x - middlepointX;

        let middlepointY = PARAMS.SCREENHEIGHT / 2 - KNIGHT_Y_OFFSET - KNIGHT_HEIGHT / 2;


        if (0 < this.knight.x - middlepointX && this.level.width > this.knight.x - middlepointX) {
            this.x = this.knight.x - middlepointX;
        } else if (0 > this.knight.x - middlepointX) {
            this.x = 0;
        } else if (this.level.width < this.knight.x - middlepointX) {
            this.x = this.level.width;
        }

        if (this.level.minHeight > this.knight.y - middlepointY && this.level.maxHeight < this.knight.y - middlepointY) {
            this.y = this.knight.y - middlepointY;
        } else if (this.level.maxHeight < this.knight.y - middlepointY) {
            this.y = this.level.minHeight;
        } else if (this.level.minHeight > this.knight.y - middlepointY) {
            this.y = this.level.maxHeight;
        }

        if (this.level === levels.bossOne) {
            if (this.knight.x <= -245) {
                this.loadLevel('two', true, false, false, true);
            } else if (this.knight.x >= 1975) {
                this.loadLevel('three', true, false, false, false)
            }
        }

        if (this.level === levels.three) {
            if (this.knight.x <= -280) {
                this.loadLevel('bossOne', true, false, false, true)
            } else if (this.knight.x >= 3100) {
                this.loadLevel('bossTwo', true, false, false, false);
            }
        }

        if (this.level === levels.bossTwo) {
            if (this.knight.x <= -245) {
                this.loadLevel('three', true, false, false, true)
            } else if (this.knight.x >= 1170) {
                this.loadLevel('four', true, false, false, false)
            }
        }

        if (this.level === levels.four) {
            if (this.knight.x <= -200) {
                this.loadLevel('bossTwo', true, false, false, true)
            }
        }

        if (this.level === levels.two) {
            if (this.knight.x >= 11538) {
                this.loadLevel('bossOne', true, false, false, false)
            }
        }

        if (this.level === levels.five) {
            if (this.knight.x <= -245) {
                this.loadLevel('four', true, false, false, true)
            } else if (this.knight.x >= 2005) {
                this.loadLevel('bossThree', true, false, false, false)
            }
        }
    };

    userInterface(ctx) {
        if (this.game.textOverlay) {
            // Set default opacity
            ctx.globalAlpha = 1;
            
            // Only draw background for screens that need it (not mainMenu or startScreen)
            if (this.level !== levels.mainMenu && this.level !== levels.startScreen && this.level.background) {
                ctx.fillStyle = this.level.background;
                ctx.fillRect(0, 0, this.level.width, this.level.height);
            }
    
            // For main menu, draw all text immediately
            if (this.level === levels.mainMenu) {
                this.game.textOverlay.forEach(text => {
                    ctx.fillStyle = text.color;
                    ctx.font = text.font;
                    ctx.textAlign = "center";
                    ctx.globalAlpha = 1;  // Always fully visible for main menu
                    ctx.fillText(text.message, text.x, text.y);
                });
            } 
            // For story recap and other screens, use the fading effect
            else {
                this.game.textOverlay.forEach(text => {
                    ctx.fillStyle = text.color;
                    ctx.font = text.font;
                    ctx.textAlign = "center";
                    ctx.globalAlpha = text.opacity;  // Use the calculated opacity for fade effect
                    ctx.fillText(text.message, text.x, text.y);
                });
            }
            
            // Reset opacity
            ctx.globalAlpha = 1;
        } 
        // Only draw HUD elements during actual gameplay (not in menu/title screens)
        else if (this.level !== levels.mainMenu && this.level !== levels.startScreen && this.level !== levels.storyRecap) {
            // HUD elements
            ctx.globalAlpha = 1;
            
            ctx.fillStyle = "White";
            ctx.font = '36px "Open+Sans"';
            ctx.textAlign = "center";
            ctx.textBaseline = 'top';
            
            ctx.fillText(this.knight.emberCount, 160, 100);
            
            this.emberAnimation.drawFrame(
                this.game.clockTick,
                ctx,
                80, 85,     
                3.5          
            );
            
            ctx.fillText(this.knight.potionCount, 285, 100);
            const emberImage = ASSET_MANAGER.getAsset("./resources/dungeon.png");
            ctx.drawImage(emberImage, 1712, 2216, 16, 16, 200, 64, 64, 80);
            
            // Stamina bar
            let barWidth = 180; 
            let barHeight = 25; 
            let barX = 330; 
            let barY = 100; 
            let ratio = this.knight.currentStamina / this.knight.stamina;
    
            ctx.fillStyle = "White";
            ctx.font = '20px "Open+Sans"'; 
            ctx.textAlign = "center";
            ctx.fillText("STAMINA", barX + barWidth/2, barY - 25);
    
            ctx.fillStyle = "#333333";
            ctx.fillRect(barX, barY, barWidth, barHeight);
    
            ctx.fillStyle = "#FFFF00"; 
            ctx.fillRect(barX, barY, barWidth * ratio, barHeight);
    
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
        }
    }

    draw(ctx) {
        if (!this.inCutscene) {
            this.userInterface(ctx);
        }
        testInteractable(this.game, ctx);
        if (this.controlsMenu) {
            this.controlsMenu.draw(ctx);
        }
        if (PARAMS.DEBUG) {
            ctx.fillStyle = "White";
            ctx.strokeStyle = "Black";
            ctx.font = '10px Arial';
            ctx.textAlign = "left";
            ctx.textBaseline = 'top';
            ctx.font = '40px Arial';
            const padding = 10;
            const offset = 10;
            const xPosition = `X: ${this.knight.x}`;
            const xDimensions = ctx.measureText(xPosition);
            ctx.fillText(xPosition, offset + padding, PARAMS.SCREENHEIGHT - xDimensions.actualBoundingBoxDescent - padding);
            ctx.strokeText(xPosition, offset + padding, PARAMS.SCREENHEIGHT - xDimensions.actualBoundingBoxDescent - padding);
            const yPosition = `Y: ${this.knight.y}`;
            const yDimensions = ctx.measureText(yPosition);
            ctx.fillText(yPosition, offset + padding + xDimensions.width + padding, PARAMS.SCREENHEIGHT - yDimensions.actualBoundingBoxDescent - padding);
            ctx.strokeText(yPosition, offset + padding + xDimensions.width + padding, PARAMS.SCREENHEIGHT - yDimensions.actualBoundingBoxDescent - padding);
        }
    };
}