import assert from 'node:assert';
import {test} from 'node:test';
import {WinConditions, WinMultiples} from "./day6.js";


test('number of ways you can win', (t) =>
{
    let distance = 9;
    let time = 7;
    let times = WinConditions(distance, time);
    assert.strictEqual(times, 4);
});

test('multiples of ways to win', (t) =>
{
    let multiples = WinMultiples([[7, 9], [15, 40], [30, 200]]);
    assert.strictEqual(multiples, 288);
});

test('master race example', (t) =>
{
    let multiples = WinConditions(940200, 71530);
    assert.strictEqual(multiples, 71503);
});
