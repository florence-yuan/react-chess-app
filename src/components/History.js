export default function History(props) {
    const history = [];
    for (let ind in props.history) {
        let entry = props.history[ind];
        if (entry.isPawnPromotion)
            continue;
        let nentry = -1;
        if (props.history) nentry = props.history[(parseInt(ind) + 1).toString(10)];
        let centry = `Move ${entry.pieceSide === 1 ? "black" : "white"} ${entry.pieceName}\
         from (${entry.pieceOldRow}, ${entry.pieceOldCol})\
         to (${entry.pieceNewRow}, ${entry.pieceNewCol})`;
        let tentry = "";
        if (entry.takeOverName) {
            tentry = ` , take over ${entry.takeOverSide === 1 ? "black" : "white"} ${entry.takeOverName}`;
        }
        centry += tentry;
        if (nentry && nentry.isPawnPromotion) {
            centry += `, promote ${nentry.pieceSide === 1 ? "black" : "white"}  pawn\
            at (${nentry.row}, ${nentry.col}) to ${nentry.newPieceName}`;
        }
        history.push(
            <li
                key={ind}
                onClick={() => props.timeTravel(ind)}
            >{centry}
            </li>
        );
    }
    if (history.length === 0) {
        history.push(
            <li key={0} style={{cursor: "text"}}>History is empty</li>
        );
    }
    return (
        <ol className="history">
            {history}
        </ol>
    );
}