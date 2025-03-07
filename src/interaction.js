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
                if (this.entity instanceof Reina && this.entity.text === "reina_shopkeeper") {
                    this.game.camera.showShopMenu();
                }
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

const INTERACTABLE_HINT_WIDTH = 39;
const INTERACTABLE_HINT_HEIGHT = 31;
const INTERACTABLE_HINT_SCALE = 2;
const F_X_OFFSET = 40;
const F_Y_OFFSET = 9;

function testInteractable(game, ctx) {
    if (!game.camera.interactable) {
        game.entities.forEach((entity) => {
            if (entity.BB && game.camera.knight.BB.collide(entity.BB) && !game.camera.knight.inCutscene) {
                if (!entity.dialogCompleted) {
                    if (entity.text && game.keys["f"]) {
                        game.camera.showInteractive(entity, entity.text);
                    } else if (entity.text || (entity instanceof Bonfire && !entity.isCurrent) || entity instanceof DungeonDoor || entity instanceof Potion) {
                        ctx.fillStyle = "Black";
                        ctx.strokeStyle = "Black";
                        ctx.font = '30px "Open+Sans"';
                        ctx.textAlign = "center";
                        ctx.textBaseline = 'top';
                        ctx.drawImage(ASSET_MANAGER.getAsset(DUNGEON), 1536, 984, INTERACTABLE_HINT_WIDTH, 31, entity.BB.right - INTERACTABLE_HINT_WIDTH, entity.BB.y - INTERACTABLE_HINT_HEIGHT, INTERACTABLE_HINT_WIDTH * INTERACTABLE_HINT_SCALE, INTERACTABLE_HINT_HEIGHT * INTERACTABLE_HINT_SCALE);
                        ctx.fillText("F", entity.BB.right + F_X_OFFSET - INTERACTABLE_HINT_WIDTH, entity.BB.y + F_Y_OFFSET - INTERACTABLE_HINT_HEIGHT);
                        ctx.strokeText("F", entity.BB.right + F_X_OFFSET - INTERACTABLE_HINT_WIDTH, entity.BB.y + F_Y_OFFSET - INTERACTABLE_HINT_HEIGHT);   
                    }
                }
            }
        });
    }
}