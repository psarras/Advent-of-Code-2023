import {readIteratorAsArray} from "./bot.js";

export function engineNumbers(lines) {
    let numbers = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let numberBuilder = "";
        let isAdjacentToSymbol = false;
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
            // console.log(`character: ${character}`)
            if (isNumber(character)) {
                numberBuilder += character;
                // console.log(`found number: ${numberBuilder}`);
                if (isSymbolAround(lines, j, i)) {
                    isAdjacentToSymbol = true;
                    // console.log(`found number: ${numberBuilder} and has Symbol Around`);
                }
            } else {
                if (isAdjacentToSymbol) {
                    numbers.push(parseInt(numberBuilder));
                    // console.log(`pushed number: ${numberBuilder}`);
                }
                numberBuilder = "";
                isAdjacentToSymbol = false;
            }

            // or if it is the last character
            if (j === line.length - 1) {

                if (isAdjacentToSymbol) {
                    numbers.push(parseInt(numberBuilder));
                    // console.log(`pushed number: ${numberBuilder}`);
                }
            }

        }

    }
    return numbers;
}

export function isSymbolAround(lines, i, j) {
    // console.log(`check around: ${lines[j][i]} ${i} - ${j}`)
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            let indexX = i + k;
            let indexY = j + l;
            if (0 == k && 0 == l)
                continue;

            if (indexY < 0 || indexY >= lines.length)
                continue;

            if (indexX < 0 || indexX >= lines[indexY].length)
                continue;

            let symbol = lines[indexY][indexX];
            if (notANumberOrDot(symbol)) return true;
        }
    }
    return false;
}

function isNumber(symbol) {
    return !isNaN(symbol);
    // return parseInt(symbol) || symbol === "0";
}

export function notANumberOrDot(symbol) {
    return !isNumber(symbol) && symbol !== ".";
}

export function engineNumbersSum(lines) {
    let numbers = engineNumbers(lines);
    // console.log(numbers);
    let sum = 0;
    for (const element of numbers) {
        sum += element;
    }
    return sum;
}

let path = "day3.input.txt";
let numbers = await readIteratorAsArray(path);
// console.log(numbers);
let answer1 = engineNumbersSum(numbers);
console.log(`Answer to Day3 ${answer1}`); // wrong 454952, 456840, 550853


