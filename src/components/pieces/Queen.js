import {inRange, encode} from "./../Functions"

export default function queenGenPos(row, col, sideMap) {
    let side = sideMap[[row, col]];
    let posbt = [];
    const dirs1 = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (let dir of dirs1) {
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
    const dirs2 = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
    for (let dir of dirs2) {
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