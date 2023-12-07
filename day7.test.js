import assert from 'node:assert';
import {test} from 'node:test';
import {CalcCompo, CalcCompos, compos} from "./day7.js";

const examplePlays = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
];

// test('Calculate the total winnings on the example', (t) =>
// {
//     let winnings = CalcWinnings(examplePlays);
//     assert.strictEqual(winnings, 6440);
// });

test('Get the Compo of one play', (t) =>
{
    let play = examplePlays[2];
    let compo = CalcCompo(play);
    assert.strictEqual(compo.combination, "Two Pair");
});

test('Get All the compos', (t) =>
{
    let compo = CalcCompos(examplePlays);
    assert.strictEqual(compo[0].combination, compos[5].combination);
    assert.strictEqual(compo[1].combination, compos[3].combination);
    assert.strictEqual(compo[2].combination, compos[4].combination);
    assert.strictEqual(compo[3].combination, compos[4].combination);
    assert.strictEqual(compo[4].combination, compos[3].combination);
});
