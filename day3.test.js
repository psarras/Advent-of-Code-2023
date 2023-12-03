import assert from 'node:assert';
import {test} from 'node:test';
import {engineNumbers, engineNumbersSum, engineRatios, isSymbolAround, notANumberOrDot} from "./day3.js";


test('all the engine numbers', (t) => {
    let lines = [
        "460..114..",
        "...*......",
        "..30..633."
    ];
    let numbers = engineNumbers(lines);
    assert.strictEqual(numbers.length, 2);
    assert.strictEqual(numbers[0], 460);
    assert.strictEqual(numbers[1], 30);
});

test('include the end of a line', (t) => {
    let lines = [
        "460..114.",
        "...*.....",
        "..30..633",
        "......#..",
    ];
    let numbers = engineNumbers(lines);
    assert.strictEqual(numbers.length, 3);
    assert.strictEqual(numbers[0], 460);
    assert.strictEqual(numbers[1], 30);
    assert.strictEqual(numbers[2], 633);
});

test('all the engine numbers sum', (t) => {
    let lines = [
        "467..114.",
        "...*.....",
        "..35..633",
        "......#..",
        "617*.....",
        ".....+.58",
        "..592....",
        "......755",
        "...$.*...",
        ".664.598.",
    ];
    let numbers = engineNumbersSum(lines);
    // console.log(numbers);
    assert.strictEqual(numbers, 4361);
});

test('around', (t) => {
    assert.strictEqual(isSymbolAround(["123$.."], 2, 0), true);
    assert.strictEqual(isSymbolAround(["123.."], 2, 0), false);
    assert.strictEqual(isSymbolAround(["123..", "..$.."], 2, 0), true);
    assert.strictEqual(isSymbolAround(["123..", "...*."], 2, 0), true);
    assert.strictEqual(isSymbolAround(["..$..", "123..",], 2, 1), true);
});

test('first lines of input', (t) => {

    let allNumbers = engineNumbers([
        "...........................770.651...............887....79...946...921...493.....942..942.....151....155....................................",
        "......240...................*.....-......................$..*...................*.......%.....+....................956.549.*290.......834..."]);
    // console.log(allNumbers);
    assert.strictEqual(allNumbers.length, 8);
    assert.strictEqual(allNumbers[0], 770);
});

test('is symbol', (t) => {
    assert.strictEqual(notANumberOrDot("$"), true);
    assert.strictEqual(notANumberOrDot("2"), false);
    assert.strictEqual(notANumberOrDot("."), false);
})


test('engine ratio for example', (t) => {
    let lines = [
        "467..114.",
        "...*.....",
        "..35..633",
        "......#..",
        "617*.....",
        ".....+.58",
        "..592....",
        "......755",
        "...$.*...",
        ".664.598.",
    ];
    let ratios = engineRatios(lines);
    assert.strictEqual(ratios.length, 2);
});
