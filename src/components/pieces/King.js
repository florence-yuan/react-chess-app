import Piece from "./Piece"

export default class King extends Piece {
    constructor(props) {
        super(props);

        this.genPossibilities = this.genPossibilities.bind(this);
    }

    genPossibilities(row, col) {
        let posbt = [];
        let side = this.props.sideMap[[row, col]];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                let newRow = row + i;
                let newCol = col + j;
                if (this.inRange(newRow, newCol) &&
                    this.props.sideMap[[newRow, newCol]] !== side) {
                    posbt.push(this.encode(newRow, newCol));
                }
            }
        }

        return posbt;
    }
}