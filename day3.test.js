import assert from 'node:assert';
import {test} from 'node:test';
import {engineNumbers, engineNumbersSum, isSymbolAround, notANumberOrDot} from "./day3.js";


test('all the engine numbers', (t) =>
{
    let lines = [
        "467..114..",
        "...*......",
        "..35..633."
    ];
    let numbers = engineNumbers(lines);
    // console.log(numbers);
    // assert.strictEqual(numbers.length, 2);
});


test('all the engine numbers sum', (t) =>
{
    let lines = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
    ];
    let numbers = engineNumbersSum(lines);
    // console.log(numbers);
    // assert.strictEqual(numbers, 4361);
});

test('around', (t) =>
{
    console.log("test around");
    // assert.strictEqual(isSymbolAround(["123$.."], 2, 0), true);
    // assert.strictEqual(isSymbolAround(["123.."], 2, 0), false);
    // assert.strictEqual(isSymbolAround(["123..", "..$.."], 2, 0), true);
    // assert.strictEqual(isSymbolAround(["123..", "...*."], 2, 0), true);
    let allNumbers = engineNumbers([
        "...........................775.651...............887....79...946...921...493.....942..942.....151....155....................................",
        "......240...................*.....-......................$..*...................*.......%.....+....................956.549.*290.......834..."]);
    console.log(allNumbers);
    // assert.strictEqual(isSymbolAround(["..$..", "123..",], 60, 0), true);
});

test('is symbol', (t) =>
{
    // assert.strictEqual(notANumberOrDot("$"), true);
    // assert.strictEqual(notANumberOrDot("2"), false);
    // assert.strictEqual(notANumberOrDot("."), false);
})