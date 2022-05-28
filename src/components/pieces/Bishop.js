import {inRange, encode} from "./../Functions"

export default function bishopGenPos(row, col, sideMap) {
    const dirs = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    let side = sideMap[[row, col]];
    let posbt = [];
    for (let dir of dirs) {
        for (   let i = row, j = col;
                inRange(i, j);
                i += dir[0], j += dir[1]  ) {
            if (i === row && j === col)
                continue;
            if (sideMap[[i, j]] === side)
                break;
            posbt.push(encode(i, j));
            if (sideMap[[i, j]])
                break;
        }
    }

    return posbt;
}