import React from "react"
import LayoutSec from "./settingSecs/LayoutSec";
import ColorModeSec from "./settingSecs/ColorModeSec";
import PieceStyleSec from "./settingSecs/PieceStyleSec";
import HistorySec from "./settingSecs/HistorySec";
import TimeLimSec from "./settingSecs/TimeLimSec";
import ColorModeBtn from "./utilities/buttons/ColorMode";
import UndoBtn from "./utilities/buttons/Undo";
import OpenSettingBtn from "./utilities/buttons/OpenSetting";
import CloseSettingBtn from "./utilities/buttons/CloseSetting";
import OpenPiecePosBtn from "./utilities/buttons/OpenPiecePos"

export default class Setting extends React.Component {
	constructor(props) {
		super(props);
        
        this.updateLightMode = this.updateLightMode.bind(this);
        this.updateDarkMode = this.updateDarkMode.bind(this);
        this.updateSystemMode = this.updateSystemMode.bind(this);

        this.updatePlainStyle = this.updatePlainStyle.bind(this);
        this.updateFancyStyle = this.updateFancyStyle.bind(this);
    }

    componentDidMount() {
        let pstyle = this.props.pieceStyle;
        if (pstyle === "plain") {
            this.updatePlainStyle();
        } else {
            this.updateFancyStyle();
        }
        
        let cmode = this.props.colorMode;
        if (cmode === "light") {
            this.updateLightMode();
        } else if (cmode === "dark") {
            this.updateDarkMode();
        } else {
            this.updateSystemMode();
        }
    }

    updateLightMode() {
        if (document.body.classList.contains("dark-mode"))
            document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        this.props.updateColorMode("light");
    }

    updateDarkMode() {
        if (document.body.classList.contains("light-mode"))
            document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        this.props.updateColorMode("dark");
    }

    updateSystemMode() {
        if (document.body.classList.contains("light-mode"))
            document.body.classList.remove("light-mode");
        else if (document.body.classList.contains("dark-mode"))
            document.body.classList.remove("dark-mode");
        this.props.updateColorMode("system");
    }

    updatePlainStyle() {
        if (document.body.classList.contains("fancy-style"))
            document.body.classList.remove("fancy-style");
        document.body.classList.add("plain-style");
        this.props.updatePieceStyle("plain");
    }

    updateFancyStyle() {
        if (document.body.classList.contains("plain-style"))
            document.body.classList.remove("plain-style");
        document.body.classList.add("fancy-style");
        this.props.updatePieceStyle("fancy");
    }

	render() {
        return (
            <>
                <OpenPiecePosBtn />
                <ColorModeBtn
                    updateColorMode={this.props.updateColorMode}
                    updateLightMode={this.updateLightMode}
                    updateDarkMode={this.updateDarkMode}
                />
                <UndoBtn
                    history={this.props.history}
                    timeTravel={this.props.timeTravel}
                />
                <OpenSettingBtn />
                <div className="settings">
                    <h1>SETTINGS</h1>
                    <section>
                        <h2>Appearance</h2>
                        <LayoutSec
                            updateShowPos={this.props.updateShowPos}
                            updateDisplayPos={this.props.updateDisplayPos}
                            openPieceCnt={this.props.openPieceCnt}
                            openKeyboardControl={this.props.openKeyboardControl}
                        />
                    </section>
                    <hr />
                    <section>
                        <h2>Color Mode</h2>
                        <ColorModeSec
                            key={this.props.colorMode}
                            colorMode={this.props.colorMode}
                            updateLightMode={this.updateLightMode}
                            updateDarkMode={this.updateDarkMode}
                            updateSystemMode={this.updateSystemMode}
                        />
                    </section>
                    <hr />
                    <section>
                        <h2>Chess Piece Style</h2>
                        <PieceStyleSec
                            pieceStyle={this.props.pieceStyle}
                            updatePlainStyle={this.updatePlainStyle}
                            updateFancyStyle={this.updateFancyStyle}
                        />
                    </section>
                    <hr />
                    <section>
                        <h2>History</h2>
                        <HistorySec
                            history={this.props.history}
                            timeTravel={this.props.timeTravel}
                        />
                    </section>
                    <hr />
                    <section>
                        <h2>Time Limit</h2>
                        <TimeLimSec
                            updateIsTimeLim={this.props.updateIsTimeLim}
                            updateTimeLim={this.props.updateTimeLim}
                        />
                    </section>
                    <CloseSettingBtn />
                </div>
            </>
        );
    }
}