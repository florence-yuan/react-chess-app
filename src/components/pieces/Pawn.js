import {inRange, encode} from "./../Functions"

export default function pawnGenPos(row, col, sideMap) {
    let posbt = [];
    let side = sideMap[[row, col]];
    if (side === 1) {
        let side1 = sideMap[[row + 1, col]];
        let side2 = sideMap[[row + 2, col]];
        if (row === 1) {
            if (side1 === side) {
                // posbt is empty
            } else if (side1 === 2) {
                posbt.push(encode(row + 1, col));
            } else {
                posbt.push(encode(row + 1, col));
                if (side2 !== side) {
                    posbt.push(encode(row + 2, col));
                }
            }
        } else {
            if (side1 !== side) {
                posbt.push(encode(row + 1, col));
            }
        }
    } else {
        let side1 = sideMap[[row - 1, col]];
        let side2 = sideMap[[row - 2, col]];
        if (row === 6) {
            if (side1 === side) {
                // posbt is empty
            } else if (side1 === 1) {
                posbt.push(encode(row - 1, col));
            } else {
                posbt.push(encode(row - 1, col));
                if (side2 !== side) {
                    posbt.push(encode(row - 2, col));
                }
            }
        } else {
            if (side1 !== side) {
                posbt.push(encode(row - 1, col));
            }
        }
    }
    let i = (side === 1) ? 1 : -1;
    for (let j = -1; j <= 1; j += 2) {
        let newRow = row + i;
        let newCol = col + j;
        if (inRange(newRow, newCol) &&
            sideMap[[newRow, newCol]] === 3 - side) {
            posbt.push(encode(newRow, newCol));
        }
    }

    return posbt;
}