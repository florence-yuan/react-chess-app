export default function OpenControlBtn(props) {
    return (
        <button
            className="btn open-control ripple-effect"
            title="open control"
            aria-label="open keyboard control"
            onClick={props.openKeyboardControl}
            tabIndex="0"
        />
    )
}