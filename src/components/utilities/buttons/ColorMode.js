export default function ColorModeBtn(props) {
    let isLightMode = document.body.classList.contains("light-mode");
    let isDarkMode = document.body.classList.contains("dark-mode");
    let isSystemMode = document.body.classList.contains("system-mode");

    let curMode;
    if (isLightMode) {
        curMode = "light";
    } else if (isDarkMode) {
        curMode = "dark";
    } else if (isSystemMode) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            curMode = "dark";
        } else {
            curMode = "light";
        }
    }
    let newMode = (curMode === "light") ? "dark" : "light";

    return (
        <button
            className={`btn colorMode ${newMode}Mode ripple-effect`}
            title={`to ${newMode} mode`}
            onClick={
                () => {
                    if (newMode === "light") {
                        props.updateLightMode();
                        props.updateColorMode("light");
                    } else {
                        props.updateDarkMode();
                        props.updateColorMode("dark");
                    }
                }
            }
            tabIndex="0"
            aria-label={`switch to ${newMode} mode`}
        />
    )
}