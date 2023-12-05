import {readIteratorAsArray} from "./bot.js";
import {fileURLToPath} from "url";

export function engineNumbers(lines) {
    let data = {};
    let numbers = [];
    data.numberSymbols = [];
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let numberBuilder = "";
        let isAdjacentToSymbol = false;
        let symbolsAround = [];
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
            // console.log(`character: ${character}`)
            if (isNumber(character)) {
                numberBuilder += character;
                // console.log(`found number: ${numberBuilder}`);
                let symbolAround = isSymbolAround(lines, j, i);
                if (symbolAround.found) {
                    isAdjacentToSymbol = true;
                    for (const symbolAroundElement of symbolAround.symbols) {
                        if (!symbolsAround.filter(x => x.symbol === symbolAroundElement.symbol
                            && x.x === symbolAroundElement.x && x.y === symbolAroundElement.y).length > 0)
                            symbolsAround.push(symbolAroundElement);
                    }
                    // console.log(`found number: ${numberBuilder} and has Symbol Around`);
                }
            } else {
                if (isAdjacentToSymbol) {
                    numbers.push(parseInt(numberBuilder));
                    data.numberSymbols.push({number: parseInt(numberBuilder), symbols: symbolsAround});
                    // data.
                    // console.log(`pushed number: ${numberBuilder}`);
                }
                symbolsAround = [];
                numberBuilder = "";
                isAdjacentToSymbol = false;
            }

            // or if it is the last character
            if (j === line.length - 1) {

                if (isAdjacentToSymbol) {
                    numbers.push(parseInt(numberBuilder));
                    data.numberSymbols.push({number: parseInt(numberBuilder), symbols: symbolsAround});
                    // console.log(`pushed number: ${numberBuilder}`);
                }
            }

        }

    }
    data.numbers = numbers;
    return data;
}

function getId(symbol) {
    return `${symbol.x}-${symbol.y}`;
}

export function engineRatios(lines) {
    let data = engineNumbers(lines);
    // console.log(`data: ${JSON.stringify(data)}`);
    let numbersWithAsterisk = data.numberSymbols.filter(x => x.symbols.filter(y => y.symbol === "*").length > 0);
    // console.log(`numbersWithAsterisk: ${JSON.stringify(numbersWithAsterisk)}`);
    let groupsWithSameCoords = {};
    for (const numElement of numbersWithAsterisk) {
        for (const symbol of numElement.symbols) {
            let id = getId(symbol);
            if (!groupsWithSameCoords[id]) {
                groupsWithSameCoords[id] = [];
            }
            groupsWithSameCoords[id].push(numElement.number);
        }
    }
    groupsWithSameCoords = Object.values(groupsWithSameCoords).filter(x => x.length > 1);
    let sum = 0;
    for (const groupsWithSameCoord of groupsWithSameCoords) {
        let multiple = 1;
        for (const groupsWithSameCoordElement of groupsWithSameCoord) {
            multiple *= groupsWithSameCoordElement;
        }
        sum += multiple;
    }
    // console.log("====================================");
    // console.log(`groupsWithSameCoords: ${JSON.stringify(groupsWithSameCoords)}`);
    return sum;
}

export function isSymbolAround(lines, i, j) {
    // console.log(`check around: ${lines[j][i]} ${i} - ${j}`)
    let data = {};
    data.found = false;
    data.symbols = [];
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
            if (notANumberOrDot(symbol)) {
                data.found = true;
                data.symbols.push({symbol: symbol, x: indexX, y: indexY});
            }
        }
    }

    return data;
}


function isNumber(symbol) {
    return !isNaN(symbol);
}

export function notANumberOrDot(symbol) {
    return !isNumber(symbol) && symbol !== ".";
}

export function engineNumbersSum(lines) {
    let numbers = engineNumbers(lines).numbers;
    // console.log(numbers);
    let sum = 0;
    for (const element of numbers) {
        sum += element;
    }
    return sum;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    let path = "day3.input.txt";
    let numbers = await readIteratorAsArray(path);
    let answer1 = engineNumbersSum(numbers);
    console.log(`Answer to Day3 ${answer1}`);

    let sum = engineRatios(await readIteratorAsArray(path));
    console.log(`Answer to Day3 ${sum}`);
}