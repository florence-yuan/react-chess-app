export default function OpenSettingBtn() {
    return (
        <button
            className="btn setSetting ripple-effect"
            title="setting"
            onClick={
                function () {
                    const body = document.body;
                    if (body.classList.contains('open-setting'))
                        body.classList.remove('open-setting');
                    else
                        body.classList.add('open-setting');
                }
            }
            tabIndex="0"
            aria-label="set settings"
        />
    )
}
