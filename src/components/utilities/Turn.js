import React from "react"
import NewGameBtn from "./buttons/NewGame"

export default function Turn(props) {
    let statement = (
        (!props.gameComplete)
        ? `${props.turn === 1 ? "black" : "white"} to move`
        : `${props.winner} wins`
    );
    let btnCont = (
        (!props.gameComplete)
        ? "reset game"
        : "new game"
    );

    return (
        <span className="turn-statement">
            {statement}
            <NewGameBtn
                newGame={props.newGame}
            >
                {btnCont}
            </NewGameBtn>
        </span>
    )
}