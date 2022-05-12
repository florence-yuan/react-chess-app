import React from "react"
import King from "./pieces/King"
import Queen from "./pieces/Queen"
import Bishop from "./pieces/Bishop"
import Knight from "./pieces/Knight"
import Rook from "./pieces/Rook"
import Pawn from "./pieces/Pawn"
import Empty from "./pieces/Empty"

export default class Figure extends React.Component {
    render() {
        if (this.props.name) {
            let name = this.props.name;
            if (name === 'king')
                return <King {...this.props} />
            else if (name === 'queen')
                return <Queen {...this.props} />
            else if (name === 'bishop')
                return <Bishop {...this.props} />
            else if (name === 'knight')
                return <Knight {...this.props} />
            else if (name === 'rook')
                return <Rook {...this.props} />
            else if (name === 'pawn')
                return <Pawn {...this.props} />
            else
                console.error("Unknown piece");
        } else {
            return <Empty {...this.props} />;
        }
    }
}