var width = height = 900;
var field = document.querySelector("canvas");
field.width = width;
field.height = height;
field = field.getContext('2d', {alpha: true});
field.background = 'black';
var button = document.querySelector("button");
var cols = rows = 150;
var grid;
var running = false;

function buildField(cols, rows) {
    var arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
       arr[i] = new Array(rows);
    }
    return arr;
}

function populateField() {
    grid = buildField(cols, rows)
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if(Math.random() > 0.80)
                grid[i][j] = new Cell(i, j, true);
            else
                grid[i][j] = new Cell(i, j, false);
        }
    }
}

function incrementCounterGen() {
    document.querySelector('#genCounter span').innerHTML = window.requestAnimationFrame(nextGen);
}

function draw() {
    field.clearRect(0, 0, width, height)
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            cell = grid[i][j]
            field.fillStyle = "black"
            field.fillRect(cell.x * width / cols, cell.y * width / cols, width / cols, height / rows);
            if(cell.alive) {
            } else {
                field.clearRect(cell.x * width / cols, cell.y * width / cols, width / cols - 1, height / rows - 1);
            }
        }
    }
}

(function boot(){
    populateField();
    draw();
})();

function makeItLive() {
    var nextGrid = grid;
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            let totalNeighbours = countNeighbourhood(i, j, grid[i][j].alive);
            if(totalNeighbours <= 1 || totalNeighbours >= 4) nextGrid[i][j].kill();
            else if(totalNeighbours == 3) nextGrid[i][j].rised();
        }
    }
    grid = nextGrid;
}

function countNeighbourhood(col, row, selfStatus) {
    var sum = 0;
    for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++) {
            if(grid[(col + i + cols) % cols][(row + j + rows) % rows].alive) sum++;
        }
    }
    if(selfStatus) sum--;
    return sum;
}

function nextGen() {
    setTimeout(function(){
        if(running){
            makeItLive();
            draw();
            incrementCounterGen();
        }
    }, 200)
}

window.requestAnimationFrame(nextGen)

document.querySelector('button').addEventListener('click', function() {
    running = !running;
    if(running) nextGen();
})