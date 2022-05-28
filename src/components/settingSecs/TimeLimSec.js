import react from "react"
import {lsGet} from "./../Functions"

function timeToSecs(time, unit) {
    if (unit === "hour") {
        return time * 3600;
    } else if (unit === "minute") {
        return time * 60;
    } else if (unit === "second") {
        return time;
    }

    return null;
}

function TimeLimRadio(props) {
    let secs = timeToSecs(props.time, props.unit);
    return (
        <input
            type="radio"
            id={props.id}
            name="time"
            tabIndex="0"
            checked={props.checked}
            onChange={() => {
                if (props.id === "no_time_lim") {
                    props.updateTimeLim(false);
                } else {
                    props.updateTimeLim(secs);
                }
            }}
        />
    )
}

function NoTimeLimOpt(props) {
    return (
        <div className="ripple-effect">
            <TimeLimRadio
                id={`no_time_lim`}
                checked={props.checked}
                updateTimeLim={props.updateIsTimeLim}
            />
            <label htmlFor={`no_time_lim`}>
                None
            </label>
        </div>
    )
}

function TimeLimOpt(props) {
    return (
        <div className="ripple-effect">
            <TimeLimRadio
                id={`${props.time}_${props.unit}`}
                time={props.time}
                unit={props.unit}
                checked={props.checked}
                updateTimeLim={props.updateTimeLim}
            />
            <label htmlFor={`${props.time}_${props.unit}`}>
                {props.time} {props.unit}{props.time > 1 ? 's' : ''}
            </label>
        </div>
    )
}

class CustomTimeLimInput extends react.Component {
	constructor(props) {
		super(props);
        this.state = {
            value: "",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let val = e.target.value, formattedVal;
        if (this.state.value.length > 1) {
            formattedVal = val.slice(val.length - 2, val.length);
            this.setState({
                value: formattedVal,
            });
            this.props.updateInput(this.props.unit, formattedVal);
        } else {
            formattedVal = (val.length === 1) ? "0" + val : val;
            this.setState({
                value: formattedVal,
            });
            this.props.updateInput(this.props.unit, formattedVal);
        }
        if (formattedVal.length < 2) {
            formattedVal = "0" + val;
            this.setState({
                value: formattedVal,
            });
            this.props.updateInput(this.props.unit, formattedVal);
        }
    }

    render() {
        return (
            <input
                type="number"
                min={this.props.minTime}
                max={this.props.maxTime}
                name={this.props.unit}
                id={this.props.unit}
                className="num-input"
                aria-label={this.props.unit}
                placeholder="00"
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }
}

class CustomTimeLimOpt extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            hrs: 0,
            mins: 0,
            secs: 0,
        }

        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(unit, value) {
        value = parseInt(value);
        if (unit === "hour") {
            this.setState({
                hrs: value,
            })
        } else if (unit === "minute") {
            this.setState({
                mins: value,
            })
        } else if (unit === "second") {
            this.setState({
                secs: value,
            })
        }
    }

    render() {
        return (
            <div className="custom-time-opt">
                <TimeLimRadio
                    id="custom_time"
                    time={
                        parseInt(this.state.hrs) * 3600
                        + parseInt(this.state.mins) * 60
                        + parseInt(this.state.secs)
                    }
                    unit="second"
                    updateTimeLim={this.props.updateTimeLim}
                />
                <label
                    htmlFor="custom_time"
                    className="custom-time-wrapper"
                >
                    <label htmlFor="cust">Enter custom time limit: </label>
                    <br />
                    <div className="time_input">
                        <CustomTimeLimInput
                            minTime="0"
                            maxTime="10"
                            unit="hour"
                            updateInput={this.updateInput}
                        />
                        <span className="time_colon">:</span>
                        <CustomTimeLimInput
                            minTime="0"
                            maxTime="59"
                            unit="minute"
                            updateInput={this.updateInput}
                        />
                        <span className="time_colon">:</span>
                        <CustomTimeLimInput
                            minTime="0"
                            maxTime="59"
                            unit="second"
                            updateInput={this.updateInput}
                        />
                    </div>
                </label>
            </div>
        )
    }
}

export default function TimeLimSec(props) {
    let timeLimOpt = lsGet("timeLimOpt") || -1;

    const optDatas = [
        [5, "minute"],
        [10, "minute"],
        [15, "minute"],
        [30, "minute"],
        [45, "minute"],
        [1, "hour"],
        [1.5, "hour"],
        [2, "hour"],
    ];

    let matched = false;
    let opts = optDatas.map((optData, i) => {
        let secs = optData[0] * (optData[1] === "minute" ? 60 : 3600);
        if (timeLimOpt === secs)
            matched = true;
        return (
            <TimeLimOpt
                key={i}
                time={optData[0]}
                unit={optData[1]}
                checked={timeLimOpt === secs}
                updateTimeLim={props.updateTimeLim}
            />
        )
    });

    return (
        <div className="setting timeSet">
            <span>Choose time limit</span>
            <NoTimeLimOpt
                checked={!matched}
                updateIsTimeLim={props.updateIsTimeLim}
            />
            {opts}
            <CustomTimeLimOpt
                updateTimeLim={props.updateTimeLim}
            />
        </div>
    )
}