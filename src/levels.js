const levels = {
    one: {
        width: 30000,
        height: 0,
        knightPos: {
            x: 87,
            y: 400,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 },{ x: 20, y: 11, w: 1, h: 1 }],
        mechagolem: [{ x: 900, y: 350 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }],
        dungeonDoor: [{ x: 117, y: 465, level: "two" }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },
    two: {
        width: 10000,
        height: 0,
        knightPos: {
            x: 87,
            y: 320,
        },
        dungeonBackground3: [{ x:0, y:0, w:50, h: 1}],
        dungeonGround2: [{ x: 0, y: 14.5, w: 6, h: 1 }, {x:7, y: 14.5, w: 8, h:1},{ x: 16, y: 14.5, w: 8, h: 1 },{ x:25, y: 14.5, w: 10, h: 1 }, {x: 36, y: 14.5, w: 8, h: 1}, {x: 45, y: 14.5, w: 8, h: 1}, {x: 54, y: 14.5, w: 10, h: 1}, { x: 0, y: 0, w: 100, h: 1 }],
       //mechagolem: [{ x: 950, y: 270 }],
        dungeonWall: [{ x: 0, y: 0, h: 4 }],
        dungeonWaterfall: [{x: 950, y: 219}, { x: 2345, y: 219}, {x:3735, y: 219}, {x: 5445, y:219}, {x: 6835, y: 219}, {x: 8235, y: 219}],
        dungeonDoor: [{ x: 124, y: 360, level: "shopkeeper" }],

        

    },

    shopkeeper: {
        width: 1085,
        height: 0,
        knightPos: {
            x: 70,
            y: 400,
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
    },
};
