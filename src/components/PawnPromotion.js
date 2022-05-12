function PawnPromoPanel(props) {
    return (
        <div
            className="promo-opt"
            onClick={() => props.pawnPromotion(props.name)}
        >
            <input
                type="radio"
                id={`promo ${props.name}`}
                name="promo type"
                value={`${props.name}`}
            />
            <label
                htmlFor={`promo ${props.name}`}
            >
                {props.name}
            </label>
        </div>
    )
}

export default function PawnPromotion(props) {
    return (
        <div className="pawn_promo">
            <span>Congratulations! Your pawn has reached the end!</span>
            <br />
            <span>Promote your pawn to one of the following --</span>
            <div className="promo_opts">
                <PawnPromoPanel
                    key={0}
                    name="queen"
                    pawnPromotion={props.pawnPromotion}
                />
                <PawnPromoPanel
                    key={1}
                    name="knight"
                    pawnPromotion={props.pawnPromotion}
                />
                <PawnPromoPanel
                    key={2}
                    name="bishop"
                    pawnPromotion={props.pawnPromotion}
                />
                <PawnPromoPanel
                    key={3}
                    name="rook"
                    pawnPromotion={props.pawnPromotion}
                />
            </div>
        </div>
    )
}