import Piece from "./Piece"

export default class Queen extends Piece {
    constructor(props) {
        super(props);

        this.genPossibilities = this.genPossibilities.bind(this);
    }

    genPossibilities(row, col) {
        let side = this.props.sideMap[[row, col]];
        let posbt = [];
        const dirs1 = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        for (let dir of dirs1) {
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
        const dirs2 = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
        for (let dir of dirs2) {
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