const KNIGHT = './resources/knight/';
const SKELETON_WARRIOR = './resources/skeletonwarrior/';
const REINA = './resources/Reina.png';

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload(MECHA_GOLEM);
ASSET_MANAGER.queueDownload(DUNGEON);
ASSET_MANAGER.queueDownload(TORCH);
ASSET_MANAGER.queueDownload("./resources/Azucena.png")
ASSET_MANAGER.queueDownload(REINA);
ASSET_MANAGER.queueDownload("../resources/Lightning.png")
ASSET_MANAGER.queueDownload("../resources/GorgonAttack1.png")
ASSET_MANAGER.queueDownload("../resources/GorgonAttack2.png")
ASSET_MANAGER.queueDownload("../resources/GorgonAttack3.png")
ASSET_MANAGER.queueDownload("../resources/GorgonDead.png")
ASSET_MANAGER.queueDownload("../resources/GorgonHurt.png")
ASSET_MANAGER.queueDownload("../resources/GorgonIdle1.png")
ASSET_MANAGER.queueDownload("../resources/GorgonIdle2.png")
ASSET_MANAGER.queueDownload("../resources/GorgonRun.png")
ASSET_MANAGER.queueDownload("../resources/GorgonSpecial.png")
ASSET_MANAGER.queueDownload("../resources/GorgonWalk.png")
ASSET_MANAGER.queueDownload("../resources/CelesAttack1.png")
ASSET_MANAGER.queueDownload("../resources/CelesAttack2.png")
ASSET_MANAGER.queueDownload("../resources/CelesCharge.png")
ASSET_MANAGER.queueDownload("../resources/CelesDead.png")
ASSET_MANAGER.queueDownload("../resources/CelesHurt.png")
ASSET_MANAGER.queueDownload("../resources/CelesIdle.png")
ASSET_MANAGER.queueDownload("../resources/CelesJump.png")
ASSET_MANAGER.queueDownload("../resources/CelesLightBall.png")
ASSET_MANAGER.queueDownload("../resources/CelesLightCharge.png")
ASSET_MANAGER.queueDownload("../resources/CelesRun.png")
ASSET_MANAGER.queueDownload("../resources/CelesWalk.png")
ASSET_MANAGER.queueDownload("../resources/Title.png")
ASSET_MANAGER.queueDownload("./resources/NightBorneWarrior.png"); // looked pixely to me
ASSET_MANAGER.queueDownload("./resources/Attack_1.png");
ASSET_MANAGER.queueDownload("./resources/Attack_2.png");
ASSET_MANAGER.queueDownload("./resources/Attack_3.png");
ASSET_MANAGER.queueDownload("./resources/Dead.png");
ASSET_MANAGER.queueDownload("./resources/Hurt.png");
ASSET_MANAGER.queueDownload("./resources/Idle.png"); 
ASSET_MANAGER.queueDownload("./resources/Jump.png"); 
ASSET_MANAGER.queueDownload("./resources/Run.png"); // looks kind off
ASSET_MANAGER.queueDownload("./resources/Run+Attack.png"); 
ASSET_MANAGER.queueDownload("./resources/walk.png");
//Knight
ASSET_MANAGER.queueDownload(KNIGHT + "Attack2.png")
ASSET_MANAGER.queueDownload(KNIGHT + "AttackCombo.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Crouch.png")
ASSET_MANAGER.queueDownload(KNIGHT + "CrouchWalk.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Death.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Fall.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Idle.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Jump.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Roll.png")
ASSET_MANAGER.queueDownload(KNIGHT + "Run.png")
//Skeleton Warrior
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_1.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_2.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Attack_3.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Dead.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Hurt.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Idle.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Protect.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Run+attack.png")
ASSET_MANAGER.queueDownload(SKELETON_WARRIOR + "Walk.png")


ASSET_MANAGER.downloadAll(() => {
	const gameEngine = new GameEngine();
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	
	gameEngine.init(ctx);

	new SceneManager(gameEngine);

	gameEngine.start();
});