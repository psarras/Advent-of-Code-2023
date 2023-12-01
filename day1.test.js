import assert from 'node:assert';
import {getFirstNumber, getLastNumber, firstLastNumber} from './day1.js';
import {test} from 'node:test';

test('first number', (t) =>
{
    let num = getFirstNumber('1abc2');
    assert.strictEqual(num, 1);
});

test('last number', (t) =>
{
    let num = getLastNumber('pqr3stu8vwx');
    assert.strictEqual(num, 8);
});


test('when more than three numbers', (t) =>
{
    let num = getLastNumber('a1b2c3d4e5f');
    assert.strictEqual(num, 5);
});

test('get the whole number', (t) =>
{
    let num = firstLastNumber('a1b2c3d4e5f');
    assert.strictEqual(num, 15);
});

test('when only one number', (t) =>
{
    let num1 = getLastNumber('treb7uchet');
    assert.strictEqual(num1, 7);
    let num2 = getFirstNumber('treb7uchet');
    assert.strictEqual(num2, 7);
});

test('whole number when only one found!', (t) =>
{
    let num = firstLastNumber('treb7uchet');
    assert.strictEqual(num, 77);
});

