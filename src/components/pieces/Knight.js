import {inRange, encode} from "./../Functions"

export default function knightGenPos(row, col, sideMap) {
    let side = sideMap[[row, col]];
    let posbt = [];
    for (let i = -2; i <= 2; i++) {
        if (i === 0) continue;
        let absj = 3 - Math.abs(i), j;
        for (let jp = -1; jp <= 1; jp += 2) {
            j = absj * jp;
            if (j === 0) continue;
            let newRow = row + i;
            let newCol = col + j;
            if (inRange(newRow, newCol) && sideMap[[newRow, newCol]] !== side) {
                posbt.push(encode(newRow, newCol));
            }
        }
    }

    return posbt;
}