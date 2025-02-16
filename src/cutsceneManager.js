class CutsceneManager {
    constructor(game) {
        this.game = game;
        this.cutsceneArray = [new CutsceneOne(game)]
    }
}

class CutsceneOne {
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
        this.knight.setState('RightRoll');
        await this.delay(500);

        this.azucena.goRight = true;
        await this.delay(2000);
        this.azucena.goRight = false;
        this.azucena.setState(this.azucena.idleLeft())
        this.game.camera.showInteractive(this.reina, text.reina1);
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.azucena, text.azucena1);
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.reina, text.reina2);
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();
        this.game.camera.showInteractive(this.azucena, text.azucena2);
        await this.delay(2000);
        this.game.camera.interactable.currentDialog++;
        await this.delay(2000);
        this.game.camera.removeInteractive();

        this.knight.setState('RightAttack1');
        await this.delay(2000);
        this.knight.velocityX = 0;
        this.game.camera.inCutscene = false;
        this.knight.inCutscene = false;
        this.knight.moveable = true;
        this.azucena.inCutscene = false;
        this.reina.inCutscene = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}