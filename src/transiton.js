class TransitionScreen {
    constructor(game, level, x, y) {
        Object.assign(this, { game, level, x, y });

        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        
        if (this.elapsed > 2) this.game.camera.loadLevel(this.level, this.x, this.y, false);
    }

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.SCREENWIDTH, PARAMS.SCREENHEIGHT);
        ctx.fillStyle = "Red"
        ctx.font = "50px Times";
        ctx.fillText("YOU DIED", PARAMS.SCREENWIDTH / 2, PARAMS.SCREENHEIGHT / 2);

        



    }


}