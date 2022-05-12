export default function CloseSettingBtn() {
    return (
        <button
            className="btn closeSetting ripple-effect"
            title="close"
            onClick={
                () => {
                    document.body.classList.remove("open-setting")
                }
            }
            tabIndex="0"
            aria-label="close settings"
        />
    )
}