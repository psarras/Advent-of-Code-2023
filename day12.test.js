import assert from 'node:assert';
import {test} from 'node:test';
import {getArrangements, getVariants} from "./day12.js";


test('number of arrangements on first case', (t) =>
{
    let springs = "???.### 1,1,3";
    let arrangements = getArrangements(springs);
    assert.strictEqual(arrangements, 1);
});

test('number of arrangements on first case', (t) =>
{
    let springs = "???";
    let numberOfBrokenSprings = 2;
    let allVariants = getVariants(springs, numberOfBrokenSprings);
    assert.strictEqual(allVariants.length, 2);
    assert.strictEqual(allVariants[0].combo, "##?");
    assert.strictEqual(allVariants[1].combo, ".##");
});
