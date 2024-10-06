class BaseCharacter {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.color = CHARACTER_COLORS[this.char];

        this.directions = [];
        this.updateDirections();
    }

    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(...characters) {
        let found = [];

        this.updateDirections();
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (x >= 0
                && x < matrix[0].length
                && y >= 0
                && y < matrix.length) {
                if (characters.includes(matrix[y][x])) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }

}
