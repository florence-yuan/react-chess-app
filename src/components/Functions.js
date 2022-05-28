import kingGenPos from "./pieces/King";
import queenGenPos from "./pieces/Queen";
import bishopGenPos from "./pieces/Bishop";
import rookGenPos from "./pieces/Rook";
import knightGenPos from "./pieces/Knight";
import pawnGenPos from "./pieces/Pawn";

export function lsGet(str) {
    return JSON.parse(localStorage.getItem(str));
}

export function lsSet(str, obj) {
    localStorage.setItem(str, JSON.stringify(obj));
}

export function toTitleCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export function inRange(row, col) {
    return (row >= 0 && row < 8 && col >= 0 && col < 8);
}

export function encode(a, b) {
    return a * 8 + b;
}

export function selectGenPos(name) {
    let genPos;
    if (name === "king") {
        genPos = kingGenPos;
    } else if (name === "queen") {
        genPos = queenGenPos;
    } else if (name === "bishop") {
        genPos = bishopGenPos;
    } else if (name === "rook") {
        genPos = rookGenPos;
    } else if (name === "knight") {
        genPos = knightGenPos;
    } else if (name === "pawn") {
        genPos = pawnGenPos;
    }

    return genPos;
}