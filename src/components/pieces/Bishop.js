import Piece from "./Piece"

export default class Bishop extends Piece {
    constructor(props) {
        super(props);

        this.genPossibilities = this.genPossibilities.bind(this);
    }

    genPossibilities(row, col) {
        const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        let side = this.props.sideMap[[row, col]];
        let posbt = [];
        for (let dir of dirs) {
            for (   let i = row, j = col;
                    this.inRange(i, j);
                    i += dir[0], j += dir[1]  ) {
                if (i === row && j === col)
                    continue;
                if (this.props.sideMap[[i, j]] === side)
                    break;
                posbt.push(this.encode(i, j));
                if (this.props.sideMap[[i, j]])
                    break;
            }
        }

        return posbt;
    }
}