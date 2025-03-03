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

        this.tutorialCutsceneDone = false;
        this.shopkeeperCutsceneDone = false;
        this.oneCutsceneDone = false;
        this.twoCutsceneDone = false;
        this.bossoneCutsceneDone = false;        
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
        this.discoveredCheckpoints = [];
        this.discoveredCheckpointsLevel = [];

        // this.loadLevel('startScreen', false, true, false, false);
        this.loadLevel('one', false, false, false, false);
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
        this.knight.respawn();
        this.music.pause();
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
        this.fire = this.game.entities.find(entity => entity instanceof Bonfire);
        if (this.fire) {
            if (!this.fire.sound.paused) {
                this.fire.sound.volume = 0;
            }
        }

        this.checkpoint = false;
        this.title = title;        
        this.level = levels[levelIndex];
        this.levelIndex = levelIndex;
        this.saveEntities();
        this.clearEntities();
        this.game.textOverlay = null;
        this.x = 0;
        this.cutsceneCounter = 0;
        if (this.level === levels.two && this.twoCutsceneDone && !transition) {
            this.cutsceneCounter = 1;
            this.twoCutsceneDone = false;
        }
        this.cutsceneStartTime = Date.now();

        
        if (!this.title) {
            if (this.currentCheckpoint && this.currentCheckpoint.level === levelIndex && this.deadcheckpoint) {
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
                console.log(this.x);
                this.x = this.level.width;
                console.log(this.x);
                console.log(this.level.width);
                console.log(`Loading level ${levelIndex} @ default end spawn (${this.level.endPosition.x}, ${this.level.endPosition.y})`);
            } else {
                this.knight.x = this.level.startPosition.x;
                this.knight.y = this.level.startPosition.y;
                console.log(`Loading level ${levelIndex} @ default start spawn (${this.level.startPosition.x}, ${this.level.startPosition.y})`);
            }
            this.game.addEntity(this.knight);
            this.game.ctx.fillRect(50, 50, 100, 100);
        }

        if (transition && this.level !== levels.tutorial) {
            if (this.music) {
                this.music.pause();
            }
            this.game.addEntity(new TransitionScreen(this.game, levelIndex, dead, end))
            return;
        }

        if(this.level === levels.one || this.level === levels.two && this.music !== new Audio(BACKGROUND_MUSIC)) {
            this.music = new Audio(BACKGROUND_MUSIC);
            this.music.loop = true;
        }

        if (this.level === levels.bossOne && this.bossoneCutsceneDone) {
            this.knight.x = this.knight.x + 200;
            this.music = new Audio(LUCAN_MUSIC);
            this.music.loop = true;
        }
        if (this.music) {
            this.music.preload = 'auto';
            this.music.volume = 0.1;
            this.music.play();
        }


        if (this.level.text) {
            if (this.level !== levels.mainMenu) {
                this.level.text.forEach((text) => {
                    text.opacity = 0; // Set initial opacity to 0 (invisible)
                });
            }
            this.game.textOverlay = this.level.text;
            this.game.textOverlay.background = "transparent"
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
                this.game.addEntity(new Potion(this.game, potion.x, potion.y));
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
            if (this.level === levels.bossOne && this.bossoneCutsceneDone) {
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
                this.game.addEntity(new SkeletonWarrior(this.game, skeleton.x, skeleton.y));
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
                this.game.addEntity(new NightbornWarrior(this.game, lucan.x, lucan.y));
            }
        }

        if (this.level.celes) {
            for (let i = 0; i < this.level.celes.length; i++) {
                let celes = this.level.celes[i];
                this.game.addEntity(new Celes(this.game, celes.x, celes.y));
            }
        }

        if (this.level.duma) {
            for (let i = 0; i < this.level.duma.length; i++) {
                let duma = this.level.duma[i];
                this.game.addEntity(new Duma(this.game, duma.x, duma.y));
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

        if (this.level.dungeonWall) {
            for (let i = 0; i < this.level.dungeonWall.length; i++) {
                let wall = this.level.dungeonWall[i];
                this.game.addEntity(new DungeonWall(this.game, wall.x, wall.y, wall.h));
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

        if (this.level.chandelier) {
            for (let i = 0; i < this.level.chandelier.length; i++) {
                let chandelier = this.level.chandelier[i];
                this.game.addEntity(new Chandelier(this.game, chandelier.x, chandelier.y));
            }
        }

        if  (this.level.bonFire) {
            for (let i = 0; i < this.level.bonFire.length; i++) {
                let bonfire = this.level.bonFire[i];
                this.game.addEntity(new Bonfire(this.game, bonfire.x, bonfire.y, bonfire.level));
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

        this.loadEmberDrop();
        
        this.knight.removeFromWorld = false;
    };

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

    resetLevel(levelIndex) {
        levels[levelIndex] = structuredClone(originalLevels[levelIndex]);
    }

    openCheckpointMenu(entity) {
        this.knight.moveable = false;
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
        console.log("closed checkpoint menu");
    }

    teleportToCheckpoint(knight) {
        this.deadcheckpoint = true;
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

    update() {
        if (this.music) {
            if (PARAMS.MUSICOFF) {
                if (this.music) {
                    this.music.volume = 0;
                }
            } else {

                if (this.level === levels.shopkeeper || this.level === levels.startScreen) {
                    this.music.volume = 0;
                } else if (!this.knight.inCutscene) {
                    this.music.volume = 0.1
                }
            }
        }
        if (this.cutsceneManager) {
            if (this.level === levels.tutorial) {
                this.skeletons = this.game.entities.find(entity => entity instanceof SkeletonWarrior);
                if (!this.skeletons) {
                    this.tutorialCutsceneDone = false;
                    this.game.camera.cutscene.push({startX: -300, cutsceneNum: 1})
                }
            }
            if (this.level === levels.tutorial && this.tutorialCutsceneDone
                || this.level === levels.shopkeeper && this.shopkeeperCutsceneDone
                || this.level === levels.one && this.oneCutsceneDone
                || this.level === levels.two && this.twoCutsceneDone
                || this.level === levels.bossOne && this.bossoneCutsceneDone) {

            } else {
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
                        this.oneCutsceneDone = true
                    }
                    if (this.level === levels.two) {
                        this.twoCutsceneDone = true
                    }
                    if (this.level === levels.bossOne) {
                        this.bossoneCutsceneDone = true
                    }
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
                    this.loadLevel('mainMenu', false, true, false, false);
                }

                // Ensure the audio is fully loaded before allowing playback
                this.music.addEventListener('canplaythrough', () => {
                    this.music.play();
                });
            }
            if (this.level === levels.storyRecap) {
                if (this.game.keys['Enter']) {
                    this.loadLevel('mainMenu', false, true, false, false);
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
                    this.loadLevel("mainMenu", false, true, false, false);  // Load the next level
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
        } 

        if (0 > this.knight.y - middlepointY && this.level.height < this.knight.y - middlepointY) {
            this.y = this.knight.y - middlepointY;
        }

    };

    userInterface(ctx) {
        if (this.game.textOverlay) {
            if (this.level === levels.mainMenu) {
                ctx.globalAlpha = 1;
            } else {
                // Draw the black background
                ctx.globalAlpha = 1
                ctx.fillStyle = this.level.background;
                ctx.fillRect(0, 0, this.level.width, this.level.height);

                // Loop through the texts and apply opacity
                this.game.textOverlay.forEach(text => {
                    ctx.fillStyle = text.color;
                    ctx.font = text.font;
                    ctx.textAlign = "center";
                    ctx.globalAlpha = text.opacity;  // Apply opacity

                    // Draw the text
                    ctx.fillText(text.message, text.x, text.y);
                });
                /*

                 */
            }
        } else {
            ctx.globalAlpha = 1;
            

            ctx.fillStyle = "White";
            ctx.font = '36px "Open+Sans"';
            ctx.textAlign = "center";
            ctx.textBaseline = 'top';

            // Draw ember count
            ctx.fillText(this.knight.emberCount, 160, 100);
        
            // Draw animated ember icon
            this.emberAnimation.drawFrame(
                this.game.clockTick,
                ctx,
                80, 85,     // Moved closer to the number (x was 95, now 120)
                3.5          // Scale to match your desired size (40x80)
            );

            // Draw potion count and icon
            ctx.fillText(this.knight.potionCount, 285, 100);
            const emberImage = ASSET_MANAGER.getAsset("./resources/dungeon.png");
            ctx.drawImage(emberImage, 1712, 2216, 16, 16, 200, 64, 64, 80);
        }
    };

    draw(ctx) {
        if (!this.inCutscene) {
            this.userInterface(ctx);
        }
        testInteractable(this.game, ctx);
        ctx.fillStyle = "White";
        ctx.strokeStyle = "Black";
        ctx.font = '40px Arial';
        ctx.textAlign = "left";
        ctx.textBaseline = 'top';
        if (PARAMS.DEBUG) {
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