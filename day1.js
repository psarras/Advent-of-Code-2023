import {readIterator} from "./bot.js";


const spelledNumbersToDigits = {
    // "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};

export function firstFromAnywhereNumber(sentence)
{
    let smallestIndex = 99999;
    let smallestNumber = NaN;

    for (const [key, value] of Object.entries(spelledNumbersToDigits))
    {
        // console.log(`key: ${key}, value: ${value}`);
        let currentIndex = sentence.indexOf(key);
        if (currentIndex === -1)
            continue;
        if (currentIndex < smallestIndex)
        {
            smallestIndex = currentIndex;
            smallestNumber = value;
        }
    }

    return {index: smallestIndex, number: smallestNumber};
}

export function firstSpelledNumber(sentence)
{
    return getFirstNumber(convertToDigits(sentence));
}

function SpelledDigits(sentence)
{
    let found = [];
    for (const [key, value] of Object.entries(spelledNumbersToDigits))
    {
        let currentIndex = sentence.indexOf(key);
        if (currentIndex === -1)
            continue;

        found.push({index: currentIndex, original: key, value: value});
    }
    return found;
}

export function convertToDigits(sentence)
{
    let found = SpelledDigits(sentence);

    if (found.length === 0)
        return sentence;

    found.sort((a, b) => a.index - b.index);
    let shift = 0;
    for (let i = 0; i < found.length; i++)
    {
        let pack = found[i];
        // if (sentence.includes(pack.original))
        //     sentence = sentence.replace(pack.original, pack.value.toString());
        let actualIndex = shift + pack.index;
        sentence = sentence.slice(0, actualIndex) + pack.value + sentence.slice(actualIndex);
        shift += 1;
    }

    return sentence;
}

function indexOfPackage(sentence, substring, value)
{
    let currentIndex = sentence.indexOf(substring);
    if (currentIndex === -1)
        return {index: 99999, number: substring};
    return {index: currentIndex, number: substring};
}

export function FirstSpelledOrNumber(value)
{
    let firstSpelled = firstSpelledNumber(value);
    let number = getFirstNumber(value);
    let firstNumber = indexOfPackage(value, number.toString());
    if (firstSpelled.index < firstNumber.index)
        return firstSpelled.number;
    return firstNumber.number;
}

export function getFirstNumber(value)
{
    let parsed;
    let i = 0;
    for (const char of value)
    {
        parsed = parseInt(char);
        if (!isNaN(parsed))
            return {index: i, value: parsed};
        i++;
    }
    return {index: -1, value: NaN};
}

export function getLastNumber(value)
{
    let reversedValue = value.split('').reverse();
    return getFirstNumber(reversedValue);
}

function scanLine(value)
{
    let i = 0;
    for (const character of value)
    {

        i++;
    }
}

export function firstLastNumber(value)
{
    let combination = "";
    let first = getFirstNumber(value);
    let last = getLastNumber(value);
    combination = first.value + "" + last.value;
    return parseInt(combination);
}

console.log("Solution for Day 1, step 1")
let path1 = "day1.input.txt";
let sum = 0;
for await (const line of readIterator(path1))
{
    sum += firstLastNumber(line);
}
console.log(`Result ${sum}`); // correct: 54239

console.log("Solution for Day 1, step 2")
sum = 0;
for await (const line of readIterator(path1))
{
    sum += firstLastNumber(convertToDigits(line));
}
console.log(`Result ${sum}`);
