import assert from 'node:assert';
import {
    getFirstNumber,
    getLastNumber,
    firstLastNumber,
    firstSpelledNumber,
    firstFromAnywhereNumber,
    FirstSpelledOrNumber,
    convertToDigits
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

test('when only one number', (t) =>
{
    let num1 = getLastNumber('treb7uchet');
    assert.strictEqual(num1.value, 7);
    let num2 = getFirstNumber('treb7uchet');
    assert.strictEqual(num2.value, 7);
});

test('whole number when only one found!', (t) =>
{
    let num = firstLastNumber('treb7uchet');
    assert.strictEqual(num, 77);
});

test('Should detect the first digit with letters', (t) =>
{
    let num = firstSpelledNumber('two1nine');
    assert.strictEqual(num.value, 2);
})

test('should include overlaps as separate numbers', (t) =>
{
    let num = firstLastNumber('oneight');
    assert.strictEqual(num, 18);
})

// test('convert to digits', (t) =>
// {
//     let num = convertToDigits('two1nine');
//     assert.strictEqual(num, "2two19nine");
// })
//
// test('convert to digits with overlaps', (t) =>
// {
//     let num = convertToDigits('xtwone3');
//     assert.strictEqual(num, "x2tw1one3");
// })
