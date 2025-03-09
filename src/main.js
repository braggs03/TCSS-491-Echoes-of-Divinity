const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload(DUNGEON);
ASSET_MANAGER.queueDownload(TORCH);
ASSET_MANAGER.queueDownload(AZUCENA);
ASSET_MANAGER.queueDownload(REINA);
ASSET_MANAGER.queueDownload("./resources/Magic/Lightning.png");
ASSET_MANAGER.queueDownload("./resources/knight/swordwave.png");
ASSET_MANAGER.queueDownload("./resources/Magic/Fire-bomb.png");

// MechaGolem
ASSET_MANAGER.queueDownload(MECHA_GOLEM);
ASSET_MANAGER.queueDownload(MECHA_GOLEM_PROJECTILE);

// Gorgon
ASSET_MANAGER.queueDownload(GORGON + "Attack1.png");
ASSET_MANAGER.queueDownload(GORGON + "Attack2.png");
ASSET_MANAGER.queueDownload(GORGON + "Attack3.png");
ASSET_MANAGER.queueDownload(GORGON + "Dead.png");
ASSET_MANAGER.queueDownload(GORGON + "Hurt.png");
ASSET_MANAGER.queueDownload(GORGON + "Idle1.png");
ASSET_MANAGER.queueDownload(GORGON + "Idle2.png");
ASSET_MANAGER.queueDownload(GORGON + "Run.png");
ASSET_MANAGER.queueDownload(GORGON + "Special.png");
ASSET_MANAGER.queueDownload(GORGON + "Walk.png");

// Celes
ASSET_MANAGER.queueDownload(CELES + "Attack1.png");
ASSET_MANAGER.queueDownload(CELES + "Attack2.png");
ASSET_MANAGER.queueDownload(CELES + "Charge.png");
ASSET_MANAGER.queueDownload(CELES + "Dead.png");
ASSET_MANAGER.queueDownload(CELES + "Hurt.png");
ASSET_MANAGER.queueDownload(CELES + "Idle.png");
ASSET_MANAGER.queueDownload(CELES + "LightCharge.png");
ASSET_MANAGER.queueDownload(CELES + "Run.png");
ASSET_MANAGER.queueDownload(CELES + "Walk.png");

// Background
ASSET_MANAGER.queueDownload(DUNGEON_BACKGROUND_IMAGE);
ASSET_MANAGER.queueDownload(MENU_BACKGROUND);
ASSET_MANAGER.queueDownload("./resources/NightSky.png");
ASSET_MANAGER.queueDownload("./resources/town.png");
ASSET_MANAGER.queueDownload(DUNGEON_BACKGROUND);
ASSET_MANAGER.queueDownload(WATERFALL);
ASSET_MANAGER.queueDownload(DUNGEON_BACKGROUNDL4);
ASSET_MANAGER.queueDownload(LANTERN);
ASSET_MANAGER.queueDownload("./resources/Title.png")
ASSET_MANAGER.queueDownload("./resources/nightBorneWarrior/NightBorneWarrior.png"); 
ASSET_MANAGER.queueDownload("./resources/nightBorneWarrior/NightBorneflip.png");
ASSET_MANAGER.queueDownload("./resources/maintheme.png");

// Werewolf
ASSET_MANAGER.queueDownload(WEREWOLF + "Attack_1.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Attack_2.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Attack_3.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Dead.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Hurt.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Idle.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Jump.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Run.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "Run+Attack.png");
ASSET_MANAGER.queueDownload(WEREWOLF + "walk.png");

// Knight
ASSET_MANAGER.queueDownload(KNIGHT_SPRITE);

// Skeleton Warrior
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_1.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_2.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_3.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Dead.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Idle.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Protect.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Hurt.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run+attack.png");
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Walk.png");

// Duma
ASSET_MANAGER.queueDownload(DUMA + "Attack.png");
ASSET_MANAGER.queueDownload(DUMA + "Attack2.png");
ASSET_MANAGER.queueDownload(DUMA + "Idle.png");

//Music
ASSET_MANAGER.queueDownload(BACKGROUND_MUSIC);
ASSET_MANAGER.queueDownload(MAIN_MUSIC);
ASSET_MANAGER.queueDownload(LUCAN_MUSIC);
ASSET_MANAGER.queueDownload(CELES_MUSIC);
ASSET_MANAGER.queueDownload(DUMA_MUSIC);

// Sound Effects
ASSET_MANAGER.queueDownload("./resources/SoundEffects/emberLight.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/fireAttack.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/jump.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/knightAttack.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/land.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/openDoor.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/run.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/roll.ogg");
ASSET_MANAGER.queueDownload("./resources/SoundEffects/lightning.ogg");


ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	
	ctx.imageSmoothingEnabled = false;
	
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});