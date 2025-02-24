class CheckpointMenu {
    constructor(game, entity) {
        Object.assign(this, { game, entity});
        this.game = game;
        this.game.checkpointmenu = this;
        this.selectedIndex = 0; // Index of currently selected checkpoint
        this.visible = true;
    }

    update() {      
        if (this.game.keys["ArrowUp"] && !this.keypressed) {
            this.selectedIndex = (this.selectedIndex - 1 + this.game.camera.discoveredCheckpoints.length) % this.game.camera.discoveredCheckpoints.length;
            this.keypressed = true;
        } else if (this.game.keys["ArrowDown"] && !this.keypressed) {
            this.selectedIndex = (this.selectedIndex + 1) % this.game.camera.discoveredCheckpoints.length;
            this.keypressed = true;
        } else if (this.game.keys["Enter"] && !this.keypressed) {
            this.selectedCheckpoint = this.game.camera.discoveredCheckpoints[this.selectedIndex];
            this.game.camera.currentCheckpoint = this.selectedCheckpoint;
            this.game.camera.teleportToCheckpoint(this.selectedCheckpoint);
            this.visible = false;
            this.keypressed = true;
        } else if (this.game.keys["g"] && !this.keypressed) {
            this.visible = false;
            this.keypressed = true;
        } 
        
        // Reset `keypressed` when all keys are released
        if (!this.game.keys["ArrowUp"] && 
            !this.game.keys["ArrowDown"] && 
            !this.game.keys["Enter"] && 
            !this.game.keys["g"]) {
            this.keypressed = false;
        }

        //close teleport menu
        if (!this.visible) {
            this.game.camera.closeCheckpointMenu();
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {   
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, this.game.camera.level.width, this.game.camera.level.height);
        // ctx.roundRect(this.entity.x + this.entity.width / 2, this.entity.y, 50, 3);
        ctx.fillStyle = "white";
        ctx.font = "20px Open+Sans";
        // console.log(this.entity)
        ctx.fillText("Teleport to: (g to exit)", PARAMS.SCREENWIDTH / 2, PARAMS.SCREENHEIGHT / 2 - 30);

        this.game.camera.discoveredCheckpoints.forEach((element, index) => {
            if (index === this.selectedIndex) {
                ctx.fillStyle = "yellow";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillText(`Level ${element.level}: ${element}`, PARAMS.SCREENWIDTH / 2, PARAMS.SCREENHEIGHT / 2 + index * 30);
        });
        
    }
}