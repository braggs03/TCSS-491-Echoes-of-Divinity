class CutsceneManager {
    constructor(game) {
        this.game = game;
        this.cutsceneArray = [new CutsceneOne(this.game), new CutsceneTwo(this.game),
            new CutsceneThree(this.game), new CutsceneFour(this.game), new CutsceneFive(this.game),
            new CutsceneSix(this.game), new CutsceneSeven(this.game), new CutsceneEight(this.game),
            new CutsceneNine(this.game), new CutsceneTen(this.game), new CutsceneEleven(this.game),]
    }
}

/*
    Intro Cutscene
 */
class CutsceneOne {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
        this.reina = this.game.entities.find(entity=> entity instanceof Reina);
        this.skeleton = this.game.entities.find(entity=> entity instanceof SkeletonWarrior);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.reina.inCutscene = true;
        this.skeleton.inCutscene = true;
        this.knight.setState('RightRun');
        while (this.knight.x <= 100) {
            await this.delay (16);
        }
        this.knight.setState('RightIdle');

        this.azucena.setState(this.azucena.idleRight());
        this.azucena.goRight = true;
        while (this.azucena.x <= 400) {
            await this.delay (16);
        }
        this.azucena.goRight = false;
        this.azucena.setState(this.azucena.idleLeft())
        this.game.camera.showInteractive(this.reina, "reina1");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.azucena, "azucena1");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(5000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(5000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.reina, "reina2");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.skeleton.setState('LeftRun');
        await this.delay(700);
        this.skeleton.setState('LeftIdle')
        this.azucena.setState(this.azucena.idleRight())
        this.game.camera.showInteractive(this.azucena, "azucena2");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.removeInteractive();
        this.knight.velocityX = 0;
        this.game.camera.inCutscene = false;
        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.reina.inCutscene = false;
        this.skeleton.inCutscene = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Tutorial complete cutscene.
 */
class CutsceneTwo {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.knight.setState('LeftIdle');
        while (this.game.camera.music.volume > 0.0) {
            this.game.camera.music.volume = Math.max ( this.game.camera.music.volume - (0.1 * this.game.clockTick), 0.0);
            await this.delay(16);
        }
        this.game.camera.music.pause();
        this.knight.setState("RightRun");
        while (this.knight.x < 2500) {
            await this.delay (16);
        }
        this.knight.setState("LeftIdle");
        this.azucena.x = this.knight.x - 1200;
        this.azucena.goRight = true;
        while (this.azucena.x < this.knight.x - 200) {
            await this.delay (16);
        }
        this.azucena.goRight = false;
        this.game.camera.showInteractive(this.azucena, "azucena3");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(3000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(3000);
        this.game.camera.removeInteractive();
        this.azucena.goRight = true;
        await this.delay(2000);
        this.knight.setState("RightRun");
        await this.delay(2000);
        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.game.camera.inCutscene = false;
        this.game.interactable = undefined;
        this.knight.velocityX = 0;
        this.game.camera.loadLevel("shopkeeper", true, false, false, false);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Shopkeeper Introduction
 */
class CutsceneThree {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.knight.x = 500;
        this.knight.setState("RightIdle");
        this.game.camera.showInteractive(this.azucena, "azucena4");
        await this.delay(3000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(6000);
        this.game.camera.removeInteractive();

        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.game.camera.inCutscene = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Upcoming Boss Warning 1
 */
class CutsceneFour {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
        this.reina = this.game.entities.find(entity=> entity instanceof Reina);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.reina.inCutscene = true;
        this.knight.setState('RightIdle');
        this.knight.velocityX = 0;
        this.game.camera.showInteractive(this.azucena, "azucena5");
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.reina, "reina3");
        await this.delay(2000);
        this.game.camera.removeInteractive();

        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.game.camera.inCutscene = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Enter Boss Room 1.
 */
class CutsceneFive {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
    }

    async run() {
        this.knight.inCutscene = true;
        this.knight.setState("RightRun");
        await this.delay(2000);
        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.game.camera.inCutscene = false;
        this.knight.velocityX = 0;
        this.game.camera.loadLevel("bossOne", true, false, false, false);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Boss 1 Intro Cutscene.
 */
class CutsceneSix {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
        this.reina = this.game.entities.find(entity=> entity instanceof Reina);
        this.lucan = this.game.entities.find(entity=> entity instanceof NightbornWarrior);
    }

    async run() {
        this.game.camera.music.pause();
        this.knight.inCutscene = true;
        this.lucan.inCutscene = true;
        this.lucan.setState('idleLeft')
        this.knight.setState('RightRun');
        while (this.knight.x < 200) {
            await this.delay (16);
        }
        this.knight.setState('RightIdle');
        this.knight.velocityX = 0;
        this.reina.inCutscene = true;
        this.azucena.inCutscene = true;
        let walls = this.game.entities.filter(e => e instanceof DungeonWall && e.h === 3);
        walls.forEach(wall => wall.h = 5);
        this.game.draw()
        this.game.camera.showInteractive(this.azucena, "azucena6");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.lucan.setState('runLeft');
        while (this.lucan.x > 650) {
            await this.delay (16);
        }
        this.lucan.setState('idleLeft');
        this.game.camera.showInteractive(this.reina, "reina4");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(3000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.azucena, "azucena7");
        await this.delay(3000);
        this.game.camera.interactable.currentDialog++;
        this.game.camera.music = new Audio(LUCAN_MUSIC);
        this.game.camera.music.loop = true;
        this.game.camera.music.volume = 0.1;

        // Ensure the audio is fully loaded before allowing playback
        this.game.camera.music.addEventListener('canplaythrough', () => {
            this.game.camera.music.play();
        });
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.knight.setState('RightRun');
        while (this.knight.x < 200) {
            await this.delay (16);
        }
        this.lucan.setState('AttackLeft');
        await this.delay(200);
        this.knight.setState('RightRoll');
        await this.delay(750);
        this.lucan.setState('runLeft');
        this.knight.setState('LeftAttack1');
        while (this.lucan.x > 300) {
            await this.delay (16);
        }
        this.lucan.setState('idleRight');
        this.knight.setState('LeftIdle');
        this.knight.facing= LEFT;
        await this.delay(500);
        this.knight.inCutscene = false;
        this.reina.inCutscene = false;
        this.azucena.inCutscene = false;
        this.azucena.y = -500;
        this.reina.y = -500;
        this.lucan.inCutscene = false;
        this.knight.moveable = true;
        this.game.camera.inCutscene = false;
        this.knight.velocityX = 0;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Enter Boss Room Cutscene.
 */
class CutsceneSeven {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.lucan = this.game.entities.find(entity=> entity instanceof NightbornWarrior);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
        this.reina = this.game.entities.find(entity=> entity instanceof Reina);
        this.celes = this.game.entities.find(entity => entity instanceof Celes)
    }

    async run() {
        this.azucena.y = -300;
        this.reina.y = -300;
        this.knight.inCutscene = true;
        if (!this.game.camera.lucanDead) {
            this.lucan.inCutscene = true;
            this.lucan.setState('idleLeft')
        }
        if (!this.game.camera.celesDead) {
            this.celes.inCutscene = true;
            this.celes.setState('idleLeft')
        }
        this.knight.setState('RightRun');
        while (this.knight.x < 200) {
            await this.delay (16);
        }
        this.knight.setState('LeftIdle');
        let walls = this.game.entities.filter(e => e instanceof DungeonWall && e.h === 3);
        if (!this.game.camera.lucanDead) {
            walls.forEach(wall => wall.h = 5);
        }
        this.knight.velocityX = 0;
        this.knight.inCutscene = false;
        this.game.camera.inCutscene = false;
        if (this.lucan) {
            this.lucan.inCutscene = false;
        }
        if (this.celes) {
            this.celes.inCutscene = false;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Boss 1 Complete Cutscene.
 */
class CutsceneEight {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.reina = this.game.entities.find(entity=> entity instanceof Reina);
    }

    async run() {
        this.game.camera.showInteractive(this.reina, "reina5");
        await this.delay(4000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(4000);
        this.game.camera.removeInteractive();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Upcoming Boss 2 Warning.
 */
class CutsceneNine {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.knight.setState('RightIdle');
        this.knight.velocityX = 0;
        this.game.camera.showInteractive(this.azucena, "azucena8");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();


        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.game.camera.inCutscene = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

/*
    Boss 2 Introduction.
 */
class CutsceneTen {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
        this.celes = this.game.entities.find(entity=> entity instanceof Celes);
    }

    async run() {
        //this.game.camera.music.pause();
        this.knight.inCutscene = true;
        this.celes.inCutscene = true;
        this.celes.setState('LeftIdle')
        this.knight.setState('RightRun');
        while (this.knight.x < 200) {
            await this.delay (16);
        }
        this.knight.setState('RightIdle');
        this.azucena.inCutscene = true;
        this.game.camera.showInteractive(this.azucena, "azucena9");
        await this.delay(2000);
        this.game.camera.removeInteractive();
        await this.delay(1000);
        console.log(true)
        this.lightning = new Lightning(this.game, this.celes.x - 10, 40, true)
        this.game.entities.splice(1, 0, this.lightning)
        await this.delay(500)
        this.celes.y = 450;
        this.game.camera.showInteractive(this.celes, "celes1");
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.azucena, "azucena10");
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class CutsceneEleven {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
    }

    async run() {  
        if(this.knight.y < -2600) {   
        this.knight.moveable = false;
        await this.delay(700);   
        this.knight.inCutscene = true;
        this.knight.moveable = true;
        this.knight.setState('RightRun');
        while (this.knight.x < 100) {
            await this.delay (0.5);
        }
        this.knight.moveable = false;
        await this.delay(300);
        this.knight.setState('LeftIdle');
        await this.delay(1000);
        this.knight.setState('LeftAttack2');     
        this.knight.facing = LEFT;
        await this.delay(700);   
        this.swordwave = new Swordwave(this.game, this.knight.x, this.knight.y + 80, this.knight.facing);
        this.game.entities.splice(1, 0, this.swordwave);
        await this.delay(100);
        this.knight.inCutscene = false;
        this.game.camera.inCutscene = false;
        this.knight.moveable = true;
        }
        this.knight.inCutscene = false;
        this.game.camera.inCutscene = false;

    }

    

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
