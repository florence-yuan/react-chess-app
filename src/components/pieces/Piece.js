import React from "react";
import { selectGenPos } from "../Functions";

export default class Piece extends React.Component {
    constructor(props) {
        super(props);

        let genPos = selectGenPos(props.name);

        this.state = {
            genPossibilities: genPos,
        }
    }

    inRange(row, col) {
        return (row >= 0 && row < 8 && col >= 0 && col < 8);
    }

    encode(a, b) {
        return a * 8 + b;
    }

    render() {
        let side = (this.props.side === 1) ? "black" : "white";
        let row = this.props.row;
        let col = this.props.col;
        let piece = {
            side: this.props.sideMap[[row, col]],
            row: row,
            col: col,
            name: this.props.board[[row, col]],
            "genPossibilities": this.state.genPossibilities,
        }

        return (
            <div
                className={`figure ${side} ${this.props.name}`}
                onClick={ () => this.props.handleClick(piece) }
                onDoubleClick={ () => this.props.handleClick(piece) }
            />
        )
    }
}