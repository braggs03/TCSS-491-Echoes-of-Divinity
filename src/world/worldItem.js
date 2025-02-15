class WorldItem {
    constructor(gameEngine, x, y, width, height, scale, sprite_sheet, horizontal_count, vertical_count) {
        Object.assign(
            this, 
            { 
                gameEngine, 
                x, 
                y, 
                width, 
                height, 
                scale, 
                sprite_sheet, 
                horizontal_count, 
                vertical_count 
            }
        );
    }

    draw() {
        for (let l = 0; l < this.h; l++) {
            for (let k = 0; k < this.w; k++) {
                ctx.drawImage(this.spritesheet, 200, 1432, DUNEGON_GROUND_WIDTH, DUNEGON_GROUND_HEIGHT, this.x + (k * DUNEGON_GROUND_WIDTH * this.scale) - this.game.camera.x, this.y * DUNEGON_GROUND_HEIGHT * this.scale - this.game.camera.y, DUNEGON_GROUND_WIDTH * this.scale, DUNEGON_GROUND_HEIGHT * this.scale);
            }
        }
        this.BB.draw(ctx);
    }
}