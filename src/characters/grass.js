class Grass extends BaseCharacter {
    constructor(x, y) {
        super(x, y, 1)
    }

    mul() {

        let newCell = random(this.chooseCell(0));

        if (newCell) {
            grassStorage.push(new Grass(newCell[0], newCell[1]));
            matrix[newCell[1]][newCell[0]] = 1;
        }
    }
}
