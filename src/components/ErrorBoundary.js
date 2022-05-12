import React from "react"

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="errorBoundary">
                    <div className="errorPic"></div>
                    <h1>Sorry, something went wrong.</h1>
                </div>
            );
        }
        return this.props.children;
    }
}