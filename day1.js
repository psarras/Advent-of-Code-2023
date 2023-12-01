import {readIterator} from "./bot.js";

export function numberOfDigits(value)
{
    let digits = 0;
    for (const char of value)
    {
        if (!isNaN(parseInt(char)))
            digits++;
    }
    return digits;
}

export function getFirstNumber(value)
{
    let parsed;
    for (const char of value)
    {
        parsed = parseInt(char);
        if (!isNaN(parsed))
            return parsed;
    }
}

export function getLastNumber(value)
{
    let reversedValue = value.split('').reverse();
    return getFirstNumber(reversedValue);
}

export function firstLastNumber(value)
{
    let combination = "";
    let first = getFirstNumber(value);
    let last = getLastNumber(value);
    combination = first + "" + last;
    return parseInt(combination);
}

console.log("Solution for Day 1, step 1")
let path1 = "day1.input.txt";
let sum = 0;
for await (const line of readIterator(path1))
{
    sum += firstLastNumber(line);
}
console.log(`Result ${sum}`);

