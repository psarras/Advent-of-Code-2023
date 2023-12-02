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

function FindDigits(sentence)
{
    let found = [];
    for (const [key, value] of Object.entries(spelledNumbersToDigits))
    {
        let clone = sentence;
        let count = 0;
        while (clone.indexOf(key) !== -1)
        {
            // console.log(clone);
            let currentIndex = clone.indexOf(key) + count;
            count += key.length;
            clone = clone.replace(key, "");
            if (currentIndex === -1)
                continue;

            found.push({index: currentIndex, value: value});
        }
    }
    // console.log(found);
    return found;
}


function indexOfPackage(sentence, substring, value)
{
    let currentIndex = sentence.indexOf(substring);
    if (currentIndex === -1)
        return {index: 99999, number: substring};
    return {index: currentIndex, number: substring};
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

    let lastNumber = getFirstNumber(reversedValue);
    if (lastNumber.index !== -1)
        lastNumber.index = value.length - 1 - lastNumber.index;
    return lastNumber;
}

export function firstLastNumber(value)
{
    let combination = "";
    let first = getFirstNumber(value);
    let last = getLastNumber(value);
    combination = first.value + "" + last.value;
    return parseInt(combination);
}

export function firstLastNumberWithSpelled(value)
{
    let spelled = FindDigits(value);
    let combination = "";
    let first = getFirstNumber(value);
    if (first.index !== -1)
        spelled.push(first);
    let last = getLastNumber(value);
    if (last.index !== -1)
        spelled.push(last);

    // console.log(spelled);
    let smallest = spelled.sort((a, b) => a.index - b.index)[0];
    let largest = spelled.sort((a, b) => b.index - a.index)[0];

    combination = smallest.value + "" + largest.value;

    let indexes = spelled.map(x => x.index);
    let filter = indexes.filter(x => x >= value.length || x < 0);
    if (filter.length > 0)
    {
        console.log(`${JSON.stringify(spelled)} + ${value} - result: ${combination} - ${filter}`);
    }

    // console.log(`smallest ${smallest.value}, largest ${largest.value}`);
    return parseInt(combination);
}

console.log("Solution for Day 1, step 1")
let path1 = "day1.input.txt";

async function day1_part1()
{
    let sum = 0;
    
    for await (const line of readIterator(path1))
    {
        sum += firstLastNumber(line);
    }
    return sum;
}

console.log(`Result ${await day1_part1()}`); // correct: 54239

async function day1_part2(path)
{
    let sum = 0;
    for await (const line of readIterator(path))
    {
        let firstLast = firstLastNumberWithSpelled(line);
        // console.log(`from ${line} - ${firstLast}`);
        sum += firstLast;
    }
    return sum;
}

console.log("Solution for Day 1, step 2")
console.log(`Result ${await day1_part2(path1)}`); // 55343?

console.log(`Result ${await day1_part2("day1.mitch.input.txt")}`);

export function compute_array(data)
{
    let sum = 0;
    for (const d of data)
    {
        sum += firstLastNumberWithSpelled(d);
    }
    return sum;
}
