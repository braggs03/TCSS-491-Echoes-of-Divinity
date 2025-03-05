class ShopMenu {
    constructor(game, scene) {
        this.game = game;
        this.scene = scene;
        this.knight = this.scene.knight;
        
        this.options = [
            {
                id: "swordwave",
                name: "Sword Wave Attack",
                price: 1000,
                purchased: this.knight.hasWaveAttack || false,
                description: "Launch a projectile with your sword",
                oneTimePurchase: true,
                quantity: 1
            },
            {
                id: "damageboost",
                name: "Damage Boost",
                basePrice: 1500,  
                price: 1500,      
                description: "Increase damage by 10% per purchase",
                oneTimePurchase: false,
                quantity: 1,
                maxQuantity: 5
            },
            {
                id: "doublejump",
                name: "Double Jump",
                price: 2000,
                purchased: this.knight.doubleJump || false,
                description: "Increase jump height by 50%",
                oneTimePurchase: true,
                quantity: 1
            },
            {
                id: "potionboost",
                name: "Potion Boost",
                basePrice: 1500,  
                price: 1500,      
                description: "Increase potion healing by 10% per purchase",
                oneTimePurchase: false,
                quantity: 1,
                maxQuantity: 5
            }
        ];
        
        this.selectedIndex = 0;
        this.quantitySelectionActive = false;
        this.confirmationVisible = false;
        this.confirmationIndex = 1; // Default to "No"
        this.errorMessageVisible = false;
        this.errorMessageTimer = 0;
        
        this.keyPressed = false;
        this.fReleased = true;
        
        this.BB = {
            x: 0,
            y: 0,
            width: PARAMS.SCREENWIDTH,
            height: PARAMS.SCREENHEIGHT
        };
        
        this.windowWidth = 600;
        this.windowHeight = 440;
        this.windowX = (PARAMS.SCREENWIDTH - this.windowWidth) / 2;
        this.windowY = (PARAMS.SCREENHEIGHT - this.windowHeight) / 2;
        if (this.scene.dialogBox && !this.scene.dialogBox.removeFromWorld) {
            this.scene.dialogBox.removeFromWorld = true;
        }
    }
    
    updatePrice(option) {
        if (option.oneTimePurchase) return;
        option.price = option.basePrice * option.quantity;
    }
    
    update() {
        if (this.errorMessageVisible) {
            this.errorMessageTimer += this.game.clockTick;
            if (this.errorMessageTimer > 2) { // 2 seconds display time
                this.errorMessageVisible = false;
                this.errorMessageTimer = 0;
            }
        }
        
        if (!this.keyPressed) {
            if (!this.confirmationVisible && !this.errorMessageVisible) {
                if (this.quantitySelectionActive) {
                    // Quantity selection controls
                    const option = this.options[this.selectedIndex];
                    
                    if (this.game.keys["ArrowLeft"]) {
                        option.quantity = Math.max(1, option.quantity - 1);
                        this.updatePrice(option);
                        this.keyPressed = true;
                    } else if (this.game.keys["ArrowRight"]) {
                        option.quantity = Math.min(option.maxQuantity || 1, option.quantity + 1);
                        this.updatePrice(option);
                        this.keyPressed = true;
                    } else if (this.game.keys["f"] && this.fReleased) {
                        // Confirm quantity and show purchase confirmation
                        this.fReleased = false;
                        this.quantitySelectionActive = false;
                        this.confirmationVisible = true;
                        this.confirmationIndex = 1; // Default to "No"
                    } else if (this.game.keys["Enter"]) {
                        this.quantitySelectionActive = false;
                        this.keyPressed = true;
                    }
                } else {
                    // Main menu controls
                    if (this.game.keys["ArrowUp"]) {
                        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                        this.keyPressed = true;
                    } else if (this.game.keys["ArrowDown"]) {
                        this.selectedIndex = Math.min(this.options.length - 1, this.selectedIndex + 1);
                        this.keyPressed = true;
                    } else if (this.game.keys["f"] && this.fReleased) {
                        this.fReleased = false;
                        const option = this.options[this.selectedIndex];
                        if (option.oneTimePurchase && option.purchased) {
                        } else if (option.oneTimePurchase) {
                            this.confirmationVisible = true;
                            this.confirmationIndex = 1; // Default to "No"
                        } else {
                            this.quantitySelectionActive = true;
                        }
                    } else if (this.game.keys["Enter"] || this.game.keys["Escape"]) {
                        this.closeShop();
                        this.keyPressed = true;
                    }
                }
            } else if (this.confirmationVisible && !this.errorMessageVisible) {
                // Confirmation dialog controls
                if (this.game.keys["ArrowLeft"] || this.game.keys["ArrowRight"]) {
                    this.confirmationIndex = this.confirmationIndex === 0 ? 1 : 0;
                    this.keyPressed = true;
                } else if (this.game.keys["f"] && this.fReleased) {
                    this.fReleased = false;
                    if (this.confirmationIndex === 0) { // Yes
                        this.attemptPurchase();
                    } else { // No
                        this.confirmationVisible = false;
                    }
                } else if (this.game.keys["Enter"] || this.game.keys["Escape"]) {
                    this.confirmationVisible = false;
                    this.keyPressed = true;
                }
            } else if (this.errorMessageVisible) {
                if (this.game.keys["f"] && this.fReleased) {
                    this.errorMessageVisible = false;
                    this.errorMessageTimer = 0;
                    this.fReleased = false;
                } else if (this.game.keys["Enter"] || this.game.keys["Escape"]) {
                    this.errorMessageVisible = false;
                    this.errorMessageTimer = 0;
                    this.keyPressed = true;
                }
            }
        }
        if (!this.game.keys["ArrowUp"] && !this.game.keys["ArrowDown"] && 
            !this.game.keys["ArrowLeft"] && !this.game.keys["ArrowRight"] && 
            !this.game.keys["f"] && !this.game.keys["Enter"] && !this.game.keys["Escape"]) {
            this.keyPressed = false;
            this.fReleased = true;
        }
    }
    
    attemptPurchase() {
        const option = this.options[this.selectedIndex];
        if (option.oneTimePurchase && option.purchased) {
            this.confirmationVisible = false;
            return;
        }
        if (this.knight.emberCount < option.price) {
            this.confirmationVisible = false;
            this.errorMessageVisible = true;
            this.errorMessageTimer = 0;
            return;
        }
        
        this.knight.emberCount -= option.price;
    
        switch (option.id) {
            case "swordwave":
                this.unlockSwordWave();
                break;
                
            case "damageboost":
                this.applyDamageBoost(option.quantity);
                break;
                
            case "doublejump":
                this.unlockDoubleJump();
                break;
                
            case "potionboost":
                this.applyPotionBoost(option.quantity);
                break;
        }
        if (!option.oneTimePurchase) {
            option.quantity = 1;
            this.updatePrice(option);
        }
        this.confirmationVisible = false;
    }
    
    unlockSwordWave() {
        this.knight.hasWaveAttack = true;
        this.options[0].purchased = true;

        this.knight.waveDamage = Math.round(this.knight.damage * 1.2);
        
        console.log(`Sword Wave Attack unlocked! Base damage: ${this.knight.waveDamage}`);
    }
    
    applyDamageBoost(quantity) {
        const boostMultiplier = Math.pow(1.1, quantity);
        const oldDamage = this.knight.damage;
        const oldDamagewave = this.knight.waveDamage; 
        this.knight.damage = Math.round(oldDamage * boostMultiplier);
        if (this.knight.hasWaveAttack) {
            this.knight.waveDamage = Math.round(oldDamagewave * boostMultiplier);
        }
        const percentIncrease = Math.round((boostMultiplier - 1) * 100);
        console.log(`Damage increased from ${oldDamage} to ${this.knight.damage} (+${percentIncrease}%)`);
        console.log(`Damage increased from ${oldDamagewave} to ${this.knight.waveDamage} (+${percentIncrease}%)`);
    }
    
    unlockDoubleJump() {
        this.knight.doubleJump = true;
        this.knight.hasDoubleJump = true;
        this.options[2].purchased = true;
        
        console.log("Double Jump ability unlocked!");
    }
    
    applyPotionBoost(quantity) {
        const boostMultiplier = Math.pow(1.1, quantity);
        const oldHealing = this.knight.potionHealCount;
        this.knight.potionHealCount = Math.round(oldHealing * boostMultiplier);

        const percentIncrease = Math.round((boostMultiplier - 1) * 100);
        console.log(`Potion healing increased from ${oldHealing} to ${this.knight.potionHealCount} (+${percentIncrease}%)`);
    }
    
    
    closeShop() {
        if (this.scene.dialogBox && !this.scene.dialogBox.removeFromWorld) {
            this.scene.dialogBox.removeFromWorld = true;
        }
        this.removeFromWorld = true;
        this.game.camera.knight.moveable = true;
        this.game.keys["Enter"] = false;
        this.game.keys["Escape"] = false;
        this.game.camera.escReleased = true;
        this.game.camera.shopMenu = null;
        
        console.log("closed shop menu");
    }
    
    draw(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, PARAMS.SCREENWIDTH, PARAMS.SCREENHEIGHT);
        
        ctx.fillStyle = "rgba(199, 127, 56, 0.9)";
        ctx.fillRect(this.windowX, this.windowY, this.windowWidth, this.windowHeight);

        ctx.strokeStyle = "#8B4513";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.windowX, this.windowY, this.windowWidth, this.windowHeight);
 
        ctx.fillStyle = "#000000"; 
        ctx.font = 'bold 36px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.textBaseline = 'top';
        ctx.fillText("Reina's Shop", PARAMS.SCREENWIDTH / 2, this.windowY + 20);
        ctx.fillStyle = "White";
        ctx.font = '24px "Open+Sans"';
        ctx.textAlign = "right";
        ctx.fillText(`Your Embers: ${this.knight.emberCount}`, this.windowX + this.windowWidth - 20, this.windowY + 25);
        const startY = this.windowY + 90;
        const spacing = 80; // Spacing between options
        
        for (let i = 0; i < this.options.length; i++) {
            const option = this.options[i];
            const yPos = startY + i * spacing;
            
            if (yPos + 60 > this.windowY + this.windowHeight - 40) continue;
            if (i === this.selectedIndex) {
                ctx.fillStyle = "rgba(139, 69, 19, 0.4)";
                ctx.fillRect(this.windowX + 20, yPos - 10, this.windowWidth - 40, 70);
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 3;
                ctx.strokeRect(this.windowX + 20, yPos - 10, this.windowWidth - 40, 70);
            }
            
            ctx.font = 'bold 28px "Open+Sans"';
            ctx.textAlign = "left";
            if (option.oneTimePurchase) {
                ctx.fillStyle = option.purchased ? "#88FF88" : "White";
            } else {
                ctx.fillStyle = "White"; 
            }
            
            ctx.fillText(option.name, this.windowX + 30, yPos);

            ctx.font = '20px "Open+Sans"';
            ctx.fillStyle = "White";
            ctx.fillText(option.description, this.windowX + 30, yPos + 35);
            
            ctx.textAlign = "right";
            ctx.font = 'bold 24px "Open+Sans"';
            
            if (option.oneTimePurchase && option.purchased) {
                ctx.fillStyle = "#88FF88";
                ctx.fillText("PURCHASED", this.windowX + this.windowWidth - 30, yPos + 15);
            } else {
                ctx.fillStyle = this.knight.emberCount >= option.price ? "White" : "rgba(30, 30, 30, 0.9)";
                ctx.fillText(`${option.price} Embers`, this.windowX + this.windowWidth - 30, yPos + 15);
            }
        }
        ctx.fillStyle = "White";
        ctx.font = '20px "Open+Sans"';
        ctx.textAlign = "center";
        if (this.quantitySelectionActive) {
            ctx.fillText("Left/Right: Adjust Quantity | F: Confirm | Enter: Cancel", PARAMS.SCREENWIDTH / 2, this.windowY + this.windowHeight - 30);
        } else {
            ctx.fillText("Arrow Keys: Navigate | F: Select | Enter/Esc: Close", PARAMS.SCREENWIDTH / 2, this.windowY + this.windowHeight - 30);
        }
        if (this.quantitySelectionActive) {
            this.drawQuantitySelector(ctx);
        }
        if (this.confirmationVisible) {
            this.drawConfirmationDialog(ctx);
        }
        if (this.errorMessageVisible) {
            this.drawErrorMessage(ctx);
        }
    }
    
    drawQuantitySelector(ctx) {
        const option = this.options[this.selectedIndex];
        const selectorWidth = 200;
        const selectorHeight = 50;
        const selectorX = this.windowX + this.windowWidth / 2 - selectorWidth / 2;
        const selectorY = this.windowY + this.windowHeight - 90;
        
        ctx.fillStyle = "rgba(30, 30, 30, 0.9)";
        ctx.fillRect(selectorX, selectorY, selectorWidth, selectorHeight);
        
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(selectorX, selectorY, selectorWidth, selectorHeight);
        
        ctx.fillStyle = "White";
        ctx.font = '24px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.fillText(`Quantity: ${option.quantity}`, selectorX + selectorWidth / 2, selectorY + 15);
        
        ctx.fillStyle = this.knight.emberCount >= option.price ? "White" : "rgba(30, 30, 30, 0.9)";
        ctx.font = '20px "Open+Sans"';
        ctx.fillText(`Total: ${option.price} Embers`, selectorX + selectorWidth / 2, selectorY + 35);
        
        ctx.fillStyle = "White";
        ctx.font = '24px "Open+Sans"';
        ctx.textAlign = "center";
        
        if (option.quantity > 1) {
            ctx.fillText("◀", selectorX - 20, selectorY + 25);
        }
        if (option.quantity < (option.maxQuantity || 1)) {
            ctx.fillText("▶", selectorX + selectorWidth + 20, selectorY + 25);
        }
    }
    
    drawConfirmationDialog(ctx) {
        const option = this.options[this.selectedIndex];
        const dialogWidth = 400;
        const dialogHeight = 200;
        const dialogX = PARAMS.SCREENWIDTH / 2 - dialogWidth / 2;
        const dialogY = PARAMS.SCREENHEIGHT / 2 - dialogHeight / 2;
        
        ctx.fillStyle = "rgba(30, 30, 30, 0.95)";
        ctx.fillRect(dialogX, dialogY, dialogWidth, dialogHeight);
        
        ctx.strokeStyle = "rgba(199, 127, 56, 0.9)";
        ctx.lineWidth = 3;
        ctx.strokeRect(dialogX, dialogY, dialogWidth, dialogHeight);
        
        ctx.fillStyle = "White";
        ctx.font = '24px "Open+Sans"';
        ctx.textAlign = "center";

        if (option.oneTimePurchase) {
            ctx.fillText(`Purchase ${option.name}?`, PARAMS.SCREENWIDTH / 2, dialogY + 50);
        } else {
            ctx.fillText(`Purchase ${option.name} (x${option.quantity})?`, PARAMS.SCREENWIDTH / 2, dialogY + 50);
        }
        
        ctx.fillText(`Cost: ${option.price} Embers`, PARAMS.SCREENWIDTH / 2, dialogY + 90);
        
        const buttonWidth = 100;
        const buttonHeight = 50;
        const yesX = dialogX + dialogWidth / 3;
        const noX = dialogX + (dialogWidth * 2/3);
        const buttonY = dialogY + dialogHeight - 50;

        ctx.fillStyle = this.confirmationIndex === 0 ? "rgba(199, 127, 56, 0.9)" : "rgba(50, 50, 50, 0.7)";
        ctx.fillRect(yesX - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight);
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(yesX - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight);

        ctx.fillStyle = this.confirmationIndex === 1 ? "rgba(199, 127, 56, 0.9)" : "rgba(50, 50, 50, 0.7)";
        ctx.fillRect(noX - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight);
        ctx.strokeStyle = "White";
        ctx.lineWidth = 2;
        ctx.strokeRect(noX - buttonWidth/2, buttonY - buttonHeight/2, buttonWidth, buttonHeight);

        ctx.font = '28px "Open+Sans"';
        ctx.fillStyle = "White";
        ctx.fillText("Yes", yesX, buttonY - 10);
        ctx.fillText("No", noX, buttonY - 10);
    }
    
    drawErrorMessage(ctx) {
        const dialogWidth = 400;
        const dialogHeight = 150;
        const dialogX = PARAMS.SCREENWIDTH / 2 - dialogWidth / 2;
        const dialogY = PARAMS.SCREENHEIGHT / 2 - dialogHeight / 2;

        ctx.fillStyle = "rgba(30, 30, 30, 0.95)";
        ctx.fillRect(dialogX, dialogY, dialogWidth, dialogHeight);
        
        ctx.strokeStyle = "#FF0000"; // Red border for error
        ctx.lineWidth = 3;
        ctx.strokeRect(dialogX, dialogY, dialogWidth, dialogHeight);
        
        ctx.fillStyle = "#CC0000"; // Deep red text
        ctx.font = 'bold 28px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.fillText("Not Enough Embers!", PARAMS.SCREENWIDTH / 2, dialogY + 50);
        
        ctx.fillStyle = "White";
        ctx.font = '20px "Open+Sans"';
        ctx.fillText("Press F or Enter to continue", PARAMS.SCREENWIDTH / 2, dialogY + 100);
    }
}

class GameControlsMenu {
    constructor(game, scene) {
        this.game = game;
        this.scene = scene;
        this.visible = true;
        this.removeFromWorld = false;
        this.enterReleased = true;
        
        this.windowWidth = 800;
        this.windowHeight = 600; 
        this.windowX = (PARAMS.SCREENWIDTH - this.windowWidth) / 2;
        this.windowY = (PARAMS.SCREENHEIGHT - this.windowHeight) / 2;
        this.controlSections = [
            {
                title: "Movement Controls",
                x: this.windowX + 200,
                y: this.windowY + 100,
                controls: [
                    { key: "←", description: "Move Left" },
                    { key: "→", description: "Move Right" },
                    { key: "↑", description: "Jump" },
                    { key: "R", description: "Roll (Invincibility)" }
                ]
            },
            {
                title: "Combat Controls",
                x: this.windowX + 200,
                y: this.windowY + 370, 
                controls: [
                    { key: "E", description: "Melee Attack" },
                    { key: "W", description: "Sword Wave" },
                    { key: "G", description: "Use Health Potion" }
                ]
            },
            {
                title: "Interaction Controls",
                x: this.windowX + 600,
                y: this.windowY + 100,
                controls: [
                    { key: "F", description: "Talk/Interact" },
                    { key: "T", description: "Checkpoint Menu" },
                    { key: "Enter", description: "Close Menus" },
                    { key: "Esc", description: "Open Controls" }
                ]
            }
        ];
        
        console.log("Controls menu created");
    }
    
    update() {
        if (this.waitingForEscapeRelease) {
            if (!this.game.keys["Escape"]) {
                this.waitingForEscapeRelease = false;
                console.log("Initial Escape key released, menu is now active");
            }
            return; 
        }
        if (this.game.keys["Enter"] && this.enterReleased) {
            console.log("Closing controls menu via Enter");
            this.enterReleased = false;
            this.close();
        }
        if (!this.game.keys["Enter"]) {
            this.enterReleased = true;
        }
    }
    close() {
        this.removeFromWorld = true;
        this.game.camera.knight.moveable = true;
        this.game.camera.controlsMenu = null;
        console.log("Controls menu closed");
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, PARAMS.SCREENWIDTH, PARAMS.SCREENHEIGHT);

        ctx.fillStyle = "rgba(50, 50, 70, 0.95)";
        ctx.fillRect(this.windowX, this.windowY, this.windowWidth, this.windowHeight);

        ctx.strokeStyle = "#8B4513";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.windowX, this.windowY, this.windowWidth, this.windowHeight);
        
        ctx.fillStyle = "#FFD700";
        ctx.font = 'bold 36px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.textBaseline = 'top';
        ctx.fillText("Game Controls", PARAMS.SCREENWIDTH / 2, this.windowY + 20);
        
        this.controlSections.forEach(section => {
            this.drawControlSection(ctx, section);
        });
        ctx.fillStyle = "#FFFFFF";
        ctx.font = '20px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.fillText("Press Enter to close", PARAMS.SCREENWIDTH / 2, this.windowY + this.windowHeight - 30);
    }
    
    drawControlSection(ctx, section) {
        ctx.fillStyle = "rgba(60, 60, 90, 0.7)";
        const titleWidth = 300;
        const titleHeight = 40;
        const titleX = section.x - titleWidth/2;
        ctx.fillRect(titleX, section.y - 30, titleWidth, titleHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 'bold 28px "Open+Sans"';
        ctx.textAlign = "center";
        ctx.fillText(section.title, section.x, section.y - 20);
        
        let yOffset = section.y + 35; 
        for (let control of section.controls) {
            ctx.fillStyle = "rgba(70, 70, 90, 0.8)";
            const keyBoxX = section.x - 110;
            ctx.fillRect(keyBoxX, yOffset, 60, 40);
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 2;
            ctx.strokeRect(keyBoxX, yOffset, 60, 40);
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = 'bold 24px "Open+Sans"';
            ctx.textAlign = "center";
            ctx.fillText(control.key, keyBoxX + 30, yOffset + 10);
            
            ctx.fillStyle = "#CCCCCC";
            ctx.font = '24px "Open+Sans"';
            ctx.textAlign = "left";
            ctx.fillText(control.description, keyBoxX + 80, yOffset + 10);
            
            yOffset += 45; 
        }
    }
}

    




