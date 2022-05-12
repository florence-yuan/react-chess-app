import React from "react"

export default class Counter extends React.Component {
    render() {
        let cnts = [], j = 0;
        for (let i = 0; i < 2; i++) {
            let side = (i === 0) ? "black" : "white";
            let cntSet = this.props.pieceCnt[i];
            for (let piece of Object.keys(cntSet)) {
                let change = cntSet[piece] - this.props.initPieceCnt[piece];
                let ccolor = (change >= 0) ? 'var(--deep-sky-blue)' : 'gray';
                const tdstyle = {
                    color: ccolor,
                    fontWeight: "bold"
                }
                let cnt = (
                    <tr key={i * 2 + j}>
                        <td>{side}</td>
                        <td>{piece}</td>
                        <td>{cntSet[piece]}</td>
                        <td style={tdstyle}>{change}</td>
                    </tr>
                );
                cnts.push(cnt);
                j++;
            }
        }
        return (
            <table className="counter">
                <thead>
                    <tr>
                        <th>Side</th>
                        <th>Piece name</th>
                        <th>Count</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {cnts}
                </tbody>
            </table>
        )
    }
}