import Piece from "./Piece"

export default class Pawn extends Piece {
    constructor(props) {
        super(props);

        this.genPossibilities = this.genPossibilities.bind(this);
    }

    genPossibilities(row, col) {
        let posbt = [];
        let side = this.props.sideMap[[row, col]];
        if (side === 1) {
            let side1 = this.props.sideMap[[row + 1, col]];
            let side2 = this.props.sideMap[[row + 2, col]];
            if (row === 1) {
                if (side1 === side) {
                    // posbt is empty
                } else if (side1 === 2) {
                    posbt.push(this.encode(row + 1, col));
                } else {
                    posbt.push(this.encode(row + 1, col));
                    if (side2 !== side) {
                        posbt.push(this.encode(row + 2, col));
                    }
                }
            } else {
                if (side1 !== side) {
                    posbt.push(this.encode(row + 1, col));
                }
            }
        } else {
            let side1 = this.props.sideMap[[row - 1, col]];
            let side2 = this.props.sideMap[[row - 2, col]];
            if (row === 6) {
                if (side1 === side) {
                    // posbt is empty
                } else if (side1 === 1) {
                    posbt.push(this.encode(row - 1, col));
                } else {
                    posbt.push(this.encode(row - 1, col));
                    if (side2 !== side) {
                        posbt.push(this.encode(row - 2, col));
                    }
                }
            } else {
                if (side1 !== side) {
                    posbt.push(this.encode(row - 1, col));
                }
            }
        }
        let i = (side === 1) ? 1 : -1;
        for (let j = -1; j <= 1; j += 2) {
            let newRow = row + i;
            let newCol = col + j;
            if (this.inRange(newRow, newCol) &&
                this.props.sideMap[[newRow, newCol]] === 3 - side) {
                posbt.push(this.encode(newRow, newCol));
            }
        }

        return posbt;
    }
}