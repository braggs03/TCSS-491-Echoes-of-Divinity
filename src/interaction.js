class Interaction {
    constructor(game, scene, entity, text) {
        Object.assign(this, { game, scene, entity, text });
        this.currentDialog = 0;
        this.finished = false;
    }

    update() {
        if (this.game.keys["f"] && !this.game.camera.knight.inCutscene) {
            if (this.game.camera.interactable ==  undefined && this.fReleased) {
                this.fReleased = false;
            } else if (this.game.camera.interactable && !this.game.camera.interactable.finished && this.fReleased) {
                this.fReleased = false;
                this.game.camera.interactable.currentDialog++;
            } else if (this.game.camera.interactable && this.fReleased) {
                this.fReleased = false;
                this.game.camera.removeInteractive();
            }
        } else {
            this.fReleased = true;
        }
    }

    draw(ctx) {
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#bbbbbb';
        ctx.font = '36px "Open+Sans"';
        const padding = 5;
        const dialog = text[this.text][this.currentDialog];
        const maxWidthLine = dialog.reduce(
            (largest, element) => {
                const length = ctx.measureText(element).width;
                return length > largest ? length : largest;
            },
            0
        );
        ctx.beginPath();
        ctx.roundRect(this.entity.BB.x - padding - maxWidthLine / 2 + this.entity.BB.width / 2, this.entity.BB.y - padding, maxWidthLine + padding * 2, -dialog.length * 50, 3);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        dialog.map((line, index) => {
            ctx.fillText(line, this.entity.BB.x - maxWidthLine / 2 + this.entity.BB.width / 2 + (maxWidthLine - ctx.measureText(line).width) / 2, (this.entity.BB.y - dialog.length * 50) + 50 * index);
        });
        if (this.currentDialog == text[this.text].length - 1) {
            this.finished = true;
        }
    }
}

function testInteractable(game) {
    if (!game.camera.interactable) {
        game.entities.forEach((entity) => {
            if (entity.BB && game.camera.knight.BB.collide(entity.BB) && !game.camera.knight.inCutscene && entity.text && !entity.dialogCompleted && game.keys["f"]) {
                game.camera.showInteractive(entity, entity.text);
            }
        });
    }
}