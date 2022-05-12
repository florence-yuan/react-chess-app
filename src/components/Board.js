import React, { useRef } from "react"
import Figure from "./Figure"

function Square(props) {
    return (
        <td
            className={`square ${props.class}`}
            style={{
                backgroundColor: props.backgroundColor,
                boxShadow: props.boxShadow,
            }}
        >
            {props.children}
        </td>
    )
}

export default function Board(props) {
    let squares = [];
    for (let i = 0; i < 8; i++) {
        let line = [];
        for (let j = 0; j < 8; j++) {
            let classStr = "";
            let oldRow = -1, oldCol = -1;
            if (props.selected) {
                oldRow = props.selected[0];
                oldCol = props.selected[1];
            }
            if ((props.selected && oldRow === i && oldCol === j)) {
                classStr = "selected";
            } else if (oldRow > -1 && oldCol > -1 && props.showPos && props.possiblePos && props.possiblePos.includes(i * 8 + j)) {
                classStr = `indicate ${props.sideMap[[oldRow, oldCol]] === 1 ? "black" : "white"} ${props.selected[2]}`;
            }
            let square = (
                <Square
                    key={i * 8 + j}
                    class={classStr}
                >
                    <Figure
                        turn={props.turn}
                        side={props.sideMap[[i, j]]}
                        name={props.board[[i, j]]}
                        row={i}
                        col={j}
                        board={props.board}
                        sideMap={props.sideMap}
                        selected={props.selected}
                        complete={props.complete}
                        completed={props.completed}
        
                        updateTurn={props.updateTurn}
                        updateSelect={props.updateSelect}
                        updateBoard={props.updateBoard}
                        updatePieceCnt={props.updatePieceCnt}
                        updatePossiblePos={props.updatePossiblePos}
                        updateMsg={props.updateMsg}
                        updateTurnStart={props.updateTurnStart}
        
                        setPawnPromotion={props.setPawnPromotion}
                        addHistory={props.addHistory}
                    />
                </Square>
            )
            line.push(square);
        }
        squares.push(
            <tr className="line" key={i}>
                { line }
            </tr>
        )
    }
    const board = useRef(null);
    return (
        <table className="board" ref={board}>
            <tbody>
                { squares }
            </tbody>
        </table>
    )
}