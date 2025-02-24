class TransitionScreen {
    constructor(game, level, dead, end) {
        Object.assign(this, { game, level, dead, end });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;

        if(this.dead){
            if (this.elapsed > 2) {
                this.game.camera.loadLevel(this.level, false, false, false, false); 
                this.game.camera.deadcheckpoint = false;           
            }
        } else {
            if (this.elapsed > 0.3) {
                this.game.camera.loadLevel(this.level, false, false, false, this.end);            
            }
        }
    }

    draw(ctx) {   
        this.game.camera.knight.removeFromWorld = true;    
        if(this.dead) {
            ctx.fillStyle = "Black";
            ctx.fillRect(0, 0, PARAMS.SCREENWIDTH, PARAMS.SCREENHEIGHT);
            ctx.fillStyle = "Red"
            ctx.textAlign = "center"
            ctx.font = "50px Times";
            ctx.fillText("YOU DIED", PARAMS.SCREENWIDTH / 2, PARAMS.SCREENHEIGHT / 2);
        } else {
            ctx.fillStyle = "Black";
            ctx.fillRect(0, 0, PARAMS.SCREENWIDTH, PARAMS.SCREENHEIGHT);
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.font = "50px Open Sans";
            ctx.fillText("Loading", PARAMS.SCREENWIDTH / 2, PARAMS.SCREENHEIGHT / 2);
        }
       
        



    }
}
