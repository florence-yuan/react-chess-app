export default function UndoBtn(props) {
    const history = props.history;
    return (
        <button
            className="btn reverseOne ripple-effect"
            title="undo"
            onClick={() => {
                if (history[history.length - 1].isPawnPromotion)
                    props.timeTravel(-2)
                else
                    props.timeTravel(-1)
            }}
            disabled={history.length === 0}
            tabIndex="0"
            aria-label="undo one step"
        />
    )
}