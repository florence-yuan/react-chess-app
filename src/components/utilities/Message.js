import React from "react"

export default class Message extends React.Component {
    render() {
        if (this.props.msg) {
            return (
                <div
                    className={`msg ${this.props.type}`}
                    style={{opacity: 1}}
                >
                    <span>{this.props.msg}</span>
                </div>
            )
        } else {
            return (
                <div
                    className={`msg`}
                    style={{opacity: 0}}
                >
                    <span>{this.props.msg}</span>
                </div>
            )
        }
    }
}