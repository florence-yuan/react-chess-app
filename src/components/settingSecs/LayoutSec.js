function IndSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" defaultChecked
                onChange={
                    (e) => {
                        props.updateShowPos(e.target.checked);
                    }
                }
                tabIndex="0"
            />
            <span className="slider round"></span>
        </label>
    )
}

function CntSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" id="input2"
                onChange={
                    (e) => {
                        props.openPieceCnt();
                    }
                }
                tabIndex="0"
            />
            <span className="slider round"></span>
        </label>
    )
}

export default function LayoutSec(props) {
    return (
        <div>
            <div className="setting switchSet">
                <span>Indicate possible positions for piece movement</span>
                <IndSwitch
                    updateShowPos={props.updateShowPos}
                />
            </div>
            <div className="setting switchSet">
                <span>Open table of piece count for black and white sides</span>
                <CntSwitch
                    openPieceCnt={props.openPieceCnt}
                />
            </div>
        </div>
    )
}