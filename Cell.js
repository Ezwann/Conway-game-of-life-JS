class Cell {
    constructor(x, y, alive) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    kill() {
        this.alive = false;
    }
    rised() {
        this.alive = true;
    }
}