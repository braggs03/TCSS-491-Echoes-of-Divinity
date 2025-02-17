class HealthBar {
    constructor(agent) {
        this.agent = agent;
    }

    update() {
        
    }

    draw(ctx) {
        if (this.agent.hp < this.agent.maxHp) { // Show only when damaged
            let ratio = this.agent.hp / this.agent.maxHp;
            let color = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";

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



