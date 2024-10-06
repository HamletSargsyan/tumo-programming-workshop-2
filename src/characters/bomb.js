class Bomb extends BaseCharacter {
    constructor(x, y) {
        super(x, y, 7);

    }

    boom() {
        for (let dir of this.directions) {
            let x = dir[0];
            let y = dir[1];

            if (y >= 0 && y < MATRIX_SIDE_Y && x >= 0 && x < MATRIX_SIDE_X) {
                matrix[y][x] = this.char;

            }

            for (let i in bombStorage) {
                if (this.x == bombStorage[i].x && this.y == bombStorage[i].y) {
                    bombStorage.splice(i, 1);
                    break;
                }
            }
        }
    }

}
