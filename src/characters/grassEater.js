class GrassEater extends BaseCharacter {
    constructor(x, y) {
        super(x, y, 2);
        this.energy = 8;
    }

    eat() {
        let food = random(this.chooseCell(1));

        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let x = food[0];
            let y = food[1];
            matrix[y][x] = this.char;
            this.x = x;
            this.y = y;
            for (let i in grassStorage) {
                if (x == grassStorage[i].x && y == grassStorage[i].y) {
                    grassStorage.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 18) {
                this.mul();
            }
        } else {
            this.move();
        }
    }

    move() {
        this.energy--;
        let emptyCell = random(this.chooseCell(0));
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[this.y][this.x] = 0;
            matrix[y][x] = this.char;

            if (matrix[y][x] === 6) {
                for (let i in toxicStorage) {
                    if (x == toxicStorage[i].x && y == toxicStorage[i].y) {
                        toxicStorage.splice(i, 1);
                        break;
                    }
                }
                this.die();
                return;
            }

            this.x = x;
            this.y = y;
            this.updateDirections()
        }
        if (this.energy <= 0) {
            this.die();
        }
    }

    mul() {
        let emptyCell = random(this.chooseCell(0));
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];
            matrix[y][x] = this.char;
            grassEaterStorage.push(new GrassEater(x, y));
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterStorage) {
            if (this.x == grassEaterStorage[i].x && this.y == grassEaterStorage[i].y) {
                grassStorage.splice(i, 1);
                break;
            }
        }

    }
}
