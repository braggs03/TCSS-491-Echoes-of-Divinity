const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload(MECHA_GOLEM);
ASSET_MANAGER.queueDownload("../resources/Azucena.png")
ASSET_MANAGER.queueDownload("../resources/Reina.png")
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

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);

	gameEngine.start();
});
