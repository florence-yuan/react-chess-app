export default function OpenPiecePosBtn() {
    return (
        <button
            className="btn open-piece-pos ripple-effect"
            title="show piece positions"
            onClick={
                function () {
                    if (document.body.classList.contains('open-piece-pos'))
                        document.body.classList.remove('open-piece-pos');
                    else
                        document.body.classList.add('open-piece-pos');
                }
            }
            tabIndex="0"
            aria-label="show piece positions"
        />
    )
}