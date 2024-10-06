/// <reference path="./types/p5js.d.ts" />

let matrix = [];

const MATRIX_SIDE_Y = 20;
const MATRIX_SIDE_X = 40;
const SIZE = 20;

let speed_element = document.getElementById("speed");

let game_speed = 5;
speed_element.innerText = `Speed: ${game_speed.toString()}%`;

let grassStorage = [];
let grassEaterStorage = [];
let predatorStorage = [];
let rabbitStorage = [];
let carrotStorage = [];
let toxicStorage = [];
let bombStorage = [];


const CHARACTER_COLORS = {
    1: "Green",
    2: "Yellow",
    3: "Red",
    4: "Tan",
    5: "Orange",
    6: "Lime",
    7: "Black",
};

const CHARACTERS = {
    0: "Empty",
    1: "Grass",
    2: "GrassEater",
    3: "Predator",
    4: "Rabbit",
    5: "Carrot",
    6: "Toxic",
    7: "Bomb",
};

function createMatrix() {
    for (let y = 0; y < MATRIX_SIDE_Y; y++) {
        matrix[y] = [];
        for (let x = 0; x < MATRIX_SIDE_X; x++) {
            matrix[y][x] = 0;
        }
    }
}


function createCharacter(character, quantity) {
    for (let i = 0; i < quantity; i++) {
        let x = Math.floor(random(0, MATRIX_SIDE_X));
        let y = Math.floor(random(0, MATRIX_SIDE_Y));
        matrix[y][x] = character;
    }
}



function setup() {
    createMatrix();

    createCharacter(1, 30);
    createCharacter(2, 10);
    createCharacter(3, 5);
    createCharacter(4, 1);
    createCharacter(5, 20);
    createCharacter(6, 20);
    createCharacter(7, 4);

    let canvas = document.getElementById("mainCanvas");

    background('gray');
    createCanvas(MATRIX_SIDE_X * SIZE, MATRIX_SIDE_Y * SIZE, canvas);

    frameRate(game_speed);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            rect(x * SIZE, y * SIZE, SIZE, SIZE);

            if (matrix[y][x] == 1) {
                grassStorage.push(new Grass(x, y));
            } else if (matrix[y][x] == 2) {
                grassEaterStorage.push(new GrassEater(x, y));
            } else if (matrix[y][x] == 3) {
                predatorStorage.push(new Predator(x, y));
            } else if (matrix[y][x] == 4) {
                rabbitStorage.push(new Rabbit(x, y));
            } else if (matrix[y][x] == 5) {
                carrotStorage.push(new Carrot(x, y));
            } else if (matrix[y][x] == 6) {
                toxicStorage.push(new Toxic(x, y));
            } else if (matrix[y][x] == 7) {
                bombStorage.push(new Bomb(x, y));
            }
        }
    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (CHARACTER_COLORS.hasOwnProperty(matrix[y][x])) {
                fill(CHARACTER_COLORS[matrix[y][x]]);
            } else {
                fill("gray");
            }

            rect(x * SIZE, y * SIZE, SIZE, SIZE);
        }
    }

    for (let i in grassEaterStorage) {
        grassEaterStorage[i].eat();
    }
    for (let i in predatorStorage) {
        predatorStorage[i].eat();
    }
    for (let i in rabbitStorage) {
        rabbitStorage[i].eat();
    }
    for (let i in grassStorage) {
        grassStorage[i].mul();
    }


    setTimeout(() => {
        for (let i in bombStorage) {
            bombStorage[i].boom();

        }
    }, 1000);
}

/* -------------------------------------------------------------------------- */


let game_status = document.getElementById("game_status");
let game_speed_range = document.getElementById("game_speed_range");



function changeGameSpeed(speed) {
    if (speed >= 1) {
        game_status.innerText = "stop";
    } else {
        game_status.innerText = "run";
    }

    game_speed_range.value = speed.toString();

    game_speed = speed;
    speed_element.innerText = `Speed: ${game_speed.toString()}%`;
    frameRate(speed);
}



game_status.addEventListener("click", (_) => {
    if (game_status.innerText === "run") {
        changeGameSpeed(game_speed);

        if (game_speed === 0) {
            game_speed = 5;
            changeGameSpeed(game_speed);
        }

    } else {
        changeGameSpeed(0);
    }
});



game_speed_range.addEventListener("change", (event) => {
    let speed = parseInt(game_speed_range.value);
    changeGameSpeed(speed);
});


function mouseClicked() {
    let y = Math.floor(mouseY / SIZE);
    let x = Math.floor(mouseX / SIZE);

    if (y > MATRIX_SIDE_Y || y < 0 || x > MATRIX_SIDE_X || x < 0) {
        return;
    }

    let info = document.getElementById("info");

    if (!info) {
        return;
    }

    info.innerHTML = `<b>INFO</b>
    <hr>
    <b>Y:</b> ${y} | <b>X:</b> ${x}
    <br>
    <b>Character:</b> ${CHARACTERS[matrix[y][x]]}
    `;

}

