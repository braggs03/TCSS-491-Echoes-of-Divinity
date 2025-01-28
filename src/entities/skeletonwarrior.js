class SkeletonWarrior {
	constructor(game, ctx) {
		this.game = game;
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
		
        this.animations = {
            RightAttack1 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_1.png"), 0, 0, 130, 200, 5, 0.1, false, false),
            RightAttack2 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_2.png"), 0, 0, 130, 200, 6, 0.1, false, false),
            RightAttack3 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_3.png"), 0, 0, 130, 200, 4, 0.1, false, false),
            RightDead : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Dead.png"), 0, 0, 130, 200, 4, 0.1, false, false),
            RightHurt : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Hurt.png"), 0, 0, 130, 200, 2, 0.1, false, false),
            RightIdle : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Idle.png"), 0, 0, 128, 200, 7, 0.1, false, true),
            RightProtect : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Protect.png"), 0, 0, 130, 200, 1, 0.1, false, true),
            RightRun : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run.png"), 0, 0, 128, 200, 8, 0.1, false, true),
            RightRunattack : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run+attack.png"), 0, 0, 128, 200, 7, 0.1, false, false),
            RightWalk : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Walk.png"), 0, 0, 128, 200, 7, 0.1, false, true),

            LeftAttack1 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_1.png"), 616, 0, 128, 200, 5, 0.1, true, false),
            LeftAttack2 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_2.png"), 750, 0, 128, 200, 6, 0.1, true, false),
            LeftAttack3 : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Attack_3.png"), 504, 0, 128, 200, 4, 0.1, true, false),
            LeftDead : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Dead.png"), 504, 0, 128, 200, 4, 0.1, true, false),
            LeftHurt : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Hurt.png"), 256, 0, 128, 200, 2, 0.1, true, false),
            LeftIdle : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Idle.png"), 904, 0, 128, 200, 7, 0.1, true, true),
            LeftProtect : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Protect.png"), 128, 0, 130, 200, 1, 0.1, true, true),
            LeftRun : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run.png"), 1032, 0, 128, 200, 8, 0.1, true, true),
            LeftRunattack : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Run+attack.png"), 904, 0, 128, 200, 7, 0.1, true, false),
            LeftWalk : new Animator(ASSET_MANAGER.getAsset(SKELETON_WARRIOR + "Walk.png"), 904, 0, 128, 200, 7, 0.1, true, true)

        }

        this.currentState = 'RightIdle'

	};

    setState(state) {
        if (this.animations[state]) {
            this.currentState = state;
        } else {
            console.error("State '${state}' not found.");
        }
    }

	update() {

	};

	draw(ctx) {
		this.animations[this.currentState].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
	};
};