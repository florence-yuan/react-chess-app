import Counter from "./Counter"

export default function CounterCont(props) {
    return (
        <div className="countCont">
            <button
                className="btn more"
                title="piece count"
                aria-label="open piece count"
                onClick={props.openPieceCnt}
                tabIndex="0"
            >
            </button>
            <Counter
                pieceCnt={props.pieceCnt}
                initPieceCnt={props.initPieceCnt}
            />
        </div>
    );
}