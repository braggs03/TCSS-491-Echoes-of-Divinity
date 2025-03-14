class HealthBar {
    constructor(agent) {
        this.agent = agent;
    }

    update() {
        
    }

    draw(ctx) {
        let alwaysShow = this.agent instanceof Knight; 
        if (alwaysShow || this.agent.hp < this.agent.maxHp) { // Show only when damaged
            let displayHp = Math.max(0, this.agent.hp);
            let ratio = displayHp / this.agent.maxHp;
            let barWidth = 120;
            let barHeight = 20;  
            let barX = this.agent.x + 170 - this.agent.bheight - barWidth / 2 - this.agent.game.camera.x;
            let barY = this.agent.y + this.agent.height - 30 - this.agent.game.camera.y; 

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
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'top';
            ctx.fillText(`${this.agent.hp} / ${this.agent.maxHp}`, barX + barWidth / 2, barY - 1);
        }
    }
}

class ShieldBar {
    constructor(agent) {
        this.agent = agent;
    }

    update() {

    }

    draw(ctx) {
        let alwaysShow = this.agent instanceof Knight;
        if (alwaysShow || this.agent.hp < this.agent.maxHp) { // Show only when damaged
            let displayShield = Math.max(0, this.agent.shield);
            let ratio = displayShield / this.agent.maxShield;
            let barWidth = 120;
            let barHeight = 10;
            let barX = this.agent.x + 170 - this.agent.bheight - barWidth / 2 - this.agent.game.camera.x;
            let barY = this.agent.y + this.agent.height - 40 - this.agent.game.camera.y;

            ctx.fillStyle = "Red";
            ctx.fillRect(barX, barY, barWidth, barHeight);
            if (this.agent instanceof Celes) {
                ctx.fillStyle = "rgba(255, 165, 0, 0.8)";
            } else {
                ctx.fillStyle = "Cyan";
            }
            ctx.fillRect(barX, barY, barWidth * ratio, barHeight);
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);

            ctx.fillStyle = "White";
            ctx.font = '24px "Open+Sans"';
            ctx.textAlign = "center";
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'top';
        }
    }
}

class PotionEffect {
    constructor(game, x, y, type, healAmount) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type; 
        this.healAmount = healAmount || 200; // Default to 200 if not specified

        this.duration = 1.5; 
        this.elapsedTime = 0;
        this.removeFromWorld = false;
        
        this.floatSpeed = 1.5; 
        this.fadeStart = 0.7; 
    }
    
    update() {
        this.elapsedTime += this.game.clockTick;
        
        // Float upward effect
        this.y -= this.floatSpeed;
        
        // Remove when duration is complete
        if (this.elapsedTime >= this.duration) {
            this.removeFromWorld = true;
        }
    }
    
    draw(ctx) {
        // Calculate opacity for fade-out effect
        let opacity = 1.0;
        if (this.elapsedTime > this.duration * this.fadeStart) {
            opacity = 1.0 - ((this.elapsedTime - (this.duration * this.fadeStart)) / 
                             (this.duration * (1 - this.fadeStart)));
        }
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        if (this.type === "health") {
            ctx.font = 'bold 30px "Open+Sans"';
            ctx.fillStyle = '#22cc22';
            ctx.strokeStyle = '#004400'; 
            ctx.lineWidth = 3;
            ctx.textAlign = 'center';

            const drawX = this.x - this.game.camera.x;
            const drawY = this.y - this.game.camera.y;

            // Display the actual heal amount instead of hardcoded value
            ctx.strokeText(`+${Math.round(this.healAmount)} Health`, drawX, drawY);
            ctx.fillText(`+${Math.round(this.healAmount)} Health`, drawX, drawY);
        }
        
        ctx.restore();
    }
}  




