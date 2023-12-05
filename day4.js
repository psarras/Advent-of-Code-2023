import {readIteratorAsArray} from "./bot.js";
import {fileURLToPath} from "url";

export function CalcCard(line) {
    let data = {};
    let card = line.split(":");
    let numberComponents = card[0].split(" ").filter(x => x !== "");
    data.cardNumber = parseInt(numberComponents[1]);
    if (isNaN(data.cardNumber))
        console.log(`cardNumber:${card[0]} ${numberComponents[1]}`)
    let scratchCard = card[1].split("|");
    data.winningNumbers = scratchCard[0].split(" ")
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));
    data.scratchNumbers = scratchCard[1].split(" ")
        .map(x => parseInt(x))
        .filter(x => !isNaN(x));
    let value = 0;
    data.wins = 0;
    // console.log(`winningNumbers: ${winningNumbers}`);
    // console.log(`scratchNumbers: ${scratchNumbers}`);
    for (const winningNumber of data.winningNumbers) {
        if (data.scratchNumbers.includes(winningNumber)) {
            if (value === 0) value = 1; else value *= 2;
            data.wins++;
        }
    }
    return [value, data];
}

export function SumOfCardValues(lines) {
    let data = {};
    let sum = 0;
    for (const line of lines) {
        let [value, d] = CalcCard(line);
        data[d.cardNumber] = d;
        sum += value;
    }
    return [sum, data];
}

async function dayOne(path) {
    let lines = await readIteratorAsArray(path);
    let sum = SumOfCardValues(lines);
    console.log(`Day 1: ${sum}`);
}

async function dayTwo(path) {
    let lines = await readIteratorAsArray(path);
    let sum = CountWinCards(lines);
    console.log(`Day 2: ${sum}`);
}

export function CountWinCards(example) {
    let [sum, data] = SumOfCardValues(example);
    let cards = [];
    let wins = 0;
    for (const [key, values] of Object.entries(data).reverse()) {
        cards.push(values);
    }
    wins += cards.length;
    while (cards.length > 0) {
        let card = cards.pop();
        if (card.wins === 0) continue;
        wins += card.wins;
        for (let i = 0; i < card.wins; i++) {
            let index = 1 + i + card.cardNumber;
            cards.push(data[index]);
        }
    }

    return wins;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    await dayOne("day4.input.txt");
    await dayTwo("day4.input.txt");
}
