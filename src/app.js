require("./scss/main.scss");

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
width = canvas.width = 240;
height = canvas.height = 400;

ctx.scale(20, 20);

const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0]
];

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for(let y = 0; y < m.length; ++y) {
        for(let x = 0; x < m[y].length; ++x) {
            if(m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                console.log("collide");
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while(h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1,
                    1
                );
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if(collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    drop_counter = 0;
}

let last_time = 0;
let drop_counter = 0;
let drop_intervall = 1000;

function update(time = 0) {
    const delta_time = time - last_time;
    last_time = time;
    drop_counter += delta_time;
    if(drop_counter > drop_intervall) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);

const player = {
    pos: { x: 5, y: 5 },
    matrix: matrix
}

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37:
            player.pos.x--;
            break;
        case 39:
            player.pos.x++;
            break;
        case 40:
            playerDrop();
            break;
    }
});

update ();