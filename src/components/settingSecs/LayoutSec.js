function IndSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" id="input1"
                defaultChecked
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

function PosSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" id="input2"
                onChange={
                    (e) => {
                        props.updateDisplayPos(e.target.checked);
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
            <input type="checkbox" id="input3"
                onChange={
                    () => {
                        props.openPieceCnt();
                    }
                }
                tabIndex="0"
            />
            <span className="slider round"></span>
        </label>
    )
}

function KeyboardSwitch(props) {
    return (
        <label className="switch">
            <input type="checkbox" id="input4"
                onChange={
                    () => {
                        props.openKeyboardControl();
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
                <span>Display positions of pieces for keyboard control</span>
                <PosSwitch
                    updateDisplayPos={props.updateDisplayPos}
                />
            </div>
            <div className="setting switchSet">
                <span>Open table of piece count for black and white sides</span>
                <CntSwitch
                    openPieceCnt={props.openPieceCnt}
                />
            </div>
            <div className="setting switchSet">
                <span>Open form for keyboard control</span>
                <KeyboardSwitch
                    openKeyboardControl={props.openKeyboardControl}
                />
            </div>
        </div>
    )
}