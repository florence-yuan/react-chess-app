export default function NewGameBtn(props) {
    return (
        <button
            className="newGame ripple-effect"
            onClick={props.newGame}
            style={{ appearance: "none" }}
            tabIndex="0"
            aria-label="reset game / new game"
        >
            {props.children}
        </button>
    )
}