import assert from 'node:assert';
import {test} from 'node:test';
import {isValidGame, sumOfNonValidGames} from "./day2.js";


test('is a valid game', (t) =>
{
    let gameResult = isValidGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 12, 13, 14);
    assert.strictEqual(gameResult.Valid, true);
});

test('is not a valio game', (t) =>
{
    let gameResult = isValidGame('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', 12, 13, 14);
    assert.strictEqual(gameResult.Valid, false);
});

test('is the right gameId', (t) =>
{
    let gameResult = isValidGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', 12, 13, 14);
    assert.strictEqual(gameResult.Game, 1);
});


test('total sum of games', (t) =>
{
    let data = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
    ];
    let gameResult = sumOfNonValidGames(data, 12, 13, 14);
    assert.strictEqual(gameResult, 8);
});









