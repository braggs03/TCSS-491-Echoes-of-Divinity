class HealthBar {
    constructor(agent) {
        this.agent = agent;
    }

    update() {
        
    }

    draw(ctx) {
        let alwaysShow = this.agent instanceof Knight; 
        if (alwaysShow || this.agent.hp < this.agent.maxHp) { // Show only when damaged
            let ratio = this.agent.hp / this.agent.maxHp;
            let barWidth = 120;
            let barHeight = 20;  
            let barX = this.agent.x + 170 - barWidth / 2 - this.agent.game.camera.x;
            let barY = this.agent.y + this.agent.height - 20 - this.agent.game.camera.y; 

            ctx.fillStyle = "Red"; 
            ctx.fillRect(barX, barY, barWidth, barHeight); 
            ctx.fillStyle = "Green";
            ctx.fillRect(barX, barY, barWidth * ratio, barHeight); 
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);
       
            ctx.fillStyle = "White";  
            ctx.font = '24px "Open+Sans"';
            ctx.textAlign = "center";
            ctx.fillText(`${this.agent.hp} / ${this.agent.maxHp}`, barX + barWidth / 2, barY + barHeight - 2);
        }
    }
}
class PotionEffect {
    constructor(game, x, y, imagePath) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imagePath;
        this.frameWidth = 64;
        this.frameHeight = 64;
        this.frameCount = 8;
        this.currentFrame = 0;
        this.duration = 0.8;
        this.elapsedTime = 0;
        this.frameDuration = this.duration / this.frameCount;
        this.removeFromWorld = false;
        this.scale = 2; // Make it larger
    }

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime >= this.duration) {
            this.removeFromWorld = true;
        }
        this.currentFrame = Math.floor(this.elapsedTime / this.frameDuration) % this.frameCount;
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, 
                this.currentFrame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
                this.x - this.game.camera.x, this.y - this.game.camera.y, 
                this.frameWidth * this.scale, this.frameHeight * this.scale);
        }
    }
}
    




