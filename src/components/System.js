import React from "react"
import Game from "./Game"
import Setting from "./Setting"
import Modal from "./utilities/Modal";
import ErrorBoundary from "./ErrorBoundary"
import {lsGet, lsSet} from "./Functions"

const columns = {
    king: [4],
    queen: [3],
    bishop: [2, 5],
    knight: [1, 6],
    rook: [0, 7],
    pawn: [0, 1, 2, 3, 4, 5, 6, 7],
};

let board = {};
let sideMap = {};

const initPieceCnt = {
    king: 1,
    queen: 1,
    bishop: 2,
    knight: 2,
    rook: 2,
    pawn: 8,
}

let sideCnt = {
    king: 1,
    queen: 1,
    bishop: 2,
    knight: 2,
    rook: 2,
    pawn: 8,
};

let sideCnt2 = {
    king: 1,
    queen: 1,
    bishop: 2,
    knight: 2,
    rook: 2,
    pawn: 8,
};

let pieceCnt = {
    0: sideCnt,
    1: sideCnt2
};

export default class System extends React.Component {
	constructor(props) {
		super(props);

        for (let side = 1; side <= 2; side++) {
            for (let piece of Object.keys(columns)) {
                for (let pp in columns[piece]) {
                    let line;
                    if (piece === "pawn") {
                        line = (side === 1) ? 1 : 6;
                    } else {
                        line = (side === 1) ? 0 : 7;
                    }
                    board[[line, columns[piece][pp]]] = piece;
                    sideMap[[line, columns[piece][pp]]] = side;
                }
            }
        }

        this.state = {
            showPos: true,
            history: lsGet("history") || [],
            complete: lsGet("complete") || false,
            winner: lsGet("winner") || null,
            turn: lsGet("turn") || 2,
            board: lsGet("board") || board,
            sideMap: lsGet("sideMap") || sideMap,
            pieceCnt: lsGet("pieceCnt") || pieceCnt,
            pawnPromoInfo: {
                side: null,
                row: null,
                col: null,
            },
            isTimeLim: lsGet("whiteTime") ? true : false,
            whiteTime: lsGet("whiteTime") || null,
            blackTime: lsGet("blackTime") || null,
            colorMode: lsGet("colorMode") || "system",
            pieceStyle: lsGet("pieceStyle") || "plain",
        };

        this.newGame = this.newGame.bind(this);
        this.completed = this.completed.bind(this);
        this.updateTurn = this.updateTurn.bind(this);

        this.updateBoard = this.updateBoard.bind(this);
        this.updatePieceCnt = this.updatePieceCnt.bind(this);
        this.addPiece = this.updateAddPiece.bind(this);

        this.updateShowPos = this.updateShowPos.bind(this);
        this.updateColorMode = this.updateColorMode.bind(this);
        this.updatePieceStyle = this.updatePieceStyle.bind(this);

        this.addHistory = this.addHistory.bind(this);
        this.timeTravel = this.timeTravel.bind(this);

        this.setPawnPromotion = this.setPawnPromotion.bind(this);
        this.pawnPromotion = this.pawnPromotion.bind(this);

        this.updateIsTimeLim = this.updateIsTimeLim.bind(this);
        this.updateTimeLim = this.updateTimeLim.bind(this);
        this.updateTimeLeft = this.updateTimeLeft.bind(this);
	}

    /* Game */

    newGame() {
        localStorage.clear();
        window.location.reload();
    }

    completed(side) {
        side = (side === 1) ? "black" : "white";
        this.setState({
            complete: true,
            winner: side,
        });
        lsSet("complete", true);
        lsSet("winner", side);
    }
    
    updateTurn() {
        let newTurn = (this.state.turn === 2) ? 1 : 2;
        this.setState({
            turn: newTurn,
        });
        lsSet("turn", newTurn);
    }

    updateBoard(origx, origy, newx, newy) {
        let flag = false, side;
        if (this.state.board[[newx, newy]] === "king") {
            flag = true;
            side = this.state.sideMap[[origx, origy]];
        }
        
        let newBoard = this.state.board;
        newBoard[[newx, newy]] = newBoard[[origx, origy]];
        newBoard[[origx, origy]] = null;

        let newSideMap = this.state.sideMap;
        newSideMap[[newx, newy]] = newSideMap[[origx, origy]];
        newSideMap[[origx, origy]] = null;
        this.setState({
            board: newBoard,
            sideMap: newSideMap,
        });

        lsSet("board", newBoard);
        lsSet("sideMap", newSideMap);

        if (flag) {
            this.completed(side);
        }

        return flag;
    }

    updatePieceCnt(side, piece, minus = true) {
        side--;
        let newPieceCnt = this.state.pieceCnt;
        if (minus)
            newPieceCnt[side][piece]--;
        else
            newPieceCnt[side][piece]++;
        this.setState({
            pieceCnt: newPieceCnt
        });
        lsSet("pieceCnt", newPieceCnt);
    }

    /* Settings */

    openPieceCnt() {
        const counter = document.querySelector(".counter");
        if (counter.classList.contains('open-counter')) {
            counter.classList.remove('open-counter');
            document.querySelector("#input3").checked = false;
        } else {
            counter.classList.add('open-counter');
            document.querySelector("#input3").checked = true;
        }
    }

    openKeyboardControl() {
        const keyboard = document.querySelector(".keyboard-control");
        if (keyboard.classList.contains('open-keyboard')) {
            keyboard.classList.remove('open-keyboard');
            document.querySelector("#input4").checked = false;
        } else {
            keyboard.classList.add('open-keyboard');
            document.querySelector("#input4").checked = true;
        }
    }

    updateShowPos(newShowPos) {
        this.setState({
            showPos: newShowPos,
        });
    }

    updateDisplayPos() {
        if (document.body.classList.contains('open-piece-pos')) {
            document.body.classList.remove('open-piece-pos');
            document.querySelector("#input2").checked = false;
        } else {
            document.body.classList.add('open-piece-pos');
            document.querySelector("#input2").checked = true;
        }
    }

    updateColorMode(newColorMode) {
        this.setState({
            colorMode: newColorMode,
        });
        lsSet("colorMode", newColorMode);
    }

    updatePieceStyle(newPieceStyle) {
        this.setState({
            pieceStyle: newPieceStyle,
        });
        lsSet("pieceStyle", newPieceStyle);
    }

    /* Time Travel (History) */

    updateAddPiece(name, side, row, col) {
        let newBoard = this.state.board;
        newBoard[[row, col]] = name;
        let newSideMap = this.state.sideMap;
        newSideMap[[row, col]] = side;
        this.setState({
            board: newBoard,
            sideMap: newSideMap,
        });
        lsSet("board", newBoard);
        lsSet("sideMap", newSideMap);
    }

    updateAlterPiece(name, row, col) {
        let newBoard = this.state.board;
        newBoard[[row, col]] = name;
        this.setState({
            board: newBoard,
        });
        lsSet("board", newBoard);
    }

    addHistory(info) {
        // info: [old piece name], [old piece side], [old piece old row]
        // [old piece old col], [old piece new row], [old piece new col]
        // [take over piece name], [take over piece side], [take over piece row], [take over piece col]
        let newHistory = this.state.history;
        newHistory.push(info);
        this.setState({
            history: newHistory,
        });
        lsSet("history", newHistory);
    }

    timeTravel(index) {
        // reverse steps (re-add eliminated pieces)
        const hisLen = this.state.history.length;
        let pawnPromoCnt = 0;
        if (hisLen === 0) return;
        if (index < 0)
            index = hisLen + index;
        if (index < 0)
            return;
        for (let i = hisLen - 1; i >= index; i--) {
            const entry = this.state.history[i];
            if (entry.isPawnPromotion) {
                this.updateAlterPiece(entry.oldPieceName, entry.row, entry.col);
                this.updatePieceCnt(entry.side, entry.oldPieceName, false);
                this.updatePieceCnt(entry.side, entry.newPieceName);
                pawnPromoCnt++;
            } else {
                let origX = entry.pieceOldRow;
                let origY = entry.pieceOldCol;
                let newX = entry.pieceNewRow;
                let newY = entry.pieceNewCol;
                this.updateBoard(newX, newY, origX, origY);
                let tname = entry.takeOverName;
                let tside = entry.takeOverSide;
                let trow = entry.takeOverRow;
                let tcol = entry.takeOverCol;
                if (tname) {
                    this.updateAddPiece(tname, tside, trow, tcol);
                    this.updatePieceCnt(tside, tname, false);
                }
            }
        }

        // slice off unneeded history
        let newHistory = this.state.history;
        newHistory = newHistory.slice(0, index);
        this.setState({
            history: newHistory,
        });
        lsSet("history", newHistory);

        // change turn to that at the time of the current entry
        let entryParity = (hisLen - pawnPromoCnt - index) % 2;
        if (entryParity === 1) {
            this.updateTurn();
        }
    }

    /* Pawn Promotion */

    setPawnPromotion(side, row, col) {
        this.setState({
            pawnPromoInfo: {
                side: side,
                row: row,
                col: col,
            },
        });
    }

    pawnPromotion(pieceName) {
        document.body.classList.remove("open-promo");
        let side = this.state.pawnPromoInfo.side;
        let row = this.state.pawnPromoInfo.row;
        let col = this.state.pawnPromoInfo.col;
        let newHistory = this.state.history;
        newHistory.push({
            isPawnPromotion: true,
            oldPieceName: this.state.board[[row, col]],
            newPieceName: pieceName,
            side: side,
            row: row,
            col: col,
        });
        this.updatePieceCnt(side, this.state.board[[row, col]]);
        this.updatePieceCnt(side, pieceName, false);
        this.setState({
            history: newHistory,
        });
        let newBoard = this.state.board;
        newBoard[[row, col]] = pieceName;
        this.setState({
            board: newBoard,
        });
        lsSet("history", newHistory);
        lsSet("board", newBoard);
    }

    /* Set Time Limit */

    updateIsTimeLim(newIsTimeLim) {
        this.newGame();
        this.setState({
            isTimeLim: newIsTimeLim,
        });
    }

    updateTimeLim(time) {
        this.updateIsTimeLim(true);
        this.setState({
            blackTime: time,
            whiteTime: time,
        });
        lsSet("blackTime", time);
        lsSet("whiteTime", time);
        lsSet("timeLimOpt", time);

        window.location.reload();
    }

    updateTimeLeft(side, time) {
        if (side === 1) {
            this.setState({
                blackTime: time,
            });
            lsSet("blackTime", time);
        } else {
            this.setState({
                whiteTime: time,
            });
            lsSet("whiteTime", time);
        }
    }

	render() {
		return (
			<ErrorBoundary>
				<Game
                    {...this.state}
                    initPieceCnt={initPieceCnt}

                    newGame={this.newGame}
                    completed={this.completed}
                    updateTurn={this.updateTurn}

                    updateBoard={this.updateBoard}
                    updatePieceCnt={this.updatePieceCnt}

                    openPieceCnt={this.openPieceCnt}
                    openKeyboardControl={this.openKeyboardControl}

                    addHistory={this.addHistory}

                    setPawnPromotion={this.setPawnPromotion}
                    pawnPromotion={this.pawnPromotion}
                    
                    updateIsTimeLim={this.updateIsTimeLim}
                    updateTimeLeft={this.updateTimeLeft}
                />
                <Setting
                    {...this.state}
                    openPieceCnt={this.openPieceCnt}
                    openKeyboardControl={this.openKeyboardControl}
                    updateShowPos={this.updateShowPos}
                    updateDisplayPos={this.updateDisplayPos}
                    updateColorMode={this.updateColorMode}
                    updatePieceStyle={this.updatePieceStyle}
                    history={this.state.history}
                    timeTravel={this.timeTravel}
                    updateTimeLim={this.updateTimeLim}
                    updateIsTimeLim={this.updateIsTimeLim}
                />
                <Modal />
			</ErrorBoundary>
		);
	}
}