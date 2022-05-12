import {toTitleCase} from "./../Functions"

function PieceStyleOpt(props) {
    return (
        <div className="ripple-effect">
            <input
                type="radio"
                id={`${props.pieceStyle}_style`}
                name="style"
                onChange={props.updateStyle}
                tabIndex="0"
                defaultChecked={props.default === true}
            />
            <label
                htmlFor={`${props.pieceStyle}_style`}
            >
                {toTitleCase(props.pieceStyle)} Style Chess Pieces
            </label>
        </div>
    )
}

export default function PieceStyleSec(props) {
    let isPlainDefault = props.pieceStyle === "plain";
    let isFancyDefault = props.pieceStyle === "fancy";

    return (
        <div className="setting pieceSet">
            <span>Choose chess piece style</span>
            <PieceStyleOpt
                pieceStyle="plain"
                updateStyle={props.updatePlainStyle}
                default={isPlainDefault}
            />
            <PieceStyleOpt
                pieceStyle="fancy"
                updateStyle={props.updateFancyStyle}
                default={isFancyDefault}
            />
        </div>
    )
}