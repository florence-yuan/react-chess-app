import React from "react"
import Board from "./Board"
import Turn from "./utilities/Turn"
import Timer from "./Timer"
import Message from "./utilities/Message"
import Counter from "./Counter"
import PawnPromotion from "./PawnPromotion"
import OpenPieceCntBtn from "./utilities/buttons/OpenPieceCnt"

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            side: props.side,
            color: props.color,
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
    }

    updateSelect(pos) {
        this.setState({
            selected: pos,
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
                    turn={this.props.turn}
                    board={this.props.board}
                    sideMap={this.props.sideMap}
                    showPos={this.props.showPos}
                    addHistory={this.props.addHistory}

                    complete={this.props.complete}
                    updateTurn={this.props.updateTurn}
                    updateSelect={this.updateSelect}
                    updateBoard={this.props.updateBoard}
                    updatePieceCnt={this.props.updatePieceCnt}
                    updatePossiblePos={this.updatePossiblePos}
                    updateMsg={this.updateMsg}
                    updateTurnStart={this.updateTurnStart}
                    setPawnPromotion={this.props.setPawnPromotion}
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
            </>
        );
    }
}