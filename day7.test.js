import assert from 'node:assert';
import {test} from 'node:test';
import {
    ProcessPlay,
    CalcCompo,
    CalcCompos,
    CalcWinnings,
    compos,
    valueOfSecondaryCards, cardValue
} from "./day7.js";

const examplePlays = [
    "32T3K 765",
    "T55J5 684",
    "KK677 28",
    "KTJJT 220",
    "QQQJA 483",
];

test('Calculate the total winnings on the example', (t) =>
{
    let winnings = CalcWinnings(examplePlays, true);
    assert.strictEqual(winnings, 6440);
});

test('Calculate alternative total winnings on the example', (t) =>
{
    let winnings = CalcWinnings(examplePlays, false);
    assert.strictEqual(winnings, 5905);
});
test('compare first card when rank matches', (t) =>
{
    let play1 = ProcessPlay(examplePlays[2]);
    let play2 = ProcessPlay(examplePlays[3]);
    let compo1 = valueOfSecondaryCards(play1.cards, cardValue);
    let compo2 = valueOfSecondaryCards(play2.cards, cardValue);
    assert.strictEqual(compo1 > compo2, true);
});

test('compare first card when rank matches', (t) =>
{
    let compo1 = valueOfSecondaryCards("QAQQQ", cardValue);
    let compo2 = valueOfSecondaryCards("K4444", cardValue);
    console.log(`compo1: ${compo1} vs compo2: ${compo2}`);
    assert.strictEqual(compo1 > compo2, false);
});

test('Get the Compo of one play', (t) =>
{
    let play = examplePlays[2];
    let compo = CalcCompo(play, true);
    assert.strictEqual(compo.combination, "Two Pair");
});

test('Get All the compos', (t) =>
{
    let compo = CalcCompos(examplePlays, true);
    assert.strictEqual(compo[0].combination, compos[5].combination);
    assert.strictEqual(compo[1].combination, compos[3].combination);
    assert.strictEqual(compo[2].combination, compos[4].combination);
    assert.strictEqual(compo[3].combination, compos[4].combination);
    assert.strictEqual(compo[4].combination, compos[3].combination);
});

test('Get All the compos alternative', (t) =>
{
    let compo = CalcCompos(examplePlays, false);
    assert.strictEqual(compo[0].combination, compos[5].combination);
    assert.strictEqual(compo[1].combination, compos[1].combination);
    assert.strictEqual(compo[2].combination, compos[4].combination);
    assert.strictEqual(compo[3].combination, compos[1].combination);
    assert.strictEqual(compo[4].combination, compos[1].combination);
});

