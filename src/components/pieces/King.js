import {inRange, encode} from "./../Functions"

export default function kingGenPos(row, col, sideMap) {
    let posbt = [];
    let side = sideMap[[row, col]];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let newRow = row + i;
            let newCol = col + j;
            if (inRange(newRow, newCol) &&
                sideMap[[newRow, newCol]] !== side) {
                posbt.push(encode(newRow, newCol));
            }
        }
    }

    return posbt;
}