import History from "./../History"

function OpenHistory() {
    return (
        <span
            onClick={
                (e) => {
                    if (e.target.classList.contains("hist-open"))
                        e.target.classList.remove("hist-open");
                    else
                        e.target.classList.add("hist-open");
                }
            }
            tabIndex="0"
        >Open history and time travel
        </span>
    )
}

export default function HistorySec(props) {
    return (
        <div className="setting extSet">
            <OpenHistory />
            <div className="hist-ext">
                <span className="info">Info: Click on entry to reverse step and newer (following) steps</span>
                <History
                    history={props.history}
                    timeTravel={props.timeTravel}
                />
            </div>
        </div>
    )
}