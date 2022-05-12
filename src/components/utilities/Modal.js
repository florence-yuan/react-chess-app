export default function Modal() {
    return (
        <div className="modal"
            onClick={
                function () {
                    const body = document.body;
                    body.classList.remove('open-setting');
                    body.classList.remove('open-promo');
                }
            }
        />
    );
}