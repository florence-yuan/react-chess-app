import React from "react"

function formatTime(time) {
    let hrs = parseInt(time / 3600);
    let mins = parseInt(time % 3600 / 60);
    let secs = time % 3600 % 60;

    let hstr = (hrs > 0) ? hrs + ":" : "";
    let mstr = (mins >= 10) ? mins : `0${mins}`;
    let sstr = (secs >= 10) ? secs : `0${secs}`;

    let res = `${hstr}${mstr}:${sstr}`;

    return res;
}

function TimePanel(props) {
    let titleSide = props.side === "white" ? "White" : "Black";
    return (
        <div
            className={`timePanel timePanel${titleSide}`}
        >
            <div className="timePanelColor" />
            <div className="timeLeft">
                {formatTime(props.time)}
            </div>
        </div>
    )
}

export default class Timer extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            whiteTime: props.whiteTime,
            blackTime: props.blackTime,
        }

        if (this.props.isTimeLim) {
            setInterval(
                () => this.tick(this.props.turnStart),
            1000);
        }

        this.props.updateTimeLeft(1, this.props.whiteTime);
        this.props.updateTimeLeft(2, this.props.blackTime);

        this.tick = this.tick.bind(this);
    }

    tick(side) {
        if (!side || this.props.gameComplete) return;
        if (side === 1) {
            this.setState((state) => {
                    if (state.whiteTime > 0) {
                        return {
                            whiteTime: state.whiteTime - 1
                        }
                    } else {
                        this.props.completed(1);
                    }
                }
            );
        } else {
            this.setState((state) => {
                    if (state.blackTime > 0) {
                        return {
                            blackTime: state.blackTime - 1
                        }
                    } else {
                        this.props.completed(2);
                    }
                }
            );
        }
    }

    render() {
        if (this.props.isTimeLim) {
            return (
                <div className="timer">
                    <TimePanel
                        side="white"
                        time={this.state.whiteTime}
                        tick={this.tick}
                        turnStart={this.props.turnStart}
                    />
                    <TimePanel
                        side="black"
                        time={this.state.blackTime}
                        tick={this.tick}
                        turnStart={this.props.turnStart}
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}