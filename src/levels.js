var levelOne = {
    music: "",
    hurry_music: "",
    label: "Start",
    dungeonBackground: [{ x: 0, y: 0, w: 40, h: 40 }],
    dungeonGround: [{ x: 0, y: 17, w: 8 }],
    mechagolem: [{ x: 900, y: 310 }],
}

    var levelTwo = {
    underground: true, // NOTE: PLEASE ADD THIS BOOLEAN PROPERTY WHEN TESTING LEVEL 1-2
    music: "./music/underworld.mp3",
    // hurry_music: "./music/underworld-hurry.mp3",
    label: "1-2",
    ground: [{ x: 0, y: 13, size: 80 }, { x:83, y: 13, size: 37}, {x: 122, y: 13, size: 2},
        {x: 126, y: 13, size: 12}, {x: 145, y: 13, size: 7}, {x: 159, y: 13, size: 32}],
    bricks: [],
    blocks: [{ x: 17, y: 12, size: 1 },
        { x: 19, y: 12, size: 1 }, { x: 19, y: 11, size: 1 },
        { x: 21, y: 12, size: 1 }, { x: 21, y: 11, size: 1 }, { x: 21, y: 10, size: 1 },
        { x: 23, y: 12, size: 1 }, { x: 23, y: 11, size: 1 }, { x: 23, y: 10, size: 1 }, { x: 23, y: 9, size: 1 },
        { x: 25, y: 12, size: 1 }, { x: 25, y: 11, size: 1 }, { x: 25, y: 10, size: 1 }, { x: 25, y: 9, size: 1 },
        { x: 27, y: 12, size: 1 }, { x: 27, y: 11, size: 1 }, { x: 27, y: 10, size: 1 },
        { x: 31, y: 12, size: 1 }, { x: 31, y: 11, size: 1 }, { x: 31, y: 10, size: 1 },
        { x: 33, y: 12, size: 1 }, { x: 33, y: 11, size: 1 },
        { x: 133, y: 12, size: 5 },
        { x: 134, y: 11, size: 4 },
        { x: 135, y: 10, size: 3 },
        { x: 136, y: 9, size: 2 }],
    coins: [{ x: 40, y: 8 }, { x: 45, y: 8 }, { x: 41, y: 5 }, { x: 42, y: 5 }, { x: 43, y: 5 }, { x: 44, y: 5 },
        { x: 58, y: 8 }, { x: 59, y: 8 }, { x: 60, y: 8 }, { x: 61, y: 8 },
        { x: 68, y: 8 },
        { x: 84, y: 5 }, { x: 85, y: 5 }, { x: 86, y: 5 }, { x: 87, y: 5 }, { x: 88, y: 5 }, { x: 89, y: 5 }],
    goombas: [{ x: 16, y:12 }, { x: 17, y:11 },
        { x: 29, y:12 },
        { x: 62, y:12 }, { x: 64, y:12 },
        { x: 73, y:4 }, { x: 76, y:8 }, { x: 77.5, y:8 },
        { x: 99, y:12 }, { x: 100.5, y:12 }, { x: 102, y:12 },
        { x: 113, y:12 },
        { x: 135, y:9 }, { x: 136.5, y:8 }],
    koopas: [{ x: 44, y:11.5, facing: 1}, { x: 45, y:11.5, facing: 1 },
        { x: 59, y:11.5, facing: 1 },
        { x: 146, y:11.5, facing: 1 }],
    tubes: [{ x: 103, y: 10, size: 2, destination: true },
        { x: 109, y: 9, size: 3, destination: false },
        { x: 115, y: 11, size: 1, destination: false },
        { x: 166, y: 8, size: 1, destination: false, side: true},
        { x: 168, y: 2, size: 7, destination: false },
        { x: 178, y: 10, size: 2, destination: false },
        { x: 182, y: 10, size: 2, destination: false },
        { x: 186, y: 10, size: 2, destination: false }],
    lifts: [{ x: 140, y: 7, goingDown: true }, {x: 155, y: 9, goingDown: false }]
};

var credits = {
    text: [
    ]
}