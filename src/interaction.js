class Interaction {
    constructor(game, scene, entity, text) {
        Object.assign(this, { game, scene, entity, text });
        this.currentDialog = 0;
        this.finished = false;
    }

    update() {
        let that = this.entity;
        if (this.game.keys["f"]) {
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
        const padding = 5;
        const dialog = this.text[this.currentDialog];
        const maxWidthLine = dialog.reduce(
            (largest, element) => {
                const length = ctx.measureText(element).width;
                return length > largest ? length : largest;
            },
            0
        );
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#bbbbbb';
        ctx.beginPath();
        ctx.roundRect(this.entity.BB.x - padding - maxWidthLine / 2 + this.entity.BB.width / 2, this.entity.BB.y - padding, maxWidthLine + padding * 2, -dialog.length * 50, 3);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        dialog.map((line, index) => {
            ctx.fillText(line, this.entity.BB.x - maxWidthLine / 2 + this.entity.BB.width / 2, (this.entity.BB.y - dialog.length * 50) + 50 * index);
        });
        if (this.currentDialog == this.text.length - 1) {
            this.finished = true;
        }
    }
}

function testInteractable(entity, text) {
    if (!entity.game.camera.interactable && !entity.dialogCompleted) {
        let that = entity;
        entity.game.entities.forEach((entity) => {
            if (entity.BB && that.BB.collide(entity.BB) && entity instanceof Knight && that.game.keys["f"]) {
                    that.game.camera.showInteractive(that, text);
            }
        });
    }  
}