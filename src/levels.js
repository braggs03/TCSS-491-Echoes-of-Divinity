const levels = {
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
        ]
    },

    mainMenu: {
        width: 800,
        height: 600,
        background: "black",
        title: [{ x: 340, y: 70 }],
        menuBackground: [{ x: 0, y: 0, w: 1, h: 1}],
        text: [
            { x: 640, y: 400, message: "Press SPACE to start", font: "20px Arial", color: "white" }
        ]
    },

    tutorial: {
        width: 2000,
        height: 0,
        knightPos: {
            x: -90,
            y: 440,
        },
        reina: [{ x: 300, y: 536 }],
        azucena: [{ x: -165, y: 500 }],
        cutscene: [{startX: 3000, cutsceneNum: 1}],
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }],
        skeleton: [{ x: 1200, y: 424 }, { x: 1400, y: 424 }, { x: 1600, y: 424 }, { x: 1800, y: 424 }],
        gorgon: [{x: 1000, y: 424}],
        lightning: [{x: -40, y: 40}],
        tutorialBackground: [{ x:0, y:0, w:50, h: 1}],
        townBackground: [{ x:0, y:0, w:50, h: 1}],
    },

    one: {
        width: 30000,
        height: 0,
        startPosition: {
            x: 87,
            y: 465,
        },
        endPosition: {
            x: 14470,
            y: 465,
        },
        checkpoint:{ //bonFire position change both
            x: 400,
            y: 465,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 40, y: 12, w: 2, h: 1 }, { x: 44, y: 10, w: 10, h: 1 }, { x: 55, y: 17, w: 42, h: 1 }, { x: 97, y: 12, w: 1, h: 1 }],
        mechagolem: [{ x: 900, y: 350 },{ x: 7500, y: 100}],
        dungeonWall: [{ x: 0, y: 0, h: 5 }],
        dungeonDoor: [{ x: 117, y: 465, level: "shopkeeper", end: false }, { x: 14500, y: 465, level: "two", end: false }],
        bonFire: [{ x: 400, y: 465, level: "one" }, { x: 14000, y: 465, level: "one" }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    two: {
        width: 10000,
        height: 0,
        startPosition: {
            x: 87,
            y: 320,
        },
        dungeonBackground3: [{ x:0, y:0, w:50, h: 1}],
        dungeonGround2: [{ x: 0, y: 14.5, w: 6, h: 1 }, {x:7, y: 14.5, w: 8, h:1},{ x: 16, y: 14.5, w: 8, h: 1 },{ x:25, y: 14.5, w: 10, h: 1 }, {x: 36, y: 14.5, w: 8, h: 1}, {x: 45, y: 14.5, w: 8, h: 1}, {x: 54, y: 14.5, w: 10, h: 1}, { x: 0, y: 0, w: 100, h: 1 }],
        mechagolem: [{ x: 950, y: 270 }, {x : 1900, y: 270}],
        dungeonWall: [{ x: 0, y: 0, h: 4 }],
        dungeonWaterfall: [{x: 950, y: 219}, { x: 2345, y: 219}, {x:3735, y: 219}, {x: 5445, y:219}, {x: 6835, y: 219}, {x: 8235, y: 219}],
        dungeonDoor: [{ x: 124, y: 360, level: "one", end: true }, { x: 1024, y: 360, level: "bossroom" }],

    },

    shopkeeper: {
        width: 1085,
        height: 0,
        knightPos: {
            x: 500,
            y: 445,
        },
        checkpoint:{ //bonFire position change both
            x: 400,
            y: 465,
        },
        cutscene: [{startX: 100, cutsceneNum: 2}],
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
        reina: [{ x: 1620, y: 537, text: "reina_shopkeeper" }],
        azucena: [{ x: 870, y: 510, text: "azucena_shopkeeper" }],
        tent: [{ x: 700, y: 478 }],
        bonFire: [{ x: 400, y: 465, level: "shopkeeper" }],
        potion: [{ x: 788, y: 570}, { x: 888, y: 570}, { x: 990, y: 570}],
        sharpening_wheel: [{ x: 1850, y: 620 }],
        knightStatue: [{ x: 1840, y: 210 }],
    },

    bossroom: {
        width: 800,
        height: 0,
        startPosition: {
            x: 70,
            y: 400,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 }],
        gorgon: [{ x: 900, y: 424 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }],
        dungeonDoor: [{ x: 117, y: 465, level: "shopkeeper" }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },
};
