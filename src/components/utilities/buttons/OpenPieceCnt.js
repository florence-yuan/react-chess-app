export default function OpenPieceCntBtn(props) {
    return (
        <button
            className="btn more ripple-effect"
            title="piece count"
            aria-label="open piece count"
            onClick={props.openPieceCnt}
            tabIndex="0"
        />
    )
}
