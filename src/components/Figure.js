import React from "react"
import Piece from "./pieces/Piece"
import Empty from "./pieces/Empty"

export default class Figure extends React.Component {
    render() {
        if (this.props.name) {
            return <Piece {...this.props} />
        } else {
            return <Empty {...this.props} />;
        }
    }
}