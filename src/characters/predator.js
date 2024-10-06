class Predator extends BaseCharacter {
    constructor(x, y) {
        super(x, y, 3);
        this.energy = 20;
    }

    eat() {
        let food = random(this.chooseCell(2));
        if (food) {
            this.energy++;
            let x = food[0];
            let y = food[1];

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

            for (let i in grassEaterStorage) {
                if (grassEaterStorage[i].x === x && grassEaterStorage[i].y === y) {
                    grassEaterStorage.splice(i, 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        } else {
            if (this.energy < 0) {
                this.die();
            } else {
                this.move();
            }
        }
        this.mul();
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let empty = random(emptyCells);
        if (empty) {
            this.energy--;
            let x = empty[0];
            let y = empty[1];

            matrix[y][x] = this.char;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }

    mul() {
        if (this.energy > 25) {
            let emptyCells = this.chooseCell(0);
            let empty = random(emptyCells);
            if (empty) {
                let x = empty[0];
                let y = empty[1];
                matrix[y][x] = this.char;
                predatorStorage.push(new Predator(x, y,));
                this.energy = 20;
            }
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i in predatorStorage) {
            if (this.x == predatorStorage[i].x && this.y == predatorStorage[i].y) {
                grassStorage.splice(i, 1);
                break;
            }
        }

    }
}
