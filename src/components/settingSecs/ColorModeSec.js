import {toTitleCase} from "./../Functions"

function ColorModeOpt(props) {
    return (
        <div className="ripple-effect">
            <input
                type="radio"
                id={`${props.colorMode}_mode`}
                name="mode"
                onChange={props.updateMode}
                tabIndex="0"
                defaultChecked={props.default === true}
            />
            <label
                htmlFor={`${props.colorMode}_mode`}
            >
                {toTitleCase(props.colorMode)} Mode
            </label>
        </div>
    )
}

export default function ColorModeSec(props) {
    let isLightDefault = props.colorMode === "light";
    let isDarkDefault = props.colorMode === "dark";
    let isSystemDefault = props.colorMode === "system";

    return (
        <div className="setting modeSet">
            <span>Choose color mode</span>
            <ColorModeOpt
                colorMode="light"
                updateMode={props.updateLightMode}
                default={isLightDefault}
            />
            <ColorModeOpt
                colorMode="dark"
                updateMode={props.updateDarkMode}
                default={isDarkDefault}
            />
            <ColorModeOpt
                colorMode="system"
                updateMode={props.updateSystemMode}
                default={isSystemDefault}
            />
        </div>
    )
}