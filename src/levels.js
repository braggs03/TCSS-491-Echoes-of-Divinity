let levels = {
    startScreen: {
        width: 800,
        height: 600,
        background: "black",
        fadeTime: 1500,
        text: [
            { x: 640, y: 360, message: "START", font: "40px Arial", color: "white" },
            { x: 640, y: 400, message: "Press SPACE to start or press ENTER to skip story recap", font: "20px Arial", color: "white" },
            { x: 640, y: 440, message: "(It's like a minute and 30 seconds long, you try summarizing 11 pages of lore.)", font: "20px Arial", color: "white" },
        ]
    },

    storyRecap: {
        width: 800,
        height: 600,
        background: "black",
        fadeTime: 5294,
        text: [
            { x: 640, y: 25, message: "In a land ravaged by conflict, the twin gods Duma and Mica intervened in mankind’s fate, believing humanity to be inherently cruel.", font: "20px Arial", color: "white" },
            { x: 640, y: 64, message: "Their divine intervention sought to impose order, but as their war continued, Mica began to see the compassion hidden within mankind.", font: "20px Arial", color: "white" },
            { x: 640, y: 103, message: "Witnessing acts of kindness amidst the chaos, Mica came to believe this was humanity’s true nature.", font: "20px Arial", color: "white" },
            { x: 640, y: 142, message: "She shared these thoughts with Duma, but he rejected her, convinced that mankind could only be ruled with an iron fist.", font: "20px Arial", color: "white" },
            { x: 640, y: 181, message: "This divide sparked the War of the Iron Dawn, a brutal conflict between the siblings to control the future of mankind.", font: "20px Arial", color: "white" },
            { x: 640, y: 220, message: "The war culminated in the Battle of the Twin Fates, where Mica emerged victorious.", font: "20px Arial", color: "white" },
            { x: 640, y: 259, message: "Sparing her brother, Mica stole Duma's power and exiled him to an eternal life without power.", font: "20px Arial", color: "white" },
            { x: 640, y: 298, message: "Mica united the world under the name, Aurathis, forming the Kingdom of Thalador at it's center.", font: "20px Arial", color: "white" },
            { x: 640, y: 337, message: "Aurathis saw 4000 years of peace under Mica’s guidance. However, Duma’s anger never waned.", font: "20px Arial", color: "white" },
            { x: 640, y: 376, message: "After millennia of exile, he returned, sowing seeds of greed and ambition among mankind’s powerful, turning them against Mica. ", font: "20px Arial", color: "white" },
            { x: 640, y: 415, message: "The betrayal culminated in Mica’s death at Duma’s hands, and the world was plunged into chaos once more as Duma reclaimed his godly power.", font: "20px Arial", color: "white" },
            { x: 640, y: 454, message: "Before her death, Mica bestowed the last remnants of her power upon a young knight, granting him the ability to return from death.", font: "20px Arial", color: "white" },
            { x: 640, y: 493, message: "Known as Mica’s Chosen, he rose to lead the Rising Flame, a group of Mica’s loyal followers, in a long war to reclaim the world.", font: "20px Arial", color: "white" },
            { x: 640, y: 532, message: "After years of struggle, the Rising Flame slowly began to reclaim the land, undoing Duma’s corruption.", font: "20px Arial", color: "white" },
            { x: 640, y: 571, message: "Now, the time has come for the final battle.", font: "20px Arial", color: "white" },
            { x: 640, y: 610, message: "With his companions, Azucena and Reina, Mica’s Chosen prepares to march on Thalador to confront Duma one last time.", font: "20px Arial", color: "white" },
            { x: 640, y: 649, message: "It's time for humanity to decide it's fate. Whether it will succumb to... or overcome the...", font: "20px Arial", color: "white" },
        ],
        reina: [{ x: 30, y: 50 }],
    },

    mainMenu: {
        width: 800,
        height: 600,
        background: "black",
        title: [{ x: 340, y: 70 }],
        menuBackground: [{ x: 0, y: 0, w: 1, h: 1}],
    },

    tutorial: {
        width: 1500,
        height: 0,
        startPosition: {
            x: -90,
            y: 440,
        },
        reina: [{ x: 300, y: 536 }],
        azucena: [{ x: -165, y: 500 }],
        cutscene: [{startX: -100, cutsceneNum: 0}],
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }],
        skeleton: [{ x: 1200, y: 424 }, { x: 1400, y: 424 }, { x: 1600, y: 424 }, { x: 1800, y: 424 }],
        lightning: [{x: -40, y: 40}],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
        townBackground: [{ x:0, y:0, w:50, h: 1}],
    },

    one: {
        width: 13550,
        height: -2000,
        startPosition: {
            x: 87,
            y: 465,
        },
        endPosition: {
            x: 14470,
            y: 465,
        },
        checkpoint1:{ //bonFire position change both
            x: 400,
            y: 465,
        },
        checkpoint2:{ //bonFire position change both
            x: 13700,
            y: 465,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 40, y: 12, w: 2, h: 1 }, { x: 44, y: 10, w: 10, h: 1 }, { x: 55, y: 17, w: 42, h: 1 }, { x: 97, y: 12, w: 1, h: 1 }],
        movingPlatform: [{x:1, y: 5, w:1, h:1}],
        skeleton: [{ x: 1200, y: 424 }, { x: 1400, y: 424 }, { x: 1600, y: 424 }, { x: 1800, y: 424 }, { x: 9000, y: 424 }, { x: 9200, y: 424 }, { x: 9400, y: 424 }, { x: 9600, y: 424 }],
        mechagolem: [{ x: 4500, y: 350 },{ x: 7500, y: 100},{ x: 12500, y: 350}],
        dungeonWall: [{ x: 0, y: 0, h: 5 }],
        dungeonDoor: [{ x: 117, y: 465, level: "shopkeeper", end: false }, { x: 14500, y: 465, level: "two", end: false }],
        bonFire: [{ x: 13700, y: 465, level: "one" }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    two: {
        width: 10345,
        height: 0,
        startPosition: {
            x: 87,
            y: 320,
        },
        endPosition: {
            x: 11220,
            y: 320,
        },
        checkpoint3:{ //bonFire position change both
            x: 10900,
            y: 320,
        },
        bonFire: [ { x: 10900, y: 365, level: "two" }],
        dungeonBackground3: [{ x:0, y:0, w:3, h: 1}],
        dungeonGround2: [{ x: 0, y: 14.5, w: 6, h: 1 }, {x:7, y: 14.5, w: 8, h:1},{ x: 16, y: 14.5, w: 19, h: 1 }, {x: 36, y: 14.5, w: 8, h: 1}, {x: 45, y: 14.5, w: 8, h: 1}, {x: 54, y: 14.5, w: 10, h: 1}, {x: 64, y: 14.5, w: 16, h:1}, { x: 0, y: 0, w: 75, h: 1 }],
        gorgon: [{ x: 1500, y: 325 }, {x: 3000, y: 325}, {x: 4900, y: 325}, {x: 5900, y: 325}, {x: 8000, y: 325}],
        wallspike: [{x: 4450, y: 185}, {x: 4225, y: 185}, {x: 3700, y: 185}, {x: 9000, y: 185}, {x: 8870, y: 185}],
        dungeonWall: [{ x: 0, y: 0, h: 4 }, { x: 290, y: 0, h: 2}],
        dungeonWaterfall: [{x: 950, y: 219}, { x: 2345, y: 219}, {x: 5445, y:219}, {x: 6835, y: 219}, {x: 8235, y: 219}],
        dungeonDoor: [{ x: 124, y: 360, level: "one", end: true }],
        cutscene: [{startX: 10800, cutsceneNum: 3}, {startX: 11250, cutsceneNum: 4}],
        reina: [{ x: 11100, y: 439 }],
        azucena: [{ x: 11200, y: 400 }],
    },

    shopkeeper: {
        width: 1085,
        height: 0,
        startPosition: {
            x: 70,
            y: 445,
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
        //lucan: [{ x: 800 , y: 400 }],
        dungeonTorch: [{ x: 103, y: 465 }, { x: 278, y: 465 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }, { x: 58, y: 0, h: 5 }],
        wallAxe: [{ x: 1726, y: 520 }],
        swordRack: [{ x: 1300, y: 608 }],
        shieldRack: [{ x: 1400, y: 608 }],
        boxes: [{ x: 800, y: 524 }, { x: 950, y: 524 }],
        reina: [{ x: 1620, y: 537, text: "reina_shopkeeper" }],
        azucena: [{ x: 870, y: 510 }],
        tent: [{ x: 700, y: 478 }],
        bonFire: [{ x: 400, y: 465, level: "shopkeeper" }],
        potion: [{ x: 788, y: 570}, { x: 888, y: 570}, { x: 990, y: 570}],
        sharpening_wheel: [{ x: 1850, y: 620 }],
        knightStatue: [{ x: 1840, y: 210 }],
        cutscene: [{startX: 70, cutsceneNum: 2}],
    },

    bossOne: {
        width: 800,
        height: 0,
        startPosition: {
            x: -200,
            y: 430,
        },
        cutscene: [{startX: -300, cutsceneNum: 5}],
        dungeonWall: [{ x: 51, y: 0, h: 5 }],
        reina: [{ x: 200, y: 536 }],
        azucena: [{ x: 100, y: 500 }],
        lucan: [{x: 1200, y: 435}],
        dungeonGround: [{ x: -2, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    bossTwo: {
        width: 0,
        height: 0,
        startPosition: {
            x: 200,
            y: 430,
        },
        celes: [{ x: 400, y: 450 }],
        dungeonWall: [{ x: 31, y: 0, h: 5 }, { x: 0, y: 0, h: 3 }],
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
    },

    bossThree: {
        width: 0,
        height: 0,
        startPosition: {
            x: 200,
            y: 430,
        },
        duma: [{ x: 750, y: 275 }],
        dungeonWall: [{ x: 31, y: 0, h: 5 }, { x: 0, y: 0, h: 3 }],
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 7.5, y: 9, w: 1, h: 1 }, { x: -0.25, y: 9, w: 1, h: 1 }],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
    },
};

let originalLevels = structuredClone(levels);


