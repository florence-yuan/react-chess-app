import Piece from "./Piece"

export default class Knight extends Piece {
    constructor(props) {
        super(props);

        this.genPossibilities = this.genPossibilities.bind(this);
    }

    genPossibilities(row, col) {
        let side = this.props.sideMap[[row, col]];
        let posbt = [];
        for (let i = -2; i <= 2; i++) {
            if (i === 0) continue;
            let absj = 3 - Math.abs(i), j;
            for (let jp = -1; jp <= 1; jp += 2) {
                j = absj * jp;
                if (j === 0) continue;
                let newRow = row + i;
                let newCol = col + j;
                if (this.inRange(newRow, newCol) && this.props.sideMap[[newRow, newCol]] !== side) {
                    posbt.push(this.encode(newRow, newCol));
                }
            }
        }

        return posbt;
    }
}