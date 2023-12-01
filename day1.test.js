import assert from 'node:assert';
import {
    getFirstNumber, getLastNumber, firstLastNumber, firstLastNumberWithSpelled, compute_array
} from './day1.js';
import {test} from 'node:test';

test('first number', (t) =>
{
    let num = getFirstNumber('1abc2');
    assert.strictEqual(num.value, 1);
});

test('last number', (t) =>
{
    let num = getLastNumber('pqr3stu8vwx');
    assert.strictEqual(num.value, 8);
});


test('when more than three numbers', (t) =>
{
    let num = getLastNumber('a1b2c3d4e5f');
    assert.strictEqual(num.value, 5);
});

test('get the whole number', (t) =>
{
    let num = firstLastNumber('a1b2c3d4e5f');
    assert.strictEqual(num, 15);
});

test('when only one number last', (t) =>
{
    let num = getLastNumber('treb7uchet');
    assert.strictEqual(num.value, 7);
    assert.strictEqual(num.index, 4);
});

test('when only one number first', (t) =>
{
    let num = getFirstNumber('treb7uchet');
    assert.strictEqual(num.value, 7);
    assert.strictEqual(num.index, 4);
});

test('whole number when only one found!', (t) =>
{
    let num = firstLastNumber('treb7uchet');
    assert.strictEqual(num, 77);
});

test('Should detect the first digit with letters', (t) =>
{
    let num = firstLastNumberWithSpelled('two1nine');
    assert.strictEqual(num, 29);
})

test('should include overlaps as separate numbers', (t) =>
{
    let num = firstLastNumberWithSpelled('oneight');
    assert.strictEqual(num, 18);
})

await test('should pass test cases', async (t) =>
{
    let all = ["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"]
    let num = compute_array(all);
    assert.strictEqual(num, 281);
});