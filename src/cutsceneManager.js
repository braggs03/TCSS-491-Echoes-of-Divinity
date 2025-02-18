class CutsceneManager {
    constructor(game) {
        this.game = game;
        this.cutsceneArray = [new CutsceneOne(this.game), new CutsceneTwo(this.game), new CutsceneThree(this.game)]
    }
}

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
        await this.delay(200);
        this.knight.setState('RightIdle');

        this.azucena.goRight = true;
        await this.delay(2000);
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
        this.game.camera.showInteractive(this.reina, text.reina2);
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
        this.game.camera.showInteractive(this.azucena, text.azucena2);
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

class CutsceneTwo {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.knight.setState("LeftIdle");
        this.azucena.x = this.knight.x - 1200;
        this.azucena.goRight = true;
        await this.delay(3500);
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
        this.game.camera.loadLevel("shopkeeper", false, false, false);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class CutsceneThree {
    constructor(game) {
        this.game = game;
        this.knight = this.game.entities.find(entity=> entity instanceof Knight);
        this.azucena = this.game.entities.find(entity=> entity instanceof Azucena);
    }

    async run() {
        this.knight.inCutscene = true;
        this.azucena.inCutscene = true;
        this.game.camera.showInteractive(this.azucena, text.azucena4);
        await this.delay(3000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(3000);
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