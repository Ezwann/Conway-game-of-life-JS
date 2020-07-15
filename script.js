var field = document.querySelector('table tbody');
var cols = rows = 100;
var grid = buildField(cols, rows);
var running = false;
var currentGen = 0;

function buildField(cols, rows) {
    var arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
       arr[i] = new Array(rows);
    }
    return arr;
}

function populateField() {
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if(Math.random() > 0.90)
                grid[i][j] = true;
            else
                grid[i][j] = false;
        }
    }
    incrementCounterGen();
}

function render() {
    var tableRendered = "";
    for(var i = 0; i < grid.length; i++) {
        tableRendered += "<tr>"
        for(var j = 0; j < grid[i].length; j++) {
            tableRendered += `<td style="background-color: ${(grid[i][j])?"black":"white"}"></td>`;
        }
        tableRendered += "</tr>"
    }
    field.innerHTML = tableRendered;
}

function makeItLive() {
    var nextGrid = grid;
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            let totalNeighbours = countNeighbourhood(i, j, grid[i][j]);
            if(totalNeighbours <= 1 || totalNeighbours >= 4) nextGrid[i][j] = false;
            else if(totalNeighbours == 3) nextGrid[i][j] = true;
        }
    }
    grid = nextGrid;
}

function countNeighbourhood(col, row, selfStatus) {
    var sum = 0;
    for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++) {
            if(grid[(col + i + cols) % cols][(row + j + rows) % rows]) sum++;
        }
    }
    if(selfStatus) sum--;
    return sum;
}

function nextGen() {
    makeItLive();
    render();
    incrementCounterGen();
}

function incrementCounterGen() {
    currentGen++;
    document.querySelector('#genCounter').innerHTML = currentGen;
}

(function boot(){
    populateField();
    render();
})()
// var interval = setInterval(function() {nextGen()}, 200);

document.querySelector('button').addEventListener('click', function() {
    if(running) clearInterval(interval);
    else interval = setInterval(function() {nextGen()}, 200);
    running = !running;
})