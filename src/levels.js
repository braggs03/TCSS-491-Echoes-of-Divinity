const levels = {
    one: {
        width: 30000,
        height: 0,
        knightPos: {
            x: 87,
            y: 400,
        },
        checkpoint:{ //bonFire position change both
            x: 400,
            y: 465,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 },{ x: 20, y: 11, w: 1, h: 1 }],
        mechagolem: [{ x: 900, y: 350 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }],
        dungeonDoor: [{ x: 117, y: 465, level: "shopkeeper" }],
        bonFire: [{ x: 400, y: 465, level: "one" }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    shopkeeper: {
        width: 1085,
        height: 0,
        knightPos: {
            x: 70,
            y: 400,
        },
        checkpoint:{ //bonFire position change both
            x: 400,
            y: 465,
        },
        dungeonBackground: [{ x: 0, y: 30, w: 25, h: 7 }],
        chandelier: [{ x: 550, y: 40 }, { x: 1650, y: 40 }],
        dungeonGround: [{ x: 0, y: 0, w: 15, h: 1 }, { x: 0, y: 17, w: 15, h: 1 }],
        dungeonWorkbench: [{ x: 1500, y: 510 }],
        dungeonAnvil: [{ x: 1730, y: 613 }],
        dungeonDoor: [{ x: 100, y: 465, level: "one" }],
        dungeonTorch: [{ x: 103, y: 465 }, { x: 278, y: 465 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }, { x: 58, y: 0, h: 5 }],
        wallAxe: [{ x: 1726, y: 520 }],
        swordRack: [{ x: 1300, y: 608 }],
        shieldRack: [{ x: 1400, y: 608 }],
        boxes: [{ x: 800, y: 524 }, { x: 950, y: 524 }],
        reinaIdle: [{ x: 1620, y: 537 }],
        azucendaIdle: [{ x: 870, y: 510 }],
        tent: [{ x: 700, y: 478 }],
        bonFire: [{ x: 400, y: 465, level: "shopkeeper" }],
    },
};