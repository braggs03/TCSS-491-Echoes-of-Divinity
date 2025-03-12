let levels = {
    startScreen: {
        width: 800,
        maxHeight: 600,
        minHeight: 0,
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
        maxHeight: 600,
        minHeight: 0,
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
        maxHeight: 600,
        minHeight: 0,
        background: "black",
        title: [{ x: 340, y: 70 }],
        menuBackground: [{ x: 0, y: 0, w: 1, h: 1}],
    },

    tutorial: {
        width: 1350,
        maxHeight: 0,
        minHeight: 0,
        startPosition: {
            x: -90,
            y: 440,
        },
        reina: [{ x: 300, y: 536 }],
        azucena: [{ x: -165, y: 500 }],
        cutscene: [{startX: -100, cutsceneNum: 0}],
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }],
        skeleton: [{ x: 1200, y: 424 }, { x: 1400, y: 424 }, { x: 1600, y: 424 }, { x: 1800, y: 424 }],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
        townBackground: [{ x:0, y:0, w:50, h: 1}],
    },

    one: {
        width: 13550,
        maxHeight: -4000,
        minHeight: 0,
        startPosition: {
            x: 87,
            y: 465,

            // x: 14000,
            // y: -2640,

            // x: 13970,
            // y: 440,

            

        },
        endPosition: {
            x: 14470,
            y: 465,
        },
        checkpoint2:{ //bonFire position change both
            x: 13700,
            y: 465,
        },
        dungeonGround: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 41.5, y: 12, w: 1, h: 1 }, { x: 44, y: 10, w: 10, h: 1 }, { x: 55, y: 17, w: 42, h: 1 }, { x: 60, y: -2, w: 25, h: 1 }, { x: 57, y: 5, w: 2, h: 1 }, { x: 68, y: -8, w: 1, h: 1 },
            { x:55, y: -32, w: 3, h: 1 }, { x:91, y: -60, w: 4, h: 1 }
        ],
        movingPlatform: [{x:68, y:19, w:1, h:1, endX:68, endY:12, isVertical: true}, {x:87, y:-15, w:2, h:1, endX:88, endY:-30, isVertical: true}, 
            {x:80, y:-30, w:2, h:1, endX:85, endY:-20, isVertical: false}, {x:73, y:-30, w:2, h:1, endX:77, endY:-20, isVertical: false}, 
            {x:75, y:-50, w:2, h:1, endX:80, endY:-20, isVertical: false}, {x:82, y:-55, w:1, h:1, endX:86, endY:-20, isVertical: false},
            {x:87, y:-50, w:1, h:1, endX:93, endY:-20, isVertical: false}, {x:95, y:-57, w:1, h:1, endX:100, endY:-20, isVertical: false},
            {x:95, y:-60, w:1, h:1, endX:93, endY:-80, isVertical: true}, {x:97, y:-80, w:2, h:1, endX:100, endY:-20, isVertical: false}, {x:102, y:-80, w:2, h:1, endX:110, endY:-20, isVertical: false},
            {x:106.5, y:12, w:1, h:1, endX:93, endY:-4, isVertical: true}], // 12 -4
        skeleton: [{ x: 1200, y: 424 }, { x: 1400, y: 424 }, { x: 1600, y: 424 }, { x: 1800, y: 424 }, { x: 9000, y: 424 }, { x: 9200, y: 424 }, { x: 9400, y: 424 }, { x: 9600, y: 424 }],
        mechagolem: [{ x: 4500, y: 350 },{ x: 7500, y: 100},{ x: 11000, y: 350}, { x: 11000, y: -400}],
        dungeonWall: [{ x: 0, y: -3500, h: 50}, { x: 370, y: -3500, h: 50}],
        dungeonDoor: [{ x: 117, y: 465, level: "shopkeeper", end: false }, { x: 14500, y: 465, level: "two", end: false }],
        bonFire: [{ x: 13300, y: 472, level: "one" }],
        lostSword:[{ x:14400, y:-2500 }],
        knightStatue: [{ x: 14350, y: -2885}],
        cutscene: [{startX: 14100, cutsceneNum: 11}],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    two: {
        width: 10360,
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
        bonFire: [ { x: 10850, y: 368, level: "two" }],
        dungeonBackground3: [{ x:0, y:0, w:3, h: 1}],
        dungeonGround2: [{ x: 0, y: 14.4, w: 6, h: 1 }, {x:7, y: 14.4, w: 8, h:1},{ x: 16, y: 14.4, w: 19, h: 1 }, {x: 36, y: 14.4, w: 8, h: 1}, {x: 45, y: 14.4, w: 8, h: 1}, {x: 54, y: 14.4, w: 10, h: 1}, {x: 64, y: 14.4, w: 16, h:1}, { x: 0, y: 0, w: 75, h: 1 }],
        gorgon: [{ x: 1500, y: 320 }, {x: 3000, y: 320}, {x: 4900, y: 320}, {x: 5900, y: 320}, {x: 8000, y: 320}],
        wallspike: [{x: 4450, y: 185}, {x: 4225, y: 185}, {x: 3700, y: 185}, {x: 9000, y: 185}, {x: 8870, y: 185}],
        dungeonWall: [{ x: 0, y: 0, h: 4 }, { x: 290, y: 0, h: 2}],
        dungeonWaterfall: [{x: 950, y: 219}, { x: 2345, y: 219}, {x: 5445, y:219}, {x: 6835, y: 219}, {x: 8235, y: 219}],
        dungeonDoor: [{ x: 124, y: 361, level: "one", end: true }],
        cutscene: [{startX: 10800, cutsceneNum: 3}, {startX: 11250, cutsceneNum: 4}],
        reina: [{ x: 11100, y: 433 }],
        azucena: [{ x: 11200, y: 400 }],
    },

    three: {
        width: 1350,
        maxHeight: -4000,
        minHeight: 0,
        startPosition: {
            x: 87,
            y: 300,
        },
        endPosition: {
            x: 14470,
            y: 465,
        },
        checkpoint2:{
            x: 13700,
            y: 465,
        },
        dungeonBackground: [
                            { x:0, y:0, w:28, h: 10}, 
                            { x:744, y:-4000, w:20, h: 60},
                            { x:2600, y:-4050, w:10, h: 5}
                           ],
        dungeonGround: [
                        { x: 0, y: 17, w: 7, h: 1 }, 
                        { x: 10, y: 12, w: 4, h: 1 },  
                        { x: 0, y: 0, w: 5, h: 1 }, 
                        { x: 16, y: -5, w: 1, h: 1 },  
                        { x: 5, y: -40, w: 1, h: 1 },  
                        { x: 5, y: -50, w: 1, h: 1 },
                        { x: 16, y: -60, w: 1, h: 1 },  
                        { x: 8, y: -90, w: 20, h: 1 },  
                        { x: 5, y: -100, w: 20, h: 1 }
                       ],
        movingPlatform: [
                         {x:9, y:7, w:2, h:1, endX:68, endY:-10, isVertical: true}, 
                         {x:12, y:0, w:2, h:1, endX:15, endY:-10, isVertical: false}, 
                         {x:14, y:-15, w:2, h:1, endX:68, endY:-35, isVertical: true},
                         {x:10, y:-30, w:1, h:1, endX:0, endY:-42, isVertical: true},
                         {x:10, y:-70, w:2, h:1, endX:14, endY:-42, isVertical: false},
                         {x:17, y:-85, w:1, h:1, endX:0, endY:-92, isVertical: true},
                         {x:10, y:-90, w:2, h:1, endX:14, endY:-42, isVertical: false},
                         {x:7.5, y:-95, w:1, h:1, endX:0, endY:-110, isVertical: true},
                        ],

        skeleton: [{ x: 1800, y: 314 }],
        dungeonWall: [{ x: 0, y: 0, h: 2},
                      { x: 18.4, y:-15500, h: 100}, 
                      { x: 64.9, y:-3590, h: 30},
                      { x: 78.5, y:-4000, h: 1}
                     ],
        dungeonDoor: [{ x: 14500, y: 465, level: "two", end: false }],
        bonFire: [{ x: 700, y: 472, level: "three" }],
        reina: [{ x: 460, y: 536}],
        azucena: [{ x: 2820 , y: -3780}],
        cutscene: [{startX: 230, cutsceneNum: 7}, {startX: 2620, cutsceneNum: 8}],
    },

    four: {
        width: 13545,
        maxHeight: 0,
        minHeight: 2000,
        startPosition: {
            x: 215,
            y: 465,
        },
        endPosition: {
            x: 14200,
            y: 465,
        },
        checkpoint4:{ //bonFire position change both
            x: 14400,
            y: 465,
        },
        dungeonBackground4: [{x: 0, y:0, w:4, h:1},{x: 0, y:1, w:4, h:1}],
        werewolf: [{x: 2500, y: 165}, {x: 5000, y: 165}, {x: 12000, y: 165}, {x: 13000, y: 165}],
        skeleton: [{ x: 3000, y: 424 }, { x: 3200, y: 424 }, { x: 3400, y: 424 }, { x: 3600, y: 424 }, { x: 3800, y: 424 }],
        bonFire: [ {x: 250, y: 465, level: "four"}],
        dungeonGround4: [{ x: 0, y: 17, w: 40, h: 1 }, { x: 40, y: 20, w: 3, h: 1 },{ x: 43, y: 25, w: 3, h: 1 },{ x: 48, y: 30, w: 3, h: 1 },{ x: 54, y: 20, w: 3, h: 1 },{x: 59, y: 25, w: 3, h: 1 }, {x: 65, y: 20, w: 3, h: 1 } , {x: 70, y: 17, w: 40, h: 1 }],
        firebomb2:[{x: 7000, y: 750}, {x: 8200, y: 800}, {x: 10000, y: 600}],
        bridge: [{x:8200, y:940}, {x:8350, y:940}, {x:10000, y:740}, {x:10150, y:740}],
        dungeonLantern: [{ x: 700, y: 250 }, { x: 1400, y: 250 },{ x: 2100, y: 250 },{ x: 2800, y: 250 },{ x: 3500, y: 250 },{ x: 4200, y: 250 },{ x: 4900, y: 250 },{ x: 5600, y: 250 },{ x: 6300, y: 250 },{ x: 11900, y: 250 },{ x: 12600, y: 250 },{ x: 13300, y: 250 },{ x: 14000, y: 250 }],
        pillar: [{ x: 0, y: 100 }, { x: 700, y: 100}, { x: 1400, y: 100}, { x: 2100, y: 100}, { x: 2800, y: 100}, { x: 3500, y: 100}, { x: 4200, y: 100}, { x: 4900, y: 100}, { x: 5600, y: 100}, { x: 11200, y: 100}, { x: 11900, y: 100},{ x: 12600, y: 100}, { x: 13300, y: 100},{ x: 14000, y: 100}],
        dungeonWall1: [{ x: 369.5, y: 0, h: 5 }],
        dungeonDoor2: [{ x: 14250, y: 450, level: "five"}],
        eagle: [{ x: 950, y: 538}, { x: 2350, y: 538}, { x: 4450, y: 538}, { x: 11450, y: 538}, { x: 12850, y: 538}],
        eagle2: [{ x: 1700, y: 535}, { x: 3100, y: 535}, { x: 5200, y: 535},{ x: 12200, y: 535}, { x: 13600, y: 535}],
        wizard: [{ x: 3800, y: 438 }, { x: 5900, y: 438 }],
        azucena: [{ x: 1000, y: 500 }],
        cutscene: [{startX: 775, cutsceneNum: 10},],
        // bonfire at start and and remove first wall
    },

    five: {
        width: 800,
        height: 0,
        startPosition: {
            x: 250,
            y: 430,
        },
        dungeonDoor: [{ x: 250, y: 467, level: "four", end: true}],
        dungeonWall: [{ x: 0, y: 0, h: 5 }, { x: 51, y: 0, h: 3 }],
        reina: [{ x: 1600, y: 536 }],
        azucena: [{ x: 600, y: 500 }],
        bonFire: [ { x: 1750, y: 465, level: "five" }],
        cutscene: [{startX: 373, cutsceneNum: 12}, {startX: 1402, cutsceneNum: 13}],
        dungeonGround: [{ x: -2, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    shopkeeper: {
        width: 1085,
        minHeight: 0,
        maxHeight: 0,
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
        dungeonTorch: [{ x: 103, y: 465 }, { x: 278, y: 465 }],
        dungeonWall: [{ x: 0, y: 0, h: 5 }, { x: 58, y: 0, h: 5 }],
        wallAxe: [{ x: 1726, y: 520 }],
        swordRack: [{ x: 1300, y: 608 }],
        shieldRack: [{ x: 1400, y: 608 }],
        boxes: [{ x: 800, y: 524 }, { x: 950, y: 524 }],
        reina: [{ x: 1620, y: 537 }],
        azucena: [{ x: 870, y: 510 }],
        tent: [{ x: 700, y: 478 }],
        bonFire: [{ x: 400, y: 472, level: "shopkeeper" }],
        potion: [{ x: 788, y: 570}, { x: 888, y: 570}, { x: 990, y: 570}],
        sharpening_wheel: [{ x: 1850, y: 620 }],
        knightStatue: [{ x: 1840, y: 210 }],
        cutscene: [{startX: 70, cutsceneNum: 2}],
    },

    bossOne: {
        width: 800,
        minHeight: 0,
        maxHeight: 0,
        startPosition: {
            x: -200,
            y: 430,
        },

        endPosition: {
            x: 1848,
            y: 441,
        },
        cutscene: [{startX: -300, cutsceneNum: 5}],
        dungeonWall: [{ x: 0, y: 0, h: 3 }, { x: 51, y: 0, h: 3 }],
        reina: [{ x: 200, y: 536 }],
        azucena: [{ x: 100, y: 500 }],
        lucan: [{x: 1200, y: 435}],
        dungeonGround: [{ x: -2, y: 17, w: 40, h: 1 }, { x: 0, y: 0, w: 40, h: 1 }],
        dungeonBackground2: [{ x:0, y:0, w:50, h: 1}],
    },

    bossTwo: {
        width: 0,
        minHeight: 0,
        maxHeight: 0,
        startPosition: {
            x: -200,
            y: 430,
        },

        endPosition: {
            x: 990,
            y: 441,
        },
        cutscene: [{startX: -300, cutsceneNum: 9}],
        celes: [{ x: 800, y: -300 }],
        azucena: [{ x: 175, y: 500 }],
        dungeonWall: [{ x: 31, y: 0, h: 3 }, { x: 0, y: 0, h: 3 }],
        dungeonGround: [{ x: -2, y: 17, w: 40, h: 1 }],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
    },

    bossThree: {
        width: 0,
        minHeight: 0,
        maxHeight: 0,
        startPosition: {
            x: -200,
            y: 430,
        },
        wallspike: [{ x: 10, y: 405},  {x: 1100, y: 405}],
        duma: [{ x: 750, y: -400 }],
        azucena: [{ x: -175, y: 500 }],
        dungeonWall: [{ x: 31, y: 0, h: 5 }, { x: 0, y: 0, h: 3 }],
        dungeonGround: [{ x: -2, y: 17, w: 40, h: 1 }, { x: 7.2, y: 9.2, w: 1, h: 1 }, { x: 0.1, y: 9.2, w: 1, h: 1 }],
        nightBackground: [{ x:0, y:0, w:50, h: 1}],
        cutscene: [{startX: -300, cutsceneNum: 14}],
    },

    emptyScreen: {
        width: 800,
        height: 600,
        background: "black",
    },

    AzucenaAfterStory: {
        width: 800,
        height: 400,
        background: "black",
        fadeTime: 4000,
        text: [
            { x: 640, y: 200, message: "With the war finally over and the shadow of Duma lifted, the long road to restoration began.", font: "20px Arial", color: "white" },
            { x: 640, y: 240, message: "Thalador lay in ruins, its people weary and uncertain of what the future held.", font: "20px Arial", color: "white" },
            { x: 640, y: 280, message: "But amidst the devastation, hope remained.", font: "20px Arial", color: "white" },
            { x: 640, y: 320, message: "Azucena, chosen as the new king’s advisor, advised him through the reconstruction era.", font: "20px Arial", color: "white" },
            { x: 640, y: 360, message: "Together they worked tirelessly to mend fractured alliances, rebuild lost homes, and ensure that Mica’s dream of a peaceful world endured.", font: "20px Arial", color: "white" },
            { x: 640, y: 400, message: "Even after the world was restored, she remained by the king’s side, offering her counsel for years to come.", font: "20px Arial", color: "white" },
            { x: 640, y: 440, message: "With her guidance, stability endured, and the peace they had fought so hard for became more than just a fleeting victory.", font: "20px Arial", color: "white" },
            { x: 640, y: 480, message: "It became a lasting legacy.", font: "20px Arial", color: "white" },
        ],
        azucena: [{ x: 550, y: 500 }],
    },

    ReinaAfterStory: {
        width: 800,
        height: 400,
        background: "black",
        fadeTime: 4000,
        text: [
            { x: 640, y: 200, message: "With the war at an end, Reina dedicated herself to rebuilding the Knights of the Eternal Flame,", font: "20px Arial", color: "white" },
            { x: 640, y: 240, message: "restoring the order to its former glory—and beyond.", font: "20px Arial", color: "white" },
            { x: 640, y: 280, message: "As its commander, she remained ever vigilant, standing by the King’s side as both his shield and his sword,", font: "20px Arial", color: "white" },
            { x: 640, y: 320, message: "ensuring the peace they had fought so hard to achieve would never be undone.", font: "20px Arial", color: "white" },
            { x: 640, y: 360, message: "Yet beyond duty and titles, she earned the most important title of all:", font: "20px Arial", color: "white" },
            { x: 640, y: 400, message: "The King’s Dearest Friend", font: "20px Arial", color: "white" },
            { x: 640, y: 440, message: "A title not bestowed by rank, but by the bond they shared.", font: "20px Arial", color: "white" },
            { x: 640, y: 480, message: "One who would stand by his side, unwavering, throughout his long reign.", font: "20px Arial", color: "white" },
        ],
        reina: [{ x: 550, y: 500 }],
    },

    ChosenAfterStory: {
        width: 800,
        height: 600,
        background: "black",
        fadeTime: 3000,
        text: [
            { x: 640, y: 120, message: "In the months following the war, Mica’s Chosen was approached by the leaders of the Rising Flame.", font: "20px Arial", color: "white" },
            { x: 640, y: 160, message: "They urged him to take the throne as King.", font: "20px Arial", color: "white" },
            { x: 640, y: 200, message: "Hesitant at first, he ultimately accepted, convinced that only he could ensure a lasting peace.", font: "20px Arial", color: "white" },
            { x: 640, y: 240, message: "Duma and Mica, despite their opposing views, had been right in their own ways.", font: "20px Arial", color: "white" },
            { x: 640, y: 280, message: "Humanity was both kind and cruel.", font: "20px Arial", color: "white" },
            { x: 640, y: 320, message: "As King, he vowed not to make the same mistakes they did.", font: "20px Arial", color: "white" },
            { x: 640, y: 360, message: "He ruled with a hand both kind and firm, guided by Azucena and Reina.", font: "20px Arial", color: "white" },
            { x: 640, y: 400, message: "His reign lasted until his death 63 years after Duma's defeat.", font: "20px Arial", color: "white" },
            { x: 640, y: 440, message: "With his death marked the end of the echoes of divinity.", font: "20px Arial", color: "white" },
            { x: 640, y: 480, message: "He'd past the throne to someone worthy months before.", font: "20px Arial", color: "white" },
            { x: 640, y: 520, message: "Giving advice to his successor that would be etched into history forever:", font: "20px Arial", color: "white" },
            { x: 640, y: 560, message: "\"In the end, it is not the power we hold, but the hearts we touch that shapes the world.", font: "20px Arial", color: "white" },
            { x: 640, y: 600, message: "Never stop believing in the good you can do.\"", font: "20px Arial", color: "white" },
        ],
        knight: [{ x: 550, y: 500 }],
    },

    Credits: {
        width: 800,
        height: 600,
        background: "black",
        fadeTime: 2000,
        text: [
            { x: 640, y: 250, message: "Created By:", font: "50px Arial", color: "white" },
            { x: 640, y: 330, message: "Edward Chung", font: "30px Arial", color: "white" },
            { x: 640, y: 380, message: "Hamda Jama", font: "30px Arial", color: "white" },
            { x: 640, y: 430, message: "Thomas Le", font: "30px Arial", color: "white" },
            { x: 640, y: 480, message: "Brandon Ragghianti", font: "30px Arial", color: "white" },
        ],
    },

    ThankYou: {
        width: 800,
        maxHeight: 600,
        minHeight: 0,
        background: "black",
        fadeTime: 1500,
        text: [
            { x: 640, y: 360, message: "THANK YOU", font: "60px Arial", color: "white" },
        ]
    },
};

let originalLevels = structuredClone(levels);

const resetLevels = () => {
    const excludeFields = ['cutscene', 'bonFire', 'potion', 'duma', 'lucan', 'celes', 'azucena', 'reina'];
    for (const levelName in originalLevels) {
        const originalLevel = originalLevels[levelName];
        for (const propName in originalLevel) {
            if (!excludeFields.includes(propName)) {
                levels[levelName][propName] = structuredClone(originalLevel[propName]);
            }
        }
    }
};