import React from "react"
import Board from "./Board"
import Turn from "./utilities/Turn"
import Timer from "./Timer"
import Message from "./utilities/Message"
import Counter from "./Counter"
import KeyboardControl from "./KeyboardControl"
import PawnPromotion from "./PawnPromotion"
import OpenPieceCntBtn from "./utilities/buttons/OpenPieceCnt"
import OpenControlBtn from "./utilities/buttons/OpenControl"
import { selectGenPos } from "./Functions"

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            side: props.side,
            selected: null,
            turnStart: null,
            msg: null,
            msgType: null,
            possiblePos: [],
        };
        
        this.updateSelect = this.updateSelect.bind(this);
        this.updateTurnStart = this.updateTurnStart.bind(this);
        this.updatePossiblePos = this.updatePossiblePos.bind(this);
        this.updateMsg = this.updateMsg.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleUnSelect = this.handleUnSelect.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handlePawnPromo = this.handlePawnPromo.bind(this);
        this.handleKeyboardControl = this.handleKeyboardControl.bind(this);
    }

    updateSelect(selectInfo) {
        console.log(selectInfo);
        this.setState({
            selected: selectInfo,
        });
    }

    updateTurnStart(side) {
        this.setState({
            turnStart: side,
        });
    }

    updatePossiblePos(newPossiblePos) {
        this.setState({
            possiblePos: newPossiblePos
        });
    }

    updateMsg(newType, newMsg) {
        this.setState({
            msgType: newType,
            msg: newMsg,
        });
    }

    encode(a, b) {
        return a * 8 + b;
    }

    checkMove(oldRow, oldCol, newRow, newCol, selected = null) {
        let selectFunct = selected ? selected[3] : this.state.selected[3];
        const posbt = selectFunct(oldRow, oldCol, this.props.sideMap);
        return posbt.includes(this.encode(newRow, newCol));
    }

    handleUnSelect(pieceName, oldRow, oldCol) {
        let msg = `Un-selected ${pieceName} at (${oldRow}, ${oldCol})`;
        this.updateSelect(null);
        this.updatePossiblePos(null);
        this.updateMsg("complete", msg);
    }

    handleSelect(oldPieceName, oldRow, oldCol, newRow, newCol, moveInfo) {
        let msg = `Moved ${oldPieceName} to (${newRow}, ${newCol})`;
        this.updateSelect(null);
        this.updateMsg("complete", msg);
        let isComplete = this.props.updateBoard(oldRow, oldCol, newRow, newCol);
        this.props.addHistory(moveInfo);
        this.props.updateTurn();

        return isComplete;
    }

    handlePawnPromo(oldPieceName, oldSide, newRow, newCol) {
        if (oldPieceName === "pawn" &&
            ((oldSide === 1 && newRow === 7)
          || (oldSide === 2 && newRow === 0))) {
            document.body.classList.add("open-promo");
            console.log("set pawn promotion", oldSide);
            this.props.setPawnPromotion(oldSide, newRow, newCol);
        }
    }

    handleMove(oldPieceName, oldSide, oldRow, oldCol, newRow, newCol, selected = null) {
        let takeOverPiece = this.props.board[[newRow, newCol]];
        let takeOverSide = this.props.sideMap[[newRow, newCol]];

        let ok = this.checkMove(oldRow, oldCol, newRow, newCol, selected);
        console.log(`move ${oldPieceName} from (${oldRow}, ${oldCol}) to (${newRow}, ${newCol})`);
        if (ok) {
            // Move Info (for history)
            let moveInfo = {
                isPawnPromotion: false,
                pieceName: oldPieceName,
                pieceSide: oldSide,
                pieceOldRow: oldRow,
                pieceOldCol: oldCol,
                pieceNewRow: newRow,
                pieceNewCol: newCol,
                takeOverName: null,
                takeOverSide: null,
                takeOverRow: null,
                takeOverCol: null,
            };

            // Deal with possible piece take over
            if (takeOverSide && takeOverPiece) {
                this.props.updatePieceCnt(takeOverSide, takeOverPiece);
                moveInfo.takeOverName = takeOverPiece;
                moveInfo.takeOverSide = takeOverSide;
                moveInfo.takeOverRow = newRow;
                moveInfo.takeOverCol = newCol;
            }
            
            // Select piece
            let isComplete = this.handleSelect(oldPieceName, oldRow, oldCol, newRow, newCol, moveInfo);

            // Deal with possible pawn promotion
            if (!isComplete)
                this.handlePawnPromo(oldPieceName, oldSide, newRow, newCol);

            // Clear possible positions
            this.updatePossiblePos(null);
            
            // For Timer
            this.updateTurnStart(oldSide);
        } else {
            // Warning: wrong move
            this.updateMsg("warning", `Wrong move`);
        }
    }

    handleClick(piece) {
        if (this.props.complete) return;
        
        let selectInfo = this.state.selected;
        let side = piece.side;
        let turn = this.props.turn;
        let newRow = piece.row;
        let newCol = piece.col;
        let pieceName = piece.name;
        
        if (selectInfo) {
            let oldRow = selectInfo[0];
            let oldCol = selectInfo[1];
            let oldPieceName = selectInfo[2];
            let oldSide = this.props.sideMap[[oldRow, oldCol]];

            // Already selected piece, now selecting destination
            if (newRow === oldRow && newCol === oldCol) {
                // un-select piece
                this.handleUnSelect(pieceName, oldRow, oldCol);
            } else {
                this.handleMove(oldPieceName, oldSide, oldRow, oldCol, newRow, newCol);
            }
        } else {
            if (side === turn) {
                if (!pieceName) return;
                // this is 'side''s turn
                this.updateSelect([newRow, newCol, pieceName, piece.genPossibilities]);
                this.updateMsg("complete", `Selected ${pieceName} at (${newRow}, ${newCol})`);
                const posbt = piece.genPossibilities(newRow, newCol, this.props.sideMap);
                this.updatePossiblePos(posbt);
            } else {
                // this isn't 'side''s turn
                this.updateMsg("warning", `It's ${turn === 1 ? "black" : "white"}'s turn`);
            }
        }
    }

    handleDoubleClick(piece) {
        if (this.props.complete) return;

        let side = piece.side;
        let turn = this.props.turn;
        let newRow = piece.row;
        let newCol = piece.col;
        let pieceName = piece.name;

        if (side === turn) {
            this.updateSelect([newRow, newCol, pieceName, piece.genPossibilities]);
            const posbt = piece.genPossibilities(newRow, newCol, this.props.sideMap);
            this.updatePossiblePos(posbt);
            this.updateMsg("complete", `Selected ${this.props.name} at (${newRow}, ${newCol})`);
        } else {
            this.updateMsg("warning", `It's ${turn === 1 ? "black" : "white"}'s turn`);
        }
    }

    handleKeyboardControl(row1, col1, row2, col2) {
        if (this.props.complete) return;

        let oldSide = this.props.sideMap[[row1, col1]];
        let turn = this.props.turn;
        let oldPieceName = this.props.board[[row1, col1]];
        if (oldSide === turn) {
            let selectInfo = [row1, col1, oldPieceName, selectGenPos(oldPieceName)]
            const posbt = selectGenPos(oldPieceName)(row1, col1, this.props.sideMap);
            this.updatePossiblePos(posbt);
            this.handleMove(oldPieceName, oldSide, row1, col1, row2, col2, selectInfo);
        } else {
            console.log(oldSide, turn);
            this.updateMsg("warning", `It's ${turn === 1 ? "black" : "white"}'s turn`);
        }
    }
    
    render() {
        return (
            <>
                <Turn
                    gameComplete={this.props.complete}
                    winner={this.props.winner}
                    turn={this.props.turn}
                    newGame={this.props.newGame}
                />
                <Timer
                    gameComplete={this.props.complete}
                    isTimeLim={this.props.isTimeLim}
                    whiteTime={this.props.whiteTime}
                    blackTime={this.props.blackTime}
                    turnStart={this.state.turnStart}
                    completed={this.props.completed}
                    updateTimeLeft={this.props.updateTimeLeft}
                />
                <Board
                    {...this.state}
                    showPos={this.props.showPos}
                    board={this.props.board}
                    sideMap={this.props.sideMap}
                    handleClick={this.handleClick}
                    handleDoubleClick={this.handleDoubleClick}
                />
                <Message
                    type={this.state.msgType}
                    msg={this.state.msg}
                />
                <div className="countCont">
                    <OpenPieceCntBtn
                        openPieceCnt={this.props.openPieceCnt}
                    />
                    <Counter
                        pieceCnt={this.props.pieceCnt}
                        initPieceCnt={this.props.initPieceCnt}
                    />
                </div>
                <PawnPromotion
                    pawnPromotion={this.props.pawnPromotion}
                />
                <div className="controlCont">
                    <OpenControlBtn
                        openKeyboardControl={this.props.openKeyboardControl}
                    />
                    <KeyboardControl
                        handleKeyboardControl={this.handleKeyboardControl}
                    />
                </div>
            </>
        );
    }
}