class Rabbit extends BaseCharacter {
    constructor(x, y) {
        super(x, y, 4);

        this.energy = 50;
        this.updateDirections();
    }

    updateDirections() {
        super.updateDirections();
        this.directions = [
            ...this.directions,
            [this.x - 2, this.y - 2],
            [this.x, this.y],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    eat() {
        let food = random(this.chooseCell(5, 6));

        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let x = food[0];
            let y = food[1];
            this.x = x;
            this.y = y;
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

            for (let i in carrotStorage) {
                if (x == carrotStorage[i].x && y == carrotStorage[i].y) {
                    carrotStorage.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 40) {
                this.mul();
            }
        } else {
            if (this.energy < 0) {
                this.die();
            } else {
                this.move();
            }
        }

    }


    move() {
        let emptyCell = random(this.chooseCell(0, 1));
        if (emptyCell) {
            let x = emptyCell[0];
            let y = emptyCell[1];


            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            matrix[y][x] = this.char;

            this.updateDirections();
        }
        this.energy--;
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
            rabbitStorage.push(new Rabbit(x, y));
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in rabbitStorage) {
            if (this.x == rabbitStorage[i].x && this.y == rabbitStorage[i].y) {
                // @ts-ignore
                grassStorage.splice(i, 1);
                break;
            }
        }

    }

}
