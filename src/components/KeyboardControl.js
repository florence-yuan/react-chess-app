import react from "react";
import {toTitleCase} from "./Functions";

function ControlInput(props) {
    let name = `${props.controlType}-${props.dir}`;
    let camelCaseName = `${props.controlType}${toTitleCase(props.dir)}`;
    return (
        <div className="control-input">
            <label htmlFor={name}>{props.dir === "row" ? "row" : "column"} </label>
            <input
                value={props.val}
                type="number"
                name={name}
                id={name}
                className="num-input"
                min="1"
                max="8"
                onChange={
                    (e) => {
                        props.handleInput(camelCaseName, e.target.value);
                    }
                }
            />
        </div>
    )
}

function ControlField(props) {
    return (
        <fieldset>
            <legend>{toTitleCase(props.controlType)} piece at</legend>
            <div className="control-inputs">
                <ControlInput
                    controlType={props.controlType}
                    dir="row"
                    val={props.row}
                    handleInput={props.handleInput}
                />
                <ControlInput
                    controlType={props.controlType}
                    dir="col"
                    val={props.col}
                    handleInput={props.handleInput}
                />
            </div>
        </fieldset>
    )
}

export default class KeyboardControl extends react.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectRow: "",
            selectCol: "",
            destinationRow: "",
            destinationCol: "",
        };

        this.handleInput = this.handleInput.bind(this);
    }

    inRange(row, col) {
        return (row >= 0 && row < 8 && col >= 0 && col < 8);
    }

    handleInput(inputName, inputVal) {
        this.setState({
            [inputName]: inputVal,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        console.log("select", this.state.selectRow, this.state.selectCol);
        console.log("destination", this.state.destinationRow, this.state.destinationCol);
        let row1 = this.state.selectRow;
        let col1 = this.state.selectCol;
        let row2 = this.state.destinationRow;
        let col2 = this.state.destinationCol;
        if (!row1 || !col1 || !row2 || !col2) {
            return;
        }
        if (!this.inRange(row1, col1) || !this.inRange(row2, col2)) {
            return;
        }
        this.props.handleKeyboardControl(
            row1 - 1, col1 - 1, row2 - 1, col2 - 1
        );
        this.handleInput("selectRow", "");
        this.handleInput("selectCol", "");
        this.handleInput("destinationRow", "");
        this.handleInput("destinationCol", "");
    }

    render() {
        return (
            <div className="keyboard-control">
                <form
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <div className="control-caption">
                        Keyboard Control
                    </div>
                    <span className="info">
                        Info: click on first button on top right
                        to display piece positions
                    </span>
                    <ControlField
                        row={this.state.selectRow}
                        col={this.state.selectCol}
                        controlType="select"
                        handleInput={this.handleInput}
                    />
                    <ControlField
                        row={this.state.destinationRow}
                        col={this.state.destinationCol}
                        controlType="destination"
                        handleInput={this.handleInput}
                    />
                    <input
                        type="submit"
                        id="control-submit-btn"
                        className="submit-btn"
                    />
                </form>
            </div>
        )
    }
}